using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FIT_Api_Example.Helper;
using FIT_Api_Examples.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FIT_Api_Examples.Endpoints.StudentEndpoints
{
    public class StudentMaticnaGetEndpoint : MyBaseEndpoint<int, StudentMaticnaGetResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public StudentMaticnaGetEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet("StudentMaticna/Get")]
        public override async Task<StudentMaticnaGetResponse> Obradi([FromQuery] int request, CancellationToken cancellationToken)
        {
            var Student = await _applicationDbContext.Student.FindAsync(request);
            if (Student == null)
                throw new Exception("Greska StudentMaticnaGetEndpoint student not found");

            var rez = new StudentMaticnaGetResponse
            {
                StudentId = Student.id,
                StudentIme = Student.ime,
                StudentPrezime = Student.prezime,
                UpisaneGodne = await _applicationDbContext.UpisAkGodina
                .Where(u => u.StudentId == Student.id)
                .Select(u => new UpisaneGodine
                {
                    Id = u.Id,
                    AkademskaGodina = u.AkademskaGodina.opis,
                    GodinaStudija = u.GodinaStudija,
                    Obnova = u.Obnova,
                    ZimskiSemesterUpis = u.ZimskiSemesterUpis,
                    ZimskiSemesterOvjera = u.ZimskiSemesterOvjera,
                    EvidentiraoKorsinik = new EvidentiraoKorsinik
                    {
                        Id = u.KorisnickiNalog.id,
                        KorisnickoIme = u.KorisnickiNalog.korisnickoIme
                    }
                })
                .ToListAsync(cancellationToken)
            };
            return rez;
        }
    }
}
