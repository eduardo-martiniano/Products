﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductApi.Contracts;
using ProductApi.Entities;

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
        public IActionResult Add([FromBody] Product product)
        {
            var _product = _productRepository.Add(product);
            return Ok(_product);
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            var _products = _productRepository.Get();
            return Ok(_products);
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Remove([FromRoute] int id)
        {
            _productRepository.Remove(id);
            return Ok();
        }
    }
}
