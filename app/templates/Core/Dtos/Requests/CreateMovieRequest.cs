using MediatR;

namespace <%= title %>.Core.Dtos.Requests
{
    public class CreateMovieRequest : IRequest<BaseResponseDto<bool>>
    {
        public string Name { get; set; }
        public double Rating { get; set; }
    }
}