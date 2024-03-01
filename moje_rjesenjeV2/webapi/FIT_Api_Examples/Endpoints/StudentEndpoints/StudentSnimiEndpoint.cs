using System.Threading;
using System.Threading.Tasks;
using FIT_Api_Example.Helper;
using FIT_Api_Examples.Data;
using Microsoft.AspNetCore.Mvc;

namespace FIT_Api_Examples.Endpoints.StudentEndpoints;

public class StudentSnimiEndpoint : MyBaseEndpoint<StudentSnimiRequest, int>
{
    private readonly ApplicationDbContext _applicationDbContext;

    public StudentSnimiEndpoint(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }
    [HttpPost("student/snimi")]
    public override async Task<int> Obradi([FromBody] StudentSnimiRequest request, CancellationToken cancellationToken)
    {
        Student Student;
        if (request.Id == 0)
        {
            Student = new Student();
            _applicationDbContext.Add(Student);
        }
        else
        {
            Student = await _applicationDbContext.Student.FindAsync(request.Id);
        }

        Student.ime = request.Ime;
        Student.prezime = request.Prezime;
        Student.opstina_rodjenja_id = request.OpstinaId;
        await _applicationDbContext.SaveChangesAsync(cancellationToken);
        return request.Id;
    }
}