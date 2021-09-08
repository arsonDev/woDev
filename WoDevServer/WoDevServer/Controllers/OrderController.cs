using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
    public class OrderController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;

        public OrderController(IMapper mapper, IOrderRepository orderRepository,IUserRepository userRepository)
        {
            _mapper = mapper;
            _orderRepository = orderRepository;
            _userRepository = userRepository;
        }

        [HttpPost]
        [Route("create")]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> Create(OrderCreate order)
        {
            try
            {
                if (order == null)
                    return BadRequest();

                var mapped = _mapper.Map<Order>(order);

                await _orderRepository.Create(mapped);

                var result = _mapper.Map<OrderItemRead>(mapped);

                return Created(Request.Path, result);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        /// <summary>
        /// Wczytuje zlecenia utworzone przez mnie
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("getMy")]
        public async Task<IActionResult> GetMy(int userId, int page = 1, int pageSize = 10)
        {
            try
            {
                var list = await _orderRepository.GetMyOrders(userId, page, pageSize);
                var mappedList = _mapper.Map<List<OrderItemRead>>(list.Item1);

                return Content(JsonConvert.SerializeObject(new OrderList { Count = list.Item2, Orders = mappedList }));
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        /// <summary>
        /// Wczytuje zlecenia nad ktorymi pracuje aktualnie
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("getOrderInProgres")]
        public async Task<IActionResult> GetOrderInWorkers(int userId, int page = 1, int pageSize = 10)
        {
            try
            {
                var list = await _orderRepository.GetOrderInProgres(userId, page, pageSize);

                var mappedList = _mapper.Map<List<OrderItemRead>>(list.Item1);

                return Content(JsonConvert.SerializeObject(new OrderList { Count = list.Item2, Orders = mappedList }));
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPut("{id}")]
        [DisableRequestSizeLimit]
        //[Route("update")]
        public async Task<IActionResult> UpdateOrder(int id, OrderUpdate patchDto)
        {
            try
            {
                var order = await _orderRepository.GetById(id);
                if (order == null)
                    return NotFound();

                var user =  await _userRepository.GetByIdAsync(patchDto.WorkingUser.UserId);

                _mapper.Map(patchDto, order);
                order.WorkingUser = user;
                await _orderRepository.Update(order);



                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }

        }

    }
}
