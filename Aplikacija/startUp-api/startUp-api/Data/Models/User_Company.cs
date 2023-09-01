namespace startUp_api.Data.Models
{
    public class User_Company
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int? Rate { get; set; }
    }
}
