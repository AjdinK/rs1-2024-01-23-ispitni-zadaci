using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FIT_Api_Examples.Endpoints.StudentEndpoints
{
    public class StudentMaticnaSnimiRequest
    {
        public int Id { get; set; }
        public int AkademskaGodinaId { get; set; }
        public int GodinaStudija { get; set; }
        public bool Obnova { get; set; }
        public DateTime ZimskiSemesterUpis { get; set; }
        public int CijenaSkolarine { get; set; }
        public int EvidentiraoKorsinikId { get; set; }

    }
}
