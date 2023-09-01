using System.ComponentModel.DataAnnotations;

namespace startUp_api.Data.ViewModels
{
    public class UserCompanyLoginVM
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

    }
}
