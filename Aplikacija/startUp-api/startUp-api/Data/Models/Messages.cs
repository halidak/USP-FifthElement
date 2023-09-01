namespace startUp_api.Data.Models
{
    public class Messages
    {
        public int Id { get; set; }
        public int FromCompanyId { get; set; }
        public int ToCompanyId { get; set; }
        public int ToUserId { get; set; }
        public int FromUserId { get; set; }
        public Company Company { get; set; }
        public int CompanyId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Message { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
