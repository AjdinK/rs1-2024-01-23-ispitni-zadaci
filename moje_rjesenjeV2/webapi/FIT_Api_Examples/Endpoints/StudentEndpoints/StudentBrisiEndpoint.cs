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
    public class StudentBrisiEndpoint : MyBaseEndpoint<int, int>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public StudentBrisiEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpDelete("Student/Brisi")]
        public override async Task<int> Obradi([FromQuery] int request, CancellationToken cancellationToken)
        {
            var student = await _applicationDbContext.Student.FindAsync(request);
            if (student != null)
            {
                student.JelObrisan = true;
                await _applicationDbContext.SaveChangesAsync(cancellationToken);
                return request;
            }
            else
            {
                throw new Exception("Greska ID " + request + " Ne postoji");
            }
        }
    }
}