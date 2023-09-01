using startUp_api.Data.Models;

namespace startUp_api.Data.ViewModels
{
    public class CompanyVM
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Location { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? Photo { get; set; }
        public double? Rate { get; set; }
    }
}
