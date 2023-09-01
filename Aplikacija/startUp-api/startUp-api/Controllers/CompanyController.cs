using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using startUp_api.Data.Dtos;
using startUp_api.Data.Services;
using startUp_api.Data.ViewModels;

namespace startUp_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private CompanyService companyServices;

        public CompanyController(CompanyService companyServices)
        {
            this.companyServices = companyServices;
        }


        [HttpPost("company-registration")]
        public IActionResult Register([FromBody] CompanyRegisterVM request)
        {
            try
            {
                var response = companyServices.Register(request);
                return Created(nameof(response), response);
            }
            catch (Exception ex)
            {
                return BadRequest("Greskyyyyyy");
            }
        }

        [HttpPost("company-login")]
        public IActionResult Login([FromBody] UserCompanyLoginVM request)
        {
            try
            {
                var response = companyServices.Login(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("company-verify")]
        public IActionResult Verify(string token)
        {
            try
            {
                var response = companyServices.CompanyVerify(token);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("get-company-by-id/{id}")]
        public IActionResult GetCompanyById(int id)
        {
            try
            {
                var company = companyServices.GetCompanyById(id);
                return Ok(company);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-all-companies")]
        public IActionResult GetAllCompanies()
        {
            try
            {
                var list = companyServices.GetAllCompanies();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("notice-by-company/{id}")]
        public IActionResult NoticeByCompany(int id)
        {
            try
            {
                var list = companyServices.AllNoticesByCompany(id);
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-company-by-id/{id}")]
        public IActionResult DeleteCompanyById(int id)
        {
            try
            {
                companyServices.DeleteCompanyById(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update-company/{id}")]
        public IActionResult UpdateCompany(int id, [FromBody] ComapnyUpdateVM c)
        {
            try
            {
                var cmp = companyServices.UpdateCompany(id, c);
                return Ok(cmp);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("change-password/{id}")]
        public IActionResult ChangePassword(int id, [FromBody] ChangePasswordVM u)
        {
            try
            {
                companyServices.ChangePassword(id, u);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("forgot-password/{email}")]
        public IActionResult ForgotPassword(string email)
        {
            try
            {
                companyServices.ForgotPassword(email);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("reset-pasword/{token}")]
        public IActionResult ResetPassword(string token, ResetPasswordVM u)
        {
            try
            {
                companyServices.ResetPassword(token, u);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("sendMessage")]
        public IActionResult SendMEssage(SendMessageDto dto)
        {
            try
            {
                companyServices.SendMEssage(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpGet("getMessages/{id}")]
        public IActionResult GetMEssages(int id)
        {
            try
            {
               var messages = companyServices.GetMessage(id);
               return Ok(messages);

            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message); 
            }
        }
        [HttpGet("getChats/{userId}")]
        public IActionResult GetChats(int userId)
        {
            try
            {
                var res = companyServices.GetUsersChats(userId);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getSentMessages/{id}")]
        public IActionResult GetSentMessages(int id)
        {
            try
            {
                var messages = companyServices.GetSentMessages(id);
                return Ok(messages);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
