using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PaymentApi.Contracts;
using PaymentApi.RabbitMQ.Payloads;

namespace PaymentApi.Controllers
{
    [ApiController]
    [Route("api")]
    public class PaymentController : Controller
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost]
        [Route("try-pay-again/{buyId}")]
        public async Task<IActionResult> TryPayAgain([FromRoute] Guid buyId, [FromBody] CardPayload card)
        {
            var buy = await _paymentService.GetBuy(buyId);
            if (buy == null) return NotFound();

            var result = await _paymentService.ProcessPaymentAgain(buy, card);
            return Ok(result);
        }
    }
}