using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.Database.Model;
using WoDevServer.DatabaseTranslationObjects.Order;
using WoDevServer.DatabaseTranslationObjects.OrderFile;

namespace WoDevServer.MapProfile
{
    public class MapOrder : Profile
    {
        public MapOrder()
        {
            CreateMap<Order, OrderCreate>()
                .ReverseMap()
                .ForMember(dst => dst.WorkingUser, dst => dst.Ignore())
                .ForMember(dst => dst.Id, dst => dst.Ignore())
                .ForMember(dst => dst.CreationDate, dst => dst.Ignore());

            CreateMap<OrderFile, OrderFileRead>()
                .ReverseMap()
                .ForMember(dst => dst.Id, dst => dst.Ignore())
                .ForMember(dst => dst.CreateDate, dst => dst.Ignore())
                .ForMember(dst => dst.Order, dst => dst.Ignore());

            CreateMap<Order, OrderItemRead>();
            CreateMap<OrderItemRead, Order>();

            CreateMap<OrderUpdate, Order>().ForMember(dst => dst.Id, dst => dst.Ignore())
                .ForMember(dst => dst.CreationDate, dst => dst.Ignore());
            CreateMap<Order, OrderUpdate>();

        }
    }
}
