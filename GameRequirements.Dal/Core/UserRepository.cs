using GameRequirements.Domain.Context;
using GameRequirements.Domain.Entites.User;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Dal.Core
{
    public class UserRepository : BaseRepository
    {
        private readonly DataContext _dataContext;

        public UserRepository(DataContext dataContext)
        : base(dataContext) // передаем в BaseRepository
        {
            _dataContext = dataContext;
        }

        /// <summary>
        /// Проверяет, существует ли пользователь с таким email.
        /// </summary>
        public bool EmailExists(string email)
        {
            return _dataContext.Users.Any(u => u.Email == email);
        }

        /// <summary>
        /// Получает пользователя по email.
        /// </summary>
        public DBUser? GetUserByEmail(string email)
        {
            return _dataContext.Users
                .FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
        }



        /// <summary>
        /// Получает сессию по refresh token.
        /// </summary>
        public async Task<DBUserSession?> GetSessionByRefreshToken(string refreshToken)
        {
            var session = await _dataContext.Sessions.Include(x => x.User)
                .FirstOrDefaultAsync(x => x.RefreshToken == refreshToken);

            return session;
        }
    }
}
