using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataJuggler.Core.Cryptography;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProductApi.Config;
using ProductApi.Domain.Contracts.Repositories;
using ProductApi.Domain.Contracts.Services;
using ProductApi.Domain.Entities;

namespace ProductApi.Domain.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ConfigOptions _configOptions;

        public UserService(IUserRepository userRepository, IOptions<ConfigOptions> options)
        {
            _userRepository = userRepository;
            _configOptions = options.Value;
        }

        public async Task CreateUser(User user)
        {
            var encryptedPassword = CryptographyHelper.EncryptString(user.Password, _configOptions.Secret);
            user.Password = encryptedPassword;
            user.Id = Guid.NewGuid();
            await _userRepository.Add(user);
        }

        public string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configOptions.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor 
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<User> GetByCredentials(string userName, string password)
        {
            var users = await _userRepository.GetByUsername(userName);
            return users.Where(u => CryptographyHelper.DecryptString(u.Password, _configOptions.Secret) == password).FirstOrDefault();
        }
    }
}