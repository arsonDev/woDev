using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.Database.Model;
using WoDevServer.Database.Repository;
using WoDevServer.DatabaseTranslationObjects.Order;

namespace WoDevServer.Controllers
{
    [Route("api/order/")]
    [ApiController]
    [Authorize]
    public class OrderController : Controller
    {

        private readonly IMapper _mapper;
        private readonly IOrderRepository _orderRepository;

        public OrderController(IMapper mapper, IOrderRepository orderRepository)
        {
            _mapper = mapper;
            _orderRepository = orderRepository;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(OrderCreate order)
        {
            try
            {
                if (order == null)
                    return BadRequest();

                var mapped = _mapper.Map<Order>(order);

                await _orderRepository.Create(mapped);

                return Created(Request.Path,mapped);
            }catch(Exception e)
            {
                return StatusCode(500, e);
            }


        }
    }
}
