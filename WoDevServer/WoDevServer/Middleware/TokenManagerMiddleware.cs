using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WoDevServer.Services;

namespace WoDevServer.Middleware
{
    public class TokenManagerMiddleware : IMiddleware
    {
        private readonly ITokenManager _tokenManager;
        public TokenManagerMiddleware(ITokenManager tokenManager)
        {
            _tokenManager = tokenManager;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {

            if (_tokenManager.IsCurrentActiveToken() 
                || context.GetEndpoint()?.Metadata?.GetMetadata<IAllowAnonymous>() is object)
            {
                if (_tokenManager.IsCurrentActiveToken())
                {
                    _tokenManager.IncreaseValid();
                }
                await next(context);
                return;
            }
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
        }
    }
}
