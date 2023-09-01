namespace startUp_api.Data.Dtos
{
    public class MessageDto
    {
        public int FromId { get; set; }
        public string FromName { get; set; }
        public string ToName { get; set; }
        public int ToId { get; set; }
        public string Message { get; set; }
        public string Time { get; set; }
        public DateTime TimeStamp { get; set; }
        public bool sender { get; set; }
    }
}
