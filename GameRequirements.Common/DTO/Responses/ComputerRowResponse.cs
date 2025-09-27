namespace GameRequirements.Common.DTO.Responses
{
    public sealed class ComputerRowResponse
    {
        public long Id { get; set; }
        public long ProcessorId { get; set; }
        public long VideoCardId { get; set; }
        public int Ram { get; set; }
        public DateTime? CreatedAt { get; set; } // если у тебя есть в БД/выводится из BL
    }
}
