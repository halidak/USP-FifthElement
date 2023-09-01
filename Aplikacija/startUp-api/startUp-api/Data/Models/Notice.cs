namespace startUp_api.Data.Models
{
    public class Notice
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public string Loaction { get; set; }
        public string Description { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public List<User_Notice> User_Notice { get; set; }
        public bool Saved { get; set; }
    }
}
