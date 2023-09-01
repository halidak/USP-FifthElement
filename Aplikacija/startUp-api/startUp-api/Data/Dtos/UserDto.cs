namespace startUp_api.Data.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string? VerificationToken { get; set; }
        public string? ResetPasswordToken { get; set; }
        public string? Photo { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public List<int>? FavoriteNotices { get; set; }
    }
}
