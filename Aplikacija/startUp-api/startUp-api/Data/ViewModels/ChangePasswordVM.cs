using System.ComponentModel.DataAnnotations;

namespace startUp_api.Data.ViewModels
{
    public class ChangePasswordVM
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required, MinLength(6)]
        public string NewPassword { get; set; }

        [Required, Compare("NewPassword")]
        public string ConformNewPassword { get; set; }
    }
}
