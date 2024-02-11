using System;
using System.Collections.Generic;

namespace FIT_Api_Examples.Endpoints.StudentEndpoints
{
    public class StudentMaticnaGetResponse
    {
        public int StudentID { get; set; }
        public string StudentIme{ get; set;}
        public string StudentPrezime{ get; set;}
        public List<UpisaneGodine> UpisaneGodine { get; set; }
    }
    public class UpisaneGodine {
        public int ID { get; set; }
        public string AkademskaGodina { get; set; }
        public int GodinaStudija { get; set; }
        public bool Obnova { get; set; }
        public DateTime ZimskiSemsterUpis { get; set; }
        public DateTime? ZimskiSemsterOvjera { get; set; }
        public EvidentiraoKorsinik EvidentiraoKorsinik { get; set; }
    }
    public class EvidentiraoKorsinik { 
        public int ID { get; set; }
        public string KorsinickoIme { get; set; }
    }
}
