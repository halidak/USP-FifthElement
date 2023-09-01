using System.ComponentModel.DataAnnotations;

namespace startUp_api.Data.ViewModels
{
    public class UserRegisterVM
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required, MinLength(6)]
        public string Password { get; set; }
        [Required, Compare("Password")]
        public string ConfirmPassword { get; set; }
        public string? Photo { get; set; }
        public List<int>? CompanyIds { get; set; }
        public List<string>? CompanyNames { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Document { get; set; }
    }
}
