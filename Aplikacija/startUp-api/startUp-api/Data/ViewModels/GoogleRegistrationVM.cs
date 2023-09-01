using System.ComponentModel.DataAnnotations;

namespace startUp_api.Data.ViewModels
{
    public class GoogleRegistrationVM
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        public string? Photo { get; set; }
    }
}
