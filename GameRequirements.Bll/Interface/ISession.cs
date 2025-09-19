using GameRequirements.Common.DTO.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Bll.Interface
{
    public interface ISessionBL
    {
        Task<AuthSuccessResponse> SingIn(SingInDTO singInDTO);
        Task<AuthSuccessResponse> LogIn(LogInDTO logIndto);
        Task<AuthSuccessResponse> RefreshTokens(string accessToken, string refreshToken);
    }
}
