using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DenemeTitle.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using DenemeTitle.Core.Interfaces;
using DenemeTitle.Core.Services.MovieUseCases;
using DenemeTitle.Infrastructure.Repositories;


namespace DenemeTitle.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Infrastructure
            services.AddDbContext<AppDbContext>(opt => {

                opt.UseInMemoryDatabase(Configuration.GetConnectionString("TestDB"));
            });
            
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            //Services
            services.AddMediatR(typeof(CreateMovieHandler));

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
               
            });

        }
    }
}
