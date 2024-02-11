using FIT_Api_Example.Helper;
using FIT_Api_Examples.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

namespace FIT_Api_Examples.Endpoints.StudentEndpoints
{
    public class StudentSnimiEndpoint : MyBaseEndpoint<StudentSnimiRequest, int>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public StudentSnimiEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost("student/snimi")]
        public override async Task<int> Obradi([FromBody]StudentSnimiRequest request, CancellationToken cancellationToken)
        {
            Student? Student;
            if (request.ID == 0)
            {
                Student = new Student();
                _applicationDbContext.Add(Student);
            }
            else {
                Student = _applicationDbContext.Student.FirstOrDefault(s => s.id == request.ID);
            }
            Student.ime = request.Ime;
            Student.prezime = request.Prezime;
            Student.opstina_rodjenja_id = request.OpstinaID;
            await _applicationDbContext.SaveChangesAsync(cancellationToken);
            return request.ID;
        }
    }
}
