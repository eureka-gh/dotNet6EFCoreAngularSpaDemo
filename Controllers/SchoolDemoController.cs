using System.Net;
using System.Diagnostics;
using System.Reflection;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using DataExplorerAPIService.DataModel;
using System.Runtime.CompilerServices;

namespace DataExplorerAPIService.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SchoolDemoController : ControllerBase
    {
        private readonly ILogger<SchoolDemoController> _logger;
        private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;
        private void TracingFuncCall([CallerMemberName]string name = "")
        {
            _logger.LogDebug($">>> {name}() is called");
        }

        public SchoolDemoController(
            ILogger<SchoolDemoController> logger,
            IDbContextFactory<ApplicationDbContext> contextFactory
            )
        {
            _logger = logger;
            _contextFactory = contextFactory;
        }

        [HttpGet("Student/All")]
        public async Task<ActionResult<IEnumerable<Student>>> GetAllStudentDto()
        {
            TracingFuncCall();

            using (var ctx = _contextFactory.CreateDbContext())
            {
                var rslt = await ctx.Students.ToListAsync();

                _logger.LogDebug($"Get {rslt.Count} student(s).");

                return rslt;
            }
        }

        [HttpGet("Student/{id}")]
        public async Task<ActionResult<Student>> GetStudentDto(int? id)
        {
            _logger.LogDebug($"Start of {MethodBase.GetCurrentMethod().Name}");

            if (id == null)
            {
                return NotFound();
            }

            using (var ctx = _contextFactory.CreateDbContext())
            {
                var s = await ctx.Students.Where(e => e.ID == id).FirstOrDefaultAsync();
                if (s == null)
                {
                    throw new HttpRequestException($"Not Found for Student with id:{id}", null, HttpStatusCode.NotFound);
                }
                else
                {
                    return s;
                }
            }
        }
    }
}
