using GameRequirements.Domain.Context;
using GameRequirements.Domain.Entites.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Dal.Core
{
    public class UserApi
    {
        protected bool EmailExistsAction(string email) //Email Existence Check
        {
            using (var db = new UserContext())
                return db.Users.Any(u => u.Email == email);
        }
        protected void AddUserAction(DBUser user) //Add user to DataBase
        {
            using (var db = new UserContext())
            {
                db.Users.Add(user);
                db.SaveChanges();
            }
        }
        protected void AddUserSessionAction(DBUserSession dBUserSession)
        {
            using (var db = new UserContext())
            {
                db.Sessions.Add(dBUserSession);
                db.SaveChanges();
            }
        }
        protected DBUser GetUserByCredentialAction(string Email) //Get user for Email
        {
            using (var db = new UserContext())
            {
                return db.Users.FirstOrDefault(u =>u.Email.Equals(Email, StringComparison.OrdinalIgnoreCase));
            }
        }
        protected DBUserSession GetSessionByRefreshTokenAction(string refreshToken)
        {
            using (var db = new UserContext())
            {
                var session = db.Sessions
                    .Where(s => s.RefreshToken == refreshToken)
                    .FirstOrDefault();

                if (session != null)
                {
                    db.Entry(session).Reference(s => s.User).Load();
                }

                return session;
            }
        }
        protected void UpdateUserSessionAction(DBUserSession session)
        {
            using (var db = new UserContext())
            {
                db.Sessions.Update(session);
                db.SaveChanges();
            }
        }
    }
}
