using AutoMapper;
using GameRequirements.Common.DTO.Responses;
using GameRequirements.Common.DTO.Users;
using GameRequirements.Domain.Entites.Completing_computers;
using GameRequirements.Domain.Entites.User;

namespace GameRequirements.Bll.Mapping
{
    public class Profiles : Profile
    {
        public Profiles()
        {
            CreateMap<DBUser, UserPublicDto>(); // Email, Uuid, LoginDateTime
            CreateMap<DBProcessor, ComboItemDto>()
                .ForMember(d => d.Id, m => m.MapFrom(s => s.Id))
                .ForMember(d => d.Name, m => m.MapFrom(s => s.Name));

            CreateMap<DBVideoCard, ComboItemDto>()
                .ForMember(d => d.Id, m => m.MapFrom(s => s.Id))
                .ForMember(d => d.Name, m => m.MapFrom(s => s.Name));
        }
    }
}
