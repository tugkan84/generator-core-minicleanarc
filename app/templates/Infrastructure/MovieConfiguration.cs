using Microsoft.EntityFrameworkCore;
using <%= title %>.Core.Models;

namespace <%= title %>.Infrastructure.EntityConfigurations
{
    public class MovieConfiguration : IEntityTypeConfiguration<Movie>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Movie> builder)
        {
            builder.HasKey(_ => _.Id);
        }
    }
}