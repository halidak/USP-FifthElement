namespace startUp_api.Data.Dtos
{
    public class SendMessageDto
    {
        public int FromId { get; set; }
        public int ToId { get; set; }
        public string Message { get; set; }
    }
}
