using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductApi.Domain.Contracts.Repositories;
using ProductApi.Domain.Entities;

namespace ProductApi.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly IProductRepository _productRepository;
        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [Route("")]
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Add([FromBody] Product product)
        {
            product.Id = Guid.NewGuid();
            var _product = await _productRepository.Add(product);
            return Ok(_product);
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAll()
        {
            var _products = await _productRepository.Get();
            return Ok(_products);
        }

        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> GetByName([FromQuery] string name)
        {
            var _product = await _productRepository.GetByName(name);
            return Ok(_product);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Remove([FromRoute] Guid id)
        {
            await _productRepository.Remove(id);
            return Ok();
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] Product product)
        {
            var _product = await _productRepository.Update(id, product);
            return Ok(_product);
        }
    }
}
