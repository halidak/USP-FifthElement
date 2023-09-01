using startUp_api.Data.ViewModels;

namespace startUp_api.Data.Models
{
    public class User_Notice
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int NoticeId { get; set; }
        public Notice Notice { get; set; }
    }
}
