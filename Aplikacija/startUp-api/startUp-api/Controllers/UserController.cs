using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using startUp_api.Data.Dtos;
using startUp_api.Data.Models;
using startUp_api.Data.Services;
using startUp_api.Data.ViewModels;

namespace startUp_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserService userService;

        public UserController(UserService userService)
        {
            this.userService = userService;

        }

        [HttpPost("user-registration")]
        public IActionResult Register([FromBody] UserRegisterVM request)
        {
            try
            {
                var response = userService.Register(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("user-google-registration")]
        public IActionResult GoogleRegister([FromBody] GoogleRegistrationVM request)
        {
            try
            {
                var response = userService.GoogleRegister(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpPost("user-login")]
        public IActionResult Login([FromBody] UserCompanyLoginVM request)
        {
            try
            {
                var user = userService.Login(request);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("user-google-login")]
        public IActionResult GoogleLogin([FromBody] GoogleLoginVM request)
        {
            try
            {
                var user = userService.LoginWithGoogle(request);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("user-verify")]
        public IActionResult UserVerify(string token)
        {
            try
            {
                var response = userService.UserVerify(token);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        //[HttpPost("add-relation")]
        //public IActionResult AddUser_Company([FromBody] User_CompanyVM request)
        //{
        //    try
        //    {
        //       // context.Request.Headers.TryGetValue("Authorization", out var token);
        //        //if (token.IsNullOrEmpty())
        //        //{
        //        //    return Forbid();
        //        //}
        //        userService.AddUser_Company(request);
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new { message = ex.Message });
        //    }
        //}

        [HttpGet("get-user-by-id/{id}")]
        public IActionResult GetUserById(int id)
        {
            try
            {
                var user = userService.GetUserById(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("get-companies-by-user/{id}")]
        public IActionResult GetCompaniesByUser(int id)
        {
            try
            {
                var user = userService.GetAllCompaniesByStudent(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("get-all-users")]
        public IActionResult GetAllUsers()
        {
            try
            {
                var res = userService.GetAllUsers();
                return Ok(res); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet("get-notices-by-user/{id}")]
        public IActionResult GetNoticesByUser(int id)
        {
            try
            {
                var user = userService.AllNoticesOfStudent(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-favorite-notices/{id}")]
        public IActionResult GetFavoriteNotices(int id)
        {
            try
            {
                var user = userService.AllFavoriteNotices(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-user-by-id/{id}")]
        public IActionResult DeleteUserById(int id)
        {
            try
            {
                userService.DeleteUserById(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("update-user-id/{id}")]
        public IActionResult UpdateUser(int id, [FromBody] UserUpdateVM u)
        {
            try
            {
                var user = userService.UpdateUser(id, u);
                return Ok(user);
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
                userService.ChangePassword(id, u);
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
                userService.ForgotPassword(email);
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
                userService.ResetPassword(token, u);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("apply-for-job/{id}")]
        public IActionResult Apply(int id, [FromBody] User_NoticeVM un)
        {
            try
            {
                var res = userService.AddUserNotice(id, un);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("add-to-favorites/{id}")]
        public IActionResult AddToFavorites(int id, [FromBody] FavoritesVM fav)
        {
            try
            {
                var res = userService.AddToFavorites(id, fav);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("rate-company/{id}")]
        public IActionResult Rate(int id, [FromBody] User_CompanyVM uc)
        {
            try
            {
                 userService.RateCompany(id, uc);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("number-of-users")]
        public IActionResult NumberOfUsers()
        {
            try
            {
                var res = userService.NumberOfUsers();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("send-message")]
        public IActionResult SendMessage([FromBody] SendMessageDto dto)
        {
            try
            {
                userService.SendMessage(dto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getMessages/{userId}")]
        public IActionResult GetUserMEssages(int userId)
        {
            try
            {
                var res = userService.GetMessages(userId);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getSentMessages/{userId}")]
        public IActionResult GetUserSentMEssages(int userId)
        {
            try
            {
                var res = userService.GetSentMessages(userId);
                return Ok(res);
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
                var res = userService.GetUsersChats(userId);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getAllMessages/{userId}/{companyId}")]
        public IActionResult GetAllMessages(int userId, int companyId)
        {
            try
            {
                var res = userService.GetMessagesBetweenUsers(userId, companyId);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
