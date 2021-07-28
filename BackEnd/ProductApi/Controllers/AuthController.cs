using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductApi.Domain.Contracts.Services;
using ProductApi.Domain.Entities;

namespace ProductApi.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : Controller
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] User model)
        {
            var user = await _userService.GetByCredentials(model.Username, model.Password);

            if (user == null)
                return NotFound(new {message = "Usuário ou senha ínvalidos!"});

            var token = _userService.GenerateToken(user);
            user.Password = "";
            return new
            {
                token = token
            };
        }

        [HttpPost]
        [Route("create-user")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<dynamic>> CreateUser([FromBody] User model)
        {
            await _userService.CreateUser(model);
            return Ok(new {message = "Usuario criado com sucesso!"});
        }
    }
}