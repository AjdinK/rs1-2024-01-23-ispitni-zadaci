using System.Threading;
using System.Threading.Tasks;
using FIT_Api_Example.Helper;
using FIT_Api_Examples.Data;
using Microsoft.AspNetCore.Mvc;

public class StudentMaticnaOvjeriEndpoint : MyBaseEndpoint<StudentMaticnaOvjeriRequest, int>
{
    private readonly ApplicationDbContext _applicationDbContext;

    public StudentMaticnaOvjeriEndpoint(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    [HttpPost("StudentMaticna/Ovjeri")]
    public override async Task<int> Obradi([FromBody] StudentMaticnaOvjeriRequest request, CancellationToken cancellationToken)
    {
        var upis = await _applicationDbContext.UpisAkGodina.FindAsync(request.Id);
        if (upis != null)
        {
            upis.ZimskiSemesterOvjera = request.ZimskiSemesterOvjera;
            upis.Napomena = request.Napomena;
            await _applicationDbContext.SaveChangesAsync(cancellationToken);
            return request.Id;
        }
        else
        {
            throw new System.Exception("Greska StudentMaticnaOvjeriEndpoint upis id -> " + request.Id + " Ne postoji");
        }
    }
}