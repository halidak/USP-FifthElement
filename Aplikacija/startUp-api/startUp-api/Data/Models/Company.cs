namespace startUp_api.Data.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public bool Verified { get; set; }
        public string? VerificationToken { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Location { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? PasswordResetToken { get; set; }
        public string? Photo { get; set; }
        public string? Role { get; set; }
        public List<User_Company>? User_Company { get; set; }
        public List<Notice>? Notices { get; set; }
        public List<Messages>? Messages { get; set; }
    }
}
