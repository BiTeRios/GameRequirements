namespace GameRequirements.Common.DTO.Users
{
    public class UserPublicDto
    {
        public Guid Uuid { get; set; }
        public string Email { get; set; } = default!;
        public DateTime? LoginDateTime { get; set; }
    }
}
