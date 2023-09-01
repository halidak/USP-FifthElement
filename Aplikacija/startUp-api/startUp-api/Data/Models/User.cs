namespace startUp_api.Data.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public string Role { get; set; }
        public bool Verified { get; set; }
        public string? VerificationToken { get; set; }
        public string? ResetPasswordToken { get; set; }
        public List<User_Company>? User_Company { get; set; }
        public List<User_Notice>? User_Notice { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Photo { get; set; }
        public string? Document { get; set; }
        public List<Messages>? Messages { get; set; }
        public List<Favorites>? FavoriteNotices { get; set; }
    }
}
