using System;

namespace FIT_Api_Examples.Endpoints.StudentEndpoints
{
    public class StudentMaticnaDodajRequest
    {
        public int Id { get; set; }
        public int AkademskaGodinaID { get; set; }
        public int GodinaStudija { get; set; }
        public bool obnova { get; set; }
        public DateTime ZimskiSemsterUpis { get; set; }
        public int EvidentiraoKorsinikID { get; set; }
        public int CijenaSkolarine { get; set; }
    }
}
