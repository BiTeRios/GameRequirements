using GameRequirements.Common.DTO.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Bll.Interface
{
    public interface ISession
    {
        SingInSuccess SingIn(SingInDTO singInDTO);
        LogInSuccess LogIn(LogInDTO logIndto);
    }
}
