using GameRequirements.Bll.Interface;
using GameRequirements.Common.DTO.Auth;
using GameRequirements.Common.PasswordHash;
using GameRequirements.Dal.Core;
using GameRequirements.Domain.DBModel.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Bll.BL
{
    public class SessionBL : UserApi, ISession
    {
        public SingInSuccess SingIn(SingInDTO singInDTO)
        {
            var result = new SingInSuccess();

            if (EmailExistsAction(singInDTO.Email))
            {
                result.Success = false;
                result.EmailSuccess = false;
                result.Message = "Email is already registered.";
                return result;
            }

            var passwordHash = PasswordHelper.HashPassword(singInDTO.Password);

            var newUser = new DBUser
            {
                Email = singInDTO.Email,
                PasswordHash = passwordHash,
                LoginDateTime = DateTime.Now,
            };

            AddUserAction(newUser);

            result.Success = true;
            result.EmailSuccess = true;
            result.Message = "Registration was successful.";
            return result;
        }
        public LogInSuccess LogIn(LogInDTO logInDTO)
        {
            var result = new LogInSuccess();

            var user = GetUserByCredentialAction(logInDTO.Email);

            if (user != null)
            {
                result.Success = false;
                result.EmailSuccess = false;
                result.PasswordSuccess = false;
                result.Message = "User not found.";
                return result;
            }

            result.EmailSuccess = true;

            if(!PasswordHelper.VerifyPassword(logInDTO.Password, user.PasswordHash))
            {
                result.Success = false;
                result.PasswordSuccess = false;
                result.Message = "Incorrect password.";
                return result;
            }

            result.Success = true;
            result.UserId = user.Id;
            result.PasswordSuccess = true;
            result.Message = "Login successful.";

            return result;
        }
    }
}
