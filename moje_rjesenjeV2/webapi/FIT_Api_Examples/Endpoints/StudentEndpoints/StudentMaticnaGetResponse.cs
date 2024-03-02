using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FIT_Api_Examples.Endpoints.StudentEndpoints
{
    public class StudentMaticnaGetResponse
    {
        public int StudentId { get; set; }
        public string StudentIme { get; set; }
        public string StudentPrezime { get; set; }
        public List<UpisaneGodine> UpisaneGodne { get; set; }
    }
    public class UpisaneGodine
    {
        public int Id { get; set; }
        public string AkademskaGodina { get; set; }
        public int GodinaStudija { get; set; }
        public bool Obnova { get; set; }
        public DateTime ZimskiSemesterUpis { get; set; }
        public DateTime? ZimskiSemesterOvjera { get; set; }
        public EvidentiraoKorsinik EvidentiraoKorsinik { get; set; }
    }

    public class EvidentiraoKorsinik
    {
        public int Id { get; set; }
        public string KorisnickoIme { get; set; }
    }
}
