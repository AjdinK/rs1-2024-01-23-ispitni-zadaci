using FIT_Api_Example.Helper;
using FIT_Api_Examples.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FIT_Api_Examples.Endpoints.StudentEndpoints
{
    public class StudentBrisiEndpoint : MyBaseEndpoint<int, int>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public StudentBrisiEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpDelete("student/brisi")]

        public override async Task<int> Obradi([FromQuery]int request, CancellationToken cancellationToken)
        {

            var student = _applicationDbContext.Student.FirstOrDefault(s => s.id == request);
            if (student != null) { 
                student.JelObrisan = true;
                await _applicationDbContext.SaveChangesAsync(cancellationToken);
                return request;
            }
            else {
                throw new System.Exception("Error");
            }
        }
    }
}
