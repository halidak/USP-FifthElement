using System.ComponentModel.DataAnnotations;

namespace startUp_api.Data.ViewModels
{
    public class ResetPasswordVM
    {
        [Required, MinLength(6)]
        public string NewPassword { get; set; }

        [Required, Compare("NewPassword")]
        public string ConformNewPassword { get; set; }
    }
}
