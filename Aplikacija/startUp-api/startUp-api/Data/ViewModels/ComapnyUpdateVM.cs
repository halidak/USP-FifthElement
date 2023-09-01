using System.ComponentModel.DataAnnotations;

namespace startUp_api.Data.ViewModels
{
    public class ComapnyUpdateVM
    {
        public string CompanyName { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Location { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? Photo { get; set; }
    }
}
