using System.ComponentModel.DataAnnotations;

namespace startUp_api.Data.ViewModels
{
    public class UserUpdateVM
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Photo { get; set; }
    }
}
