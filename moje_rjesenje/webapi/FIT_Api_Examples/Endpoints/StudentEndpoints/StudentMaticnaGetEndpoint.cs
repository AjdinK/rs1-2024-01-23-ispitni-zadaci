using FIT_Api_Example.Helper;
using FIT_Api_Examples.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FIT_Api_Examples.Endpoints.StudentEndpoints
{
    public class StudentMaticnaGetEndpoint : MyBaseEndpoint<int, StudentMaticnaGetResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public StudentMaticnaGetEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet ("StudentMaticna/Get")]
        public override async Task <StudentMaticnaGetResponse> Obradi([FromQuery]int request, CancellationToken cancellationToken)
        {
            var Student = await _applicationDbContext.Student.FindAsync(request); 
            if (Student == null)
            throw new System.Exception("Greska....");

            var rez = new StudentMaticnaGetResponse {
                StudentID = Student.id,
                StudentIme = Student.ime,
                StudentPrezime = Student.prezime,
                UpisaneGodine = await _applicationDbContext.UpisAkGodina
                .Where(u => u.StudentID == Student.id)
                .Select(u => new UpisaneGodine {
                    ID = u.ID,
                    AkademskaGodina = u.AkademskaGodina.opis,
                    GodinaStudija = u.GodinaStudija,
                    Obnova = u.Obnova,
                    ZimskiSemsterUpis = u.ZimskiSemsterUpis,
                    ZimskiSemsterOvjera = u.ZimskiSemsterOvjera,
                    EvidentiraoKorsinik = new EvidentiraoKorsinik { 
                        ID = u.KorisnickiNalog.id,
                        KorsinickoIme = u.KorisnickiNalog.korisnickoIme
                    }
                })
            .ToListAsync(cancellationToken: cancellationToken)
            };
            return rez;
        }
    }
}
