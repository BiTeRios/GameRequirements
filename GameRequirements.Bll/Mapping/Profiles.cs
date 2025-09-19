using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
// using GameRequirements.Common.DTO.Auth;
// using GameRequirements.Domain.Entites.User;
// using GameRequirements.Dal.Core;

namespace GameRequirements.Bll.Mapping
{
    public class Profiles : Profile
    {
        public Profiles()
        {
            // Здесь будут маппинги, когда появятся публичные User/Game DTO.
            // CreateMap<DBUser, UserPublicDto>();
            // CreateMap<SingInDTO, DBUser>()
            //     .ForMember(d => d.PasswordHash, cfg => cfg.Ignore());
        }
    }
}
