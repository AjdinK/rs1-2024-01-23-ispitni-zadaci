using FIT_Api_Example.Helper;
using FIT_Api_Examples.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FIT_Api_Examples.Endpoints.StudentEndpoints
{
    public class StudentMaticnaDodajEndpoint : MyBaseEndpoint<StudentMaticnaDodajRequest, int>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public StudentMaticnaDodajEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost("StudentMaticna/Dodaj")]
        public override async Task<int> Obradi([FromBody]StudentMaticnaDodajRequest request, CancellationToken cancellationToken)
        {
            if (_applicationDbContext.UpisAkGodina
                .ToList()
                .Exists(u => u.StudentID == request.Id && u.GodinaStudija == request.GodinaStudija))
            {
                if (request.obnova)
                {
                    var noviUpis = new UpisAkGodina
                    {
                        StudentID = request.Id,
                        CijenaSkolarine = request.CijenaSkolarine,
                        GodinaStudija = request.GodinaStudija,
                        ZimskiSemsterUpis = request.ZimskiSemsterUpis,
                        AkademskaGodinaID = request.AkademskaGodinaID,
                        Obnova = request.obnova,
                        KorisnickiNalogID = request.EvidentiraoKorsinikID,
                    };
                    _applicationDbContext.Add(noviUpis);
                    await _applicationDbContext.SaveChangesAsync(cancellationToken: cancellationToken);
                    return request.Id;
                }
                else
                {
                    return 0;
                }
            }
            else {
                var noviUpis = new UpisAkGodina
                {
                    StudentID = request.Id,
                    CijenaSkolarine = request.CijenaSkolarine,
                    GodinaStudija = request.GodinaStudija,
                    ZimskiSemsterUpis = request.ZimskiSemsterUpis,
                    AkademskaGodinaID = request.AkademskaGodinaID,
                    Obnova = request.obnova,
                    KorisnickiNalogID = request.EvidentiraoKorsinikID,
                };
                _applicationDbContext.Add(noviUpis);
                await _applicationDbContext.SaveChangesAsync(cancellationToken: cancellationToken);
                return request.Id;
            }
        }
    }
}
