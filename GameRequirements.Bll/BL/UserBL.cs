using AutoMapper;
using GameRequirements.Bll.Interface;
using GameRequirements.Common.DTO.Users;
using GameRequirements.Dal.Core;

namespace GameRequirements.Bll.BL
{
    public sealed class UserBL(UserRepository _users, IMapper mapper) : IUserBL
    {
        private readonly IMapper _mapper = mapper;

        public async Task<UserPublicDto?> GetByUuidAsync(Guid uuid)
        {
            var db = await _users.GetByUuidAsync(uuid);
            return db is null ? null : _mapper.Map<UserPublicDto>(db);
        }

        public Task<UserPublicDto?> GetByEmailAsync(string email)
        {
            var db = _users.GetUserByEmail(email); // у тебя sync — завернём в Task
            var dto = db is null ? null : _mapper.Map<UserPublicDto>(db);
            return Task.FromResult(dto);
        }

        public Task<bool> EmailExistsAsync(string email)
            => Task.FromResult(_users.EmailExists(email));

        public async Task UpdateLastLoginAsync(Guid uuid, DateTime when)
        {
            var db = await _users.GetByUuidAsync(uuid);
            if (db is null) return; // можно бросать Validation/NotFound, если потребуется
            db.LoginDateTime = when;
            await _users.SaveChangesAsync();
        }
        public async Task<long> GetIdByUuidAsync(Guid uuid)
        {
            var db = await _users.GetByUuidAsync(uuid);
            return db?.Id ?? 0;
        }
    }
}
