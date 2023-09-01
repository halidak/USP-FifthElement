using System.ComponentModel.DataAnnotations;

namespace startUp_api.Data.ViewModels
{
    public class CompanyRegisterVM
    {
        [Required]
        public string CompanyName { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required, MinLength(6)]
        public string Password { get; set; }
        [Required, Compare("Password")]
        public string ConfirmPassword { get; set; }
        public List<int>? UserIds { get; set; }
    }
}
