# AAD B2B + ASP.NET Core Web API

I found this really hard to get working. The key lesson is:

## Make sure you are actually sending a Bearer token!

* Header is named "Authorization"
* The word "Bearer " is concatenated with the id token
* CORS is configured correctly; specifically `AllowCredentials()` is enabled

```csharp
services.AddCors(options =>
    {
        options.AddDefaultPolicy(
            builder =>
            {
                builder
                    .WithOrigins("http://localhost:3000", "https://gameon.nz", "https://localhost:44357")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
    });
```

* CORS, Authn and Authz middleware is invoked in the correct order!

```csharp
    app.UseRouting();
    app.UseAuthentication();
    app.UseCors();
    app.UseAuthorization();
```

* And on the client side, make sure you include credentials:

```javascript
fetch('https://localhost:44318/tournaments/abcd1234', 
    { 
        credentials: 'include', 
        headers: { 
            'Authorization': 'Bearer ' + resp.accessToken 
        }
    })
    .then(response => response.json())
    .then(data => console.log(data));
```

* Check the Network tab in F12 Developer Tools (in Edge) to ensure that Authorization header is being sent and CORS is not failing
* In ASP.NET, debug the Authz middleware by following these instructions: [Troubleshooting ASP.NET Core Azure AD protected web API authorization issues](https://blogs.aaddevsup.xyz/2019/12/troubleshooting-asp-net-core-azure-ad-protected-web-api-authorization-issues/)
* Inspect the id token in <https://jwt.ms> and ensure the Audience and Authority (Issuer) match what is configured

## Multi-tenant

### In the services:

* Set the `Authority` to `https://login.microsoftonline.com/common/`
* Turn off Issuer validation. The app is now responsible for validating Issuers.

```csharp
options.TokenValidationParameters = new TokenValidationParameters { ValidateIssuer = false };
```

Good overview here: [Authenticate using Azure AD and OpenID Connect - Configure the auth middleware](https://docs.microsoft.com/en-us/azure/architecture/multitenant-identity/authenticate#configure-the-auth-middleware)

### In the client:

* Change the `authority` to: 
  * `https://login.microsoftonline.com/organizations/` - to accept  work/school accounts only
  * `https://login.microsoftonline.com/consumers/` - to accept personal accounts only
  * `https://login.microsoftonline.com/common/` - to accept either

See also: [Application configuration options - Authority](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-client-application-configuration#authority)