﻿using GameOn.Exceptions;
using GameOn.Extensions;
using GameOn.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web;
using System;
using System.Threading.Tasks;

namespace GameOn.Users.Controllers
{
    /// <summary>
    /// Resources that take effect on the current user.
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class MeController : ControllerBase
    {
        private readonly ILogger<MeController> _log;
        private readonly UsersService _users;

        public MeController(ILogger<MeController> log, UsersService usersService)
        {
            _log = log;
            _users = usersService;
        }

        /// <summary>
        /// Get the current authenticated User
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<User>> Get()
        {
            var tenantId = User.GetTenantId();
            var userId = User.GameOnUserId();
            var user = await _users.Get(tenantId, userId);

            if (user is null)
            {
                _log.LogWarning($"User Id {userId} not found in Tenant {tenantId}");
                return NotFound($"User Id {userId} not found");
            }

            return user;
        }

        /// <summary>
        /// Create a User from Claims
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<User>> Post()
        {
            try
            {
                return new CreatedResult(
                               $"{Request.GetEncodedUrl()}",
                               await _users.Create(User.GetTenantId(), User.GameOnUser()));
            }
            catch (ConflictException ex)
            {
                // So that this endpoint can be idempotent, a Conflict status is not returned here.
                // The stored User is returned. It is not replaced. A 200 Ok status code is returned 
                // instead of 201 Created.
                _log.LogInformation($"Post: {ex.Message}. User was not replaced.");
                return new JsonResult(await _users.Get(User.GetTenantId(), User.GameOnUserId()));
            }
        }

        /// <summary>
        /// Get the current authenticated User profile photo
        /// </summary>
        /// <remarks> /me/photo[?size=128x128] </remarks>
        [HttpGet("photos")]
        public async Task<ActionResult<User>> GetPhoto([FromQuery] string size)
        {
            if (string.IsNullOrEmpty(size)) size = "120x120";

            try
            {
                var result = await _users.GetUserPhoto(User.GetTenantId(), User.GetObjectId(), size);
                if (result is null) return NotFound();
                return File(result.Content, result.ContentType);
            }
            catch (ArgumentOutOfRangeException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }
    }
}
