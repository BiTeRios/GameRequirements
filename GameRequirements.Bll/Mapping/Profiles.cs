using AutoMapper;
using GameRequirements.Common.DTO.Users;
using GameRequirements.Domain.Entites.User;

namespace GameRequirements.Bll.Mapping
{
    public class Profiles : Profile
    {
        public Profiles()
        {
            CreateMap<DBUser, UserPublicDto>(); // Email, Uuid, LoginDateTime
        }
    }
}
