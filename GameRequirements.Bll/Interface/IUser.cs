using GameRequirements.Common.DTO.Users;

namespace GameRequirements.Bll.Interface
{
    public interface IUserBL
    {
        Task<UserPublicDto?> GetByUuidAsync(Guid uuid);
        Task<UserPublicDto?> GetByEmailAsync(string email);
        Task<bool> EmailExistsAsync(string email);
        Task UpdateLastLoginAsync(Guid uuid, DateTime when);
    }
}
