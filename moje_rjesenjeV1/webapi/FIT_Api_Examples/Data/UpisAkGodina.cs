using FIT_Api_Examples.Endpoints.StudentEndpoints;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FIT_Api_Examples.Data
{
    public class UpisAkGodina
    {
        public int ID { get; set; }
        public int GodinaStudija { get; set; }
        public bool Obnova { get; set; }
        public DateTime ZimskiSemsterUpis { get; set; }
        public DateTime? ZimskiSemsterOvjera { get; set; }
        public float CijenaSkolarine { get; set; }
        public string? Napomena { get; set; }

        [ForeignKey (nameof (Student))]
        public int StudentID { get; set; }
        public Student Student { get; set; }

        [ForeignKey(nameof(AkademskaGodina))]
        public int AkademskaGodinaID { get; set; }
        public AkademskaGodina AkademskaGodina { get; set; }

        [ForeignKey(nameof(KorisnickiNalog))]
        public int KorisnickiNalogID { get; set; }
        public KorisnickiNalog KorisnickiNalog { get; set; }

    }
}
