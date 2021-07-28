using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProductApi.Domain.Contracts.Services;
using ProductApi.Domain.Models.ViewModels;

namespace ProductApi.Controllers
{
    [ApiController]
    [Route("api/buy")]
    public class BuyController : Controller
    {
        private readonly IBuyService _buyService;

        public BuyController(IBuyService buyService)
        {
            _buyService = buyService;
        }
 
        [HttpPost]
        [Route("process")]
        public async Task<IActionResult> Process([FromBody] BuyViewModel model)
        {
            var result = await _buyService.Process(model);
            return Ok(result);
        }
    }
}