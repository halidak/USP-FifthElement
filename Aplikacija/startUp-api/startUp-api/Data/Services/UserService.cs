using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SendGrid.Helpers.Mail;
using SendGrid;
using startUp_api.Data.Models;
using startUp_api.Data.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using SendGrid.Helpers.Mail.Model;
using startUp_api.Data.Dtos;
using System.Text;
using startUpapi.Migrations;
using Microsoft.AspNetCore.Identity;

namespace startUp_api.Data.Services
{
    public class UserService
    {
        private AppDbContext _context;
        private IConfiguration configuration;

        public UserService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            this.configuration = configuration;
        }

        public string Register(UserRegisterVM request)
        {
            if(_context.Users.Any(u => u.Email == request.Email))
            {
                return null;
            }
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new User
            {
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = "Student",
                Verified = false,
                VerificationToken = CreateRandomToken()
            };

            _context.Users.Add(user);
            _context.SaveChanges();
            var htmlContent = $"<h1>Welcome to StartUp</h1>" +
              $"<h3>Please click " +
              $"<a href=\"{configuration.GetSection("ClientAppUrl").Value}/verify/{user.VerificationToken}\">here</a>" +
              $" to confirm your account</h3>";
            SendEmail(user, "Verify your account", htmlContent).Wait();

            return "registerd";
        }

        public string GoogleRegister(GoogleRegistrationVM request)
        {
            if (_context.Users.Any(u => u.Email == request.Email))
            {
                throw new Exception("user already exists");
            }
            var user = new User
            {
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Verified = true,
                Role = "Student",
                Photo = request.Photo,
                VerificationToken = CreateRandomToken()
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return "registerd";
        }

        public object Login(UserCompanyLoginVM request)
        {
            var us = _context.Users.FirstOrDefault(u => u.Email == request.Email);
            var failedResponse = "Check your credentials and try again!";

            if (us == null)
            {
                throw new Exception(failedResponse);
            }

            if (!VerifyPasswordHash(request.Password, us.PasswordHash, us.PasswordSalt))
            {
                throw new Exception(failedResponse);
            }
           
            if (!us.Verified)
            {
                return null;
            }

            string token = CreateToken(us);

            var user = new UserDto
            {
                Id = us.Id,
                FirstName = us.FirstName,
                LastName = us.LastName,
                Email = us.Email,
                Role = us.Role,
                VerificationToken = us.VerificationToken,
                ResetPasswordToken = us.ResetPasswordToken,
                Photo = us.Photo,
                PhoneNumber = us.PhoneNumber
            };

            var fav = _context.Favorites.Where(x => x.UserId == user.Id).Select(n => n.NoticeId).ToList();
            user.FavoriteNotices = fav;
            return new { user, token };
        }

        public object LoginWithGoogle(GoogleLoginVM request)
        {
            var us = _context.Users.FirstOrDefault(u => u.Email == request.Email);
            var failedResponse = "Check your credentials and try again!";

            if (us == null)
            {
                throw new Exception(failedResponse);
            }
            string token = CreateToken(us);

            var user = new UserDto
            {
                Id = us.Id,
                FirstName = us.FirstName,
                LastName = us.LastName,
                Email = us.Email,
                Role = us.Role,
                VerificationToken = us.VerificationToken,
                ResetPasswordToken = us.ResetPasswordToken,
                Photo = us.Photo,
                PhoneNumber = us.PhoneNumber
            };

            var fav = _context.Favorites.Where(x => x.UserId == user.Id).Select(n => n.NoticeId).ToList();
            user.FavoriteNotices = fav;

            return new { user, token };
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.PrimarySid, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email),
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

        public void DeleteUserById(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if(user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

        public List<Company> GetAllCompaniesByStudent(int id)
        {
            return _context.Users_Companies.Include(c => c.Company).Where(u => u.UserId == id).Select(e => e.Company).ToList();
        }

        public List<Notice> AllNoticesOfStudent(int id)
        {
            return _context.Users_Notices.Include(c => c.Notice).Where(u => u.UserId == id).Select(e => e.Notice).ToList();
        }

        public List<Notice> AllFavoriteNotices(int id)
        {
            return _context.Favorites.Include(c => c.Notice).Where(u => u.UserId == id).Select(e => e.Notice).ToList();
        }

        public string UserVerify(string token)
        {
            var user = _context.Users.FirstOrDefault(u => u.VerificationToken == token);
            
            if (user == null)
            {
                throw new Exception("invalid token");
            }

            user.Verified = true;
            _context.SaveChanges();

            return "User Verified";
        }

        
        public void SendMessage(SendMessageDto dto)
        {
            var message = new Messages
            {
                FromUserId = dto.FromId,
                ToCompanyId = dto.ToId,
                Message = dto.Message,
                TimeStamp = DateTime.Now,
                UserId = dto.FromId,
                CompanyId = dto.ToId
            };
            _context.Messages.Add(message);
            _context.SaveChanges(); 
        }

        public List<MessageDto> GetMessages(int id)
        {
            var messages = _context.Messages.Where(x => x.ToUserId == id).ToList();
            var messagesDto = new List<MessageDto>();

            foreach( var message in messages)
            {
                var company = _context.Companies.FirstOrDefault(x => x.Id == message.FromCompanyId);

                if (company is null)
                {
                    continue;
                }

                var Time = message.TimeStamp;
                var time = Time.ToString("HH:mm");

                messagesDto.Add(new MessageDto
                {
                    FromName = company.CompanyName,
                    FromId = message.FromCompanyId,
                    Message = message.Message,
                    ToId = message.ToUserId,
                    TimeStamp = message.TimeStamp,
                    Time = time,
                    sender = false
                });
            }

            return messagesDto;
        }
        public List<MessageDto> GetSentMessages(int id)
        {
            var messages = _context.Messages.Where(x => x.FromUserId == id).ToList();
            var messagesDto = new List<MessageDto>();
            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            foreach (var message in messages)
            {
                var company = _context.Companies.FirstOrDefault(x => x.Id == message.ToCompanyId);

                if (company is null)
                {
                    continue;
                }

                var Time = message.TimeStamp;
                var time = Time.ToString("HH:mm");

                messagesDto.Add(new MessageDto
                {
                    FromName = $"{user.FirstName} {user.LastName}",
                    FromId = message.FromUserId,
                    Message = message.Message,
                    ToId = message.ToCompanyId,
                    Time = time,
                    TimeStamp = message.TimeStamp,
                    sender = true
                });
            }

            return messagesDto;
        }

       

        public List<MessageDto> GetMessagesBetweenUsers(int userId, int companyId)
        {
            var messages = _context.Messages.Where(m => (m.FromUserId == userId && m.ToCompanyId == companyId)
                                            || (m.FromCompanyId == companyId && m.ToUserId == userId)).OrderBy(m => m.TimeStamp).ToList();
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            var comp = _context.Companies.FirstOrDefault(c => c.Id == companyId);

            var messagesDto = new List<MessageDto>();


            foreach (var m in messages)
            {
                var Time = m.TimeStamp;
                var time = Time.ToString("HH:mm");
                if (m.FromCompanyId == 0)
                {
                    messagesDto.Add(new MessageDto
                    {
                        FromId = m.FromUserId,
                        FromName = $"{user.FirstName} {user.LastName}",
                        Message = m.Message,
                        ToId = m.ToCompanyId,
                        Time = time,
                    });
                }
                else if (m.FromUserId == 0)
                {
                    messagesDto.Add(new MessageDto
                    {
                        FromId = m.FromCompanyId,
                        FromName = comp.CompanyName,
                        Message = m.Message,
                        ToId = m.ToUserId,
                        Time = time,
                    });
                }
            }

            return messagesDto;
        }

        public List<ChatDto> GetUsersChats(int userId)
        {
            var messages = _context.Messages.Where(x => x.FromUserId == userId || x.ToUserId == userId).ToList();
            var chats = new List<ChatDto>();


            foreach (var message in messages)
            {
                var comp = _context.Companies.FirstOrDefault(c => c.Id == message.CompanyId);

                chats.Add(new ChatDto
                {
                    FromId = message.CompanyId,
                    Name = comp.CompanyName,
                    Photo = comp.Photo
                });
            }

            var distinct = chats.GroupBy(x => x.FromId).Select(a => a.First()).ToList();

            return distinct;
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


        public UserRegisterVM GetUserById(int id)
        {
            var user = _context.Users.Where(u => u.Id == id).Select(u => new UserRegisterVM()
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                PhoneNumber = u.PhoneNumber,
                Address = u.Address,
                Photo = u.Photo,
                Document = u.Document,
                CompanyIds = u.User_Company.Select(u => u.CompanyId).ToList(),
                CompanyNames = u.User_Company.Select(u => u.Company.CompanyName).ToList()
            }).FirstOrDefault();

            return user;
        }

        public User UpdateUser(int id, UserUpdateVM u)
        {
            var user = _context.Users.FirstOrDefault(n => n.Id == id);
            if (user != null)
            {
                user.FirstName = u.FirstName;
                user.LastName = u.LastName;
                user.Email = u.Email;
                user.PhoneNumber = u.PhoneNumber;
                user.Address = u.Address;
                user.Photo = u.Photo;
                _context.SaveChanges();
            }

            return user;
        }

        public string AddUserNotice(int id, User_NoticeVM un)
        {
            var user = _context.Users.FirstOrDefault(n => n.Id == id);
            var notice = _context.Notices.FirstOrDefault(n => n.Id == un.NoticeId);
            if (user == null || notice == null)
            {
                throw new Exception("Bad request");
            }
            var application = _context.Users_Notices.FirstOrDefault(u => u.UserId == id && u.NoticeId == un.NoticeId);
            if (application != null)
            {
                throw new Exception("Vec prijavljeni");
            }

            var app = new User_Notice
            {
                NoticeId = un.NoticeId,
                UserId = id,
            };
            user.Document = un.Document;

            _context.Users_Notices.Add(app);
            _context.SaveChanges();

            return "Saved";
        }

        public string AddToFavorites(int id, FavoritesVM fav)
        {
            var user = _context.Users.FirstOrDefault(n => n.Id == id);
            var notice = _context.Notices.FirstOrDefault(n => n.Id == fav.NoticeId);
            if (user == null || notice == null)
            {
                throw new Exception("Bad request");
            }
            var application = _context.Favorites.FirstOrDefault(u => u.UserId == id && u.NoticeId == fav.NoticeId);
            if (application != null)
            {
                _context.Favorites.Remove(application);
                _context.SaveChanges();
                return "Removed";
            }
            var app = new Favorites
            {
                NoticeId = fav.NoticeId,
                UserId = id
            };

            _context.Favorites.Add(app);
            _context.SaveChanges(true);

            return "Saved";
        }

        public void RateCompany(int id, User_CompanyVM uc)
        {
            var user = _context.Users.FirstOrDefault(n => n.Id == id);
            var company = _context.Companies.FirstOrDefault(n => n.Id == uc.CompanyId);
            if (user == null || company == null)
            {
                throw new Exception("Bad request");
            }
            var rated = new User_Company
            {
                UserId = id,
                CompanyId = uc.CompanyId,
                Rate = uc.Rate
            };
            var isAlreadyRated = _context.Users_Companies.FirstOrDefault(u => u.UserId == id && u.CompanyId == uc.CompanyId);
            if (isAlreadyRated != null)
            {
                _context.Users_Companies.Update(rated);
                _context.SaveChanges();
                return;
            }


            _context.Users_Companies.Add(rated);
            _context.SaveChanges();

        }

        public void ChangePassword(int id, ChangePasswordVM u)
        {
            var user = _context.Users.FirstOrDefault(n => n.Id == id);
            if(user != null)
            {
                if (!VerifyPasswordHash(u.CurrentPassword, user.PasswordHash, user.PasswordSalt))
                {
                    throw new Exception("incorect password");
                }
                CreatePasswordHash(u.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                _context.SaveChanges();
            }
        }

        public void ForgotPassword(string email)
        {
            var user = _context.Users.FirstOrDefault(n => n.Email == email);
            if (user == null)
            {
                throw new Exception("ser not found");
            }
            user.ResetPasswordToken = CreateRandomToken();
            _context.SaveChanges();
            var htmlContent = $"<h1>Welcome to StartUp</h1>" +
             $"<h3>Please click " +
             $"<a href=\"{configuration.GetSection("ClientAppUrl").Value}/reset/{user.ResetPasswordToken}\">here</a>" +
             $" reset your password</h3>";
            SendEmail(user, "Reset password", htmlContent).Wait();
        }

        public void ResetPassword(string token, ResetPasswordVM u)
        {
            var user = _context.Users.FirstOrDefault(u => u.ResetPasswordToken == token);
            if (user == null)
            {
                throw new Exception("user not found");
            }
            CreatePasswordHash(u.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            _context.SaveChanges();
        }

        public int NumberOfUsers()
        {
            var num = _context.Users.Count();
            return num;
        }

        public List<User> GetAllUsers()
        {
            var list = _context.Users.Where(u => u.Role != "Admin").ToList();
            return list;
        }

        public async Task SendEmail(User u, string subject, string htmlContent)
        {
            //var apiKey = Environment.GetEnvironmentVariable("EmailKey");
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("halida.karisik6@gmail.com", "StartUp");
            var to = new EmailAddress(u.Email, "StartUp User");
            var plainTextContent = "";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
