namespace startUp_api.Data.Models
{
    public class Favorites
    {
        public int Id { get; set; }
        public int NoticeId { get; set; }
        public Notice Notice { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
