namespace startUp_api.Data.Dtos
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string? VerificationToken { get; set; }
        public string? PasswordResetToken { get; set; }
        public string? Photo { get; set; }
        public string  Role { get; set; }
    }
}
