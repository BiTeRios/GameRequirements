using GameRequirements.Domain.Context;
using GameRequirements.Domain.DBModel.User;
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
        protected DBUser GetUserByCredentialAction(string Email) //Get user for Email
        {
            using (var db = new UserContext())
            {
                return db.Users.FirstOrDefault(u =>u.Email.Equals(Email, StringComparison.OrdinalIgnoreCase));
            }
        }
    }
}
