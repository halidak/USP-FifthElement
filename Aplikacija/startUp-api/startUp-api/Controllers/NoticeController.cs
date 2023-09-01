using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using startUp_api.Data.Services;
using startUp_api.Data.ViewModels;

namespace startUp_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticeController : ControllerBase
    {
        private NoticeService noticeService;

        public NoticeController(NoticeService noticeService)
        {
            this.noticeService = noticeService;
        }

        [HttpPost("add-notice")]
        public IActionResult AddNotice([FromBody] NoticeVM request)
        {
            try
            {
                noticeService.AddNotice(request);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("get-notice-by-id/{id}")]
        public IActionResult GetNoticeById(int id)
        {
            try
            {
                var response = noticeService.GetNoticeById(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-notice")]
        public IActionResult DeleteNoticeById(int id)
        {
            try
            {
                noticeService.DeleteNoticeById(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-all-notices")]
        public IActionResult GetAllNotices()
        {
            try
            {
                var n = noticeService.GetAllNotices();
                return Ok(n);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update-notice-by-id/{id}")]
        public IActionResult UpdateNoticeBuId(int id, [FromBody] ChangeNotice notice)
        {
            try
            {
                var updated = noticeService.UpdateNoticeById(id, notice);
                return Ok(updated);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("users-applied/{id}")]
        public IActionResult AllUsersApplied(int id)
        {
            try
            {
                var list = noticeService.AllUsersApplied(id);
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("saved/{userId}/{noticeId}")]
        public IActionResult Saved(int userId, int noticeId)
        {
            try
            {
                var list = noticeService.SavedNotice(userId, noticeId);
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
