using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FIT_Api_Example.Helper;
using FIT_Api_Examples.Data;
using Microsoft.AspNetCore.Mvc;

namespace FIT_Api_Examples.Endpoints.StudentEndpoints
{
    public class StudentMaticnaSnimiEndpoint : MyBaseEndpoint<StudentMaticnaSnimiRequest, int>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public StudentMaticnaSnimiEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost("StudentMaticna/Snimi")]
        public override async Task<int> Obradi(StudentMaticnaSnimiRequest request, CancellationToken cancellationToken)
        {
            if (_applicationDbContext.UpisAkGodina
            .ToList()
            .Exists(u => u.StudentId == request.Id && u.GodinaStudija == request.GodinaStudija))
            {
                if (request.Obnova)
                {
                    NoviUpis();
                    await _applicationDbContext.SaveChangesAsync(cancellationToken);
                    return request.Id;
                }
                else
                {
                    return 0;
                }
            }
            else
            {
                NoviUpis();
                await _applicationDbContext.SaveChangesAsync(cancellationToken);
                return request.Id;

            }
            void NoviUpis()
            {
                var noviUpis = new UpisAkGodina
                {
                    StudentId = request.Id,
                    AkademskaGodinaId = request.AkademskaGodinaId,
                    GodinaStudija = request.GodinaStudija,
                    Obnova = request.Obnova,
                    ZimskiSemesterUpis = request.ZimskiSemesterUpis,
                    CijenaSkolarine = request.CijenaSkolarine,
                    KorisnickiNalogId = request.EvidentiraoKorsinikId
                };
                _applicationDbContext.Add(noviUpis);
            }
        }
    }
}
