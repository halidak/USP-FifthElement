using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Cmp;
using startUp_api.Data.Models;
using startUp_api.Data.ViewModels;
using System.Security.Claims;

namespace startUp_api.Data.Services
{
    public class NoticeService
    {
        private AppDbContext _context;

        public NoticeService(AppDbContext context)
        {
            _context = context;
        }

        public void AddNotice(NoticeVM request)
        {
            var notice = new Notice
            {
                Name = request.Name,
                Date = request.Date,
                Loaction = request.Loaction,
                Description = request.Description,
                CompanyId = request.CompanyId,
            };
            
             _context.Notices.Add(notice);
            _context.SaveChanges();
        }

        public NoticeWithIdVM GetNoticeById(int id)
        {
            var notice = _context.Notices.Where(n => n.Id == id).Select(n => new NoticeWithIdVM()
            {
                Id = id,
                Name = n.Name,
                Date = n.Date,
                Loaction = n.Loaction,
                Description = n.Description,
                CompanyName = n.Company.CompanyName,
                CompanyPhoto = n.Company.Photo,
                CompanyId = n.Company.Id,
                CompanyEmail = n.Company.Email,
                DateFormat = DateTime.Parse(n.Date)
        }).FirstOrDefault();


            return notice;
        }

        public void DeleteNoticeById(int id)
        {
            var notice = _context.Notices.FirstOrDefault(n => n.Id == id);
            if(notice != null)
            {
                _context.Notices.Remove(notice);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Notice not found");
            }
        }

        public List<NoticeWithIdVM> GetAllNotices()
        {
            var list = _context.Notices.Select(n => new NoticeWithIdVM()
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

            return list;
        }

        public bool SavedNotice(int userId, int noticeId)
        {
            var user = _context.Users.FirstOrDefault(n => n.Id == userId);
            var notice = _context.Notices.FirstOrDefault(n => n.Id == noticeId);
            if (user == null || notice == null)
            {
                throw new Exception("Bad request");
            }
            var application = _context.Favorites.FirstOrDefault(u => u.UserId == userId && u.NoticeId == noticeId);
            if (application == null)
            {
                return false;
            }
            return true;
        }

        public Notice UpdateNoticeById(int id, ChangeNotice notice)
        {
            var n = _context.Notices.FirstOrDefault(n => n.Id == id);
            if (n != null)
            {
                n.Name = notice.Name;
                n.Loaction = notice.Loaction;
                n.Date = notice.Date;
                n.Description = notice.Description;
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Notice not found");
            }

            return n;
        }

        public List<User> AllUsersApplied(int id)
        {
            var list = _context.Users_Notices.Include(u => u.User).Where(n => n.NoticeId == id).Select(e => e.User).ToList();
            return list;
        }


    }
}
