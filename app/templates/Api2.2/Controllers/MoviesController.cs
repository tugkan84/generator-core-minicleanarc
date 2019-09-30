using MediatR;
using Microsoft.AspNetCore.Mvc;
using <%= title %>.Core.Dtos;
using <%= title %>.Core.Dtos.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace <%= title %>.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MoviesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateMovieAsync([FromBody]CreateMovieRequest createMovieRequest)
        {
            BaseResponseDto<bool> createResponse = await _mediator.Send(createMovieRequest);

            if (createResponse.Data)
            {
                return Created("...", null);
            }
            else
            {
                return BadRequest(createResponse.Errors);
            }
        }
    }
}
