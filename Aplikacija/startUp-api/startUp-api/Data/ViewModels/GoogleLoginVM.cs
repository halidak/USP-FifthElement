using System.ComponentModel.DataAnnotations;

namespace startUp_api.Data.ViewModels
{
    public class GoogleLoginVM
    {
        [Required, EmailAddress]
        public string Email { get; set; }
    }
}
