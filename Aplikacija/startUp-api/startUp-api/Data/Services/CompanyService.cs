using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SendGrid.Helpers.Mail;
using SendGrid;
using startUp_api.Data.Models;
using startUp_api.Data.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using startUp_api.Data.Dtos;
using Microsoft.EntityFrameworkCore.Internal;
using MailKit.Net.Imap;
using startUpapi.Migrations;

namespace startUp_api.Data.Services
{
    public class CompanyService
    {
        private AppDbContext _context;
        private IConfiguration configuration;

        public CompanyService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            this.configuration = configuration;
        }

        public Company Register(CompanyRegisterVM request)
        {
            if (_context.Companies.Any(c => c.Email == request.Email))
            {
                 throw new Exception("Company already exists");
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var company = new Company
            {
                Email = request.Email,
                CompanyName = request.CompanyName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Verified = false,
                Role = "Company",
                VerificationToken = CreateRandomToken()
            };

            _context.Companies.Add(company);
            _context.SaveChanges();

            var htmlContent = $"<h1>Welcome to StartUp</h1>" +
            $"<h3>Please click " +
            $"<a href=\"{configuration.GetSection("ClientAppUrl").Value}/verify-company/{company.VerificationToken}\">here</a>" +
            $" to confirm your account</h3>";
            SendEmail(company, "Verify your account", htmlContent).Wait();

            return company;

        }

        public object Login(UserCompanyLoginVM request)
        {
            var com = _context.Companies.FirstOrDefault(c => c.Email == request.Email);

            if (com == null)
            {
                throw new Exception("User not found");
            }

            if (!VerifyPasswordHash(request.Password, com.PasswordHash, com.PasswordSalt))
            {
                throw new Exception("Password is incorect");
            }

            if (!com.Verified)
            {
                throw new Exception("User is not verified");
            }
            string token = CreateToken(com);

            var company = new CompanyDto
            {
                Id = com.Id,
                Email = com.Email,
                VerificationToken = com.VerificationToken,
                PasswordResetToken = com.PasswordResetToken,
                Photo = com.Photo,
                Role = com.Role,
                CompanyName = com.CompanyName
            };

            return new {company, token};
        }

        private string CreateToken(Company company)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.PrimarySid, company.Id.ToString()),
                new Claim(ClaimTypes.Name, company.Email),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.
                GetBytes(configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        public Company UpdateCompany(int id, ComapnyUpdateVM c)
        {
            var company = _context.Companies.FirstOrDefault(c => c.Id == id);
            if (company != null)
            {
                company.CompanyName = c.CompanyName;
                company.PhoneNumber = c.PhoneNumber;
                company.Address = c.Address;
                company.Photo = c.Photo;
                company.Description = c.Description;
                company.Location = c.Location;
                company.Email = c.Email;
                _context.SaveChanges();
            }

            return company;
        }

        public void ChangePassword(int id, ChangePasswordVM u)
        {
            var company = _context.Companies.FirstOrDefault(n => n.Id == id);
            if (company != null)
            {
                if (!VerifyPasswordHash(u.CurrentPassword, company.PasswordHash, company.PasswordSalt))
                {
                    throw new Exception("incorect password");
                }
                CreatePasswordHash(u.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);
                company.PasswordHash = passwordHash;
                company.PasswordSalt = passwordSalt;
                _context.SaveChanges();
            }
        }

        public void ForgotPassword(string email)
        {
            var company = _context.Companies.FirstOrDefault(n => n.Email == email);
            if (company == null)
            {
                throw new Exception("company not found");
            }
            company.PasswordResetToken = CreateRandomToken();
            _context.SaveChanges();
            var htmlContent = $"<h1>Welcome to StartUp</h1>" +
             $"<h3>Please click " +
             $"<a href=\"{configuration.GetSection("ClientAppUrl").Value}/reset-company/{company.PasswordResetToken}\">here</a>" +
             $" reset your password</h3>";
            SendEmail(company, "Reset password", htmlContent).Wait();
        }

        public void ResetPassword(string token, ResetPasswordVM u)
        {
            var company = _context.Companies.FirstOrDefault(u => u.PasswordResetToken == token);
            if (company == null)
            {
                throw new Exception("company not found");
            }
            CreatePasswordHash(u.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);
            company.PasswordHash = passwordHash;
            company.PasswordSalt = passwordSalt;
            _context.SaveChanges();
        }


        public void SendMEssage(SendMessageDto dto)
        {
            var message = new Messages
            {
                FromCompanyId = dto.FromId,
                ToUserId = dto.ToId,
                Message = dto.Message,
                CompanyId = dto.FromId,
                TimeStamp = DateTime.Now,
                UserId = dto.ToId
            };

            _context.Messages.Add(message);
            _context.SaveChanges();
        }

        public List<MessageDto> GetMessage(int companyId)
        {
            var messages = _context.Messages.Where(x => x.ToCompanyId == companyId).ToList();
            var comp = _context.Companies.FirstOrDefault(c => c.Id == companyId);
            var dtos = new List<MessageDto>();

            foreach(var message in messages )
            {
                var user = _context.Users.FirstOrDefault(x => x.Id == message.FromUserId);

                if (user is null)
                {
                    continue;
                }

                var Time = message.TimeStamp;
                var time = Time.ToString("HH:mm");

                dtos.Add(new MessageDto
                {
                    FromId = user.Id,
                    ToId = message.ToCompanyId,
                    Message = message.Message,
                    FromName = $"{user.FirstName} {user.LastName}",
                    ToName = comp.CompanyName,
                    TimeStamp = message.TimeStamp,
                    Time = time,
                    sender = false
                });
            }

            return dtos;
        }

        public List<ChatDto> GetUsersChats(int companyId)
        {
            var messages = _context.Messages.Where(x => x.FromCompanyId == companyId || x.ToCompanyId == companyId).ToList();
            var chats = new List<ChatDto>();


            foreach (var message in messages)
            {
                var user = _context.Users.FirstOrDefault(c => c.Id == message.UserId);

                chats.Add(new ChatDto
                {
                    FromId = user.Id,
                    Name = $"{user.FirstName} {user.LastName}",
                    Photo = user.Photo
                });
            }

            var distinct = chats.GroupBy(x => x.Name).Select(a => a.First()).ToList();

            return distinct;
        }

        public List<MessageDto> GetSentMessages(int companyId)
        {
            var messages = _context.Messages.Where(x => x.FromCompanyId == companyId).ToList();
            var comp = _context.Companies.FirstOrDefault(c => c.Id == companyId);
            var dtos = new List<MessageDto>();

            foreach (var message in messages)
            {
                var user = _context.Users.FirstOrDefault(x => x.Id == message.ToUserId);

                if (user is null)
                {
                    continue;
                }

                var Time = message.TimeStamp;
                var time = Time.ToString("HH:mm");

                dtos.Add(new MessageDto
                {
                    FromId = message.FromCompanyId,
                    ToId = user.Id,
                    Message = message.Message,
                    ToName = $"{user.FirstName} {user.LastName}",
                    FromName = comp.CompanyName,
                    Time = time,
                    TimeStamp = message.TimeStamp,
                    sender = true
                });
            }

            return dtos;
        }


        public string CompanyVerify(string token)
        {
            var company = _context.Companies.FirstOrDefault(c => c.VerificationToken == token);

            if (company == null)
            {
                return "Invalid token";
            }

            company.Verified = true;
            _context.SaveChanges();

            return "User Verified";
        }

        public CompanyVM GetCompanyById(int id)
        {
            var comp = _context.Companies.FirstOrDefault(c => c.Id == id);
            if (comp == null)
            {
                throw new Exception("Company not found");
            }
            decimal rate2;
            var companieRates = _context.Users_Companies.Where(i => i.CompanyId == id).Select(x => x.Rate).ToList();
            if (companieRates.Count() == 0)
            {
                rate2 = 0;
            }
            else
            {
                var rate = companieRates.Average();
                rate2 = Math.Round((decimal)rate, 2);
            }

            var company = new CompanyVM
            {
                Id = comp.Id,
                CompanyName = comp.CompanyName,
                Email = comp.Email,
                Description = comp.Description,
                PhoneNumber = comp.PhoneNumber,
                Location = comp.Location,
                Address = comp.Address,
                Photo = comp.Photo,
                Rate = (double?)rate2
            };



            return company;
        }

        public List<Company> GetAllCompanies()
        {
            return _context.Companies.ToList();
        }

        public void DeleteCompanyById(int id)
        {
            var cmp = _context.Companies.FirstOrDefault(c => c.Id == id);
            if (cmp != null)
            {
                _context.Companies.Remove(cmp);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("User not found");
            }
        }

        public List<NoticeWithIdVM> AllNoticesByCompany(int id)
        {
            var results = _context.Notices.Where(c => c.CompanyId == id).Select(n => new NoticeWithIdVM()
            {
                Id = n.Id,
                Name = n.Name,
                Date = n.Date,
                Loaction = n.Loaction,
                Description = n.Description,
                CompanyName = n.Company.CompanyName,
                CompanyId = n.Company.Id,
                CompanyPhoto = n.Company.Photo
            }).ToList();
            return results;
        }


        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        public async Task SendEmail(Company u, string subject, string htmlContent)
        {
            //var apiKey = Environment.GetEnvironmentVariable("EmailKey");
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("halida.karisik6@gmail.com", "StartUp");
            //var subject = "Verify your account";
            var to = new EmailAddress(u.Email, "StartUp User");
            var plainTextContent = "";
            //var htmlContent = "<p>Welcome to StartUp. To verify your account</p>" +
            //    $"<a href="{configuration.GetSection(\"ClientAppUrl\").Value}/verify/{newEmailVerification.Token}">Please click here</a>";
            //var htmlContent = $"<h1>Welcome to StartUp</h1>" +
            //  $"<h3>Please click " +
            //  $"<a href=\"{configuration.GetSection("ClientAppUrl").Value}/verify/{u.VerificationToken}\">here</a>" +
            //  $" to confirm your account</h3>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
