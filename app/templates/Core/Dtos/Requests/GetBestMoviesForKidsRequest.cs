using MediatR;

namespace <%= title %>.Core.Dtos.Requests
{
    public class GetBestMoviesForKidsRequest : IRequest<BaseResponseDto<MovieDto>>
    {
        
    }
}