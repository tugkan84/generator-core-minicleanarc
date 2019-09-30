using System.Threading;
using System.Threading.Tasks;
using MediatR;
using <%= title %>.Core.Dtos;
using <%= title %>.Core.Dtos.Requests;

namespace <%= title %>.Core.Services.MovieUseCases
{
    public class GetBestMoviesForKidsHandler : IRequestHandler<GetBestMoviesForKidsRequest, BaseResponseDto<MovieDto>>
    {
        public Task<BaseResponseDto<MovieDto>> Handle(GetBestMoviesForKidsRequest request, CancellationToken cancellationToken)
        {
            var response = new BaseResponseDto<MovieDto>();

            // some logic...

            return Task.FromResult(response);
        }
    }
}