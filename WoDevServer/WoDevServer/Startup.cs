using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;

using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WoDevServer.Database;
using WoDevServer.Database.Repository;
using WoDevServer.Middleware;
using WoDevServer.Models;
using WoDevServer.Services;

namespace WoDevServer
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

            services.AddDbContext<WodevContext>(options =>
                options.UseNpgsql(Environment.GetEnvironmentVariable("DATABASE"))
            );
            
            var appSettingsSection = Configuration.GetSection("Jwt");
            services.Configure<JwtOptions>(appSettingsSection);

            var appSettings = appSettingsSection.Get<JwtOptions>();
            services.AddMemoryCache();
            services.AddTransient<TokenManagerMiddleware>();
            services.AddSingleton<ITokenManager, Services.TokenManager>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {

                        var cache = context.HttpContext.RequestServices.GetRequiredService<IMemoryCache>();
                        if (context.Request.Headers.TryGetValue("authorization", out Microsoft.Extensions.Primitives.StringValues t))
                        {
                            var searchedCache = t.Single().Split(' ').AsEnumerable().Last();
                            var cachedToken = cache.Get(searchedCache);
                            if (cachedToken == null)
                                context.Fail(new UnauthorizedAccessException());

                        }


                        return Task.CompletedTask;
                    }
                };
                x.RequireHttpsMetadata = false;
                x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidIssuer = appSettings.Issuer,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(appSettings.SecretKey)),
                    ValidateLifetime = true,
                    ValidateAudience = false,
                    ValidateIssuer = false
                };
            });

            services.AddControllers().AddNewtonsoftJson(setting => setting.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WoDevServer", Version = "v1" });
            });
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IProfileRepository, ProfileRepository>();
            services.AddScoped<IUserProfileTypeRepository, UserProfileTypeRepository>();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>

                     builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());

            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WoDevServer v1"));
            //    DefaultFilesOptions defaultFilesOptions = new DefaultFilesOptions();
            //    defaultFilesOptions.DefaultFileNames.Clear();
            //    defaultFilesOptions.DefaultFileNames.Add("Index.html");

            //app.UseDefaultFiles(defaultFilesOptions);
            //app.UseStaticFiles();


            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMiddleware<TokenManagerMiddleware>();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}