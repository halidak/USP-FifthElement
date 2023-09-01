namespace startUp_api.Data.ViewModels
{
    public class NoticeVM
    {
        public string Name { get; set; }
        public string Date { get; set; }
        public string Loaction { get; set; }
        public string Description { get; set; }
        public int CompanyId { get; set; }
    } 

    public class ChangeNotice
    {
        public string Name { get; set; }
        public string Date { get; set; }
        public string Loaction { get; set; }
        public string Description { get; set; }
    }

    public class NoticeWithIdVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public string Loaction { get; set; }
        public string Description { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyPhoto { get; set; }
        public string CompanyEmail { get; set; }
        public DateTime DateFormat { get; set; }
        public bool Saved { get; set; }
    }

    public class NoticeWithoutIdVM
    {
        public string Name { get; set; }
        public string Date { get; set; }
        public string Loaction { get; set; }
        public string Description { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyPhoto { get; set; }
        public string CompanyEmail { get; set; }
        public DateTime DateFormat { get; set; }
        public bool Saved { get; set; }
    }
}
