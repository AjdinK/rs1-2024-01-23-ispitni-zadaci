using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FIT_Api_Examples.Data
{
    public class UpisAkGodina
    {
        [Key]
        public int Id { get; set; }
        public string? Napomena { get; set; }
        public bool Obnova { get; set; }
        public float CijenaSkolarine { get; set; }
        public int GodinaStudija { get; set; }
        public DateTime ZimskiSemesterUpis { get; set; }
        public DateTime? ZimskiSemesterOvjera { get; set; }

        [ForeignKey(nameof(Student))]
        public int StudentId { get; set; }
        public Student Student { get; set; }


        [ForeignKey(nameof(AkademskaGodina))]
        public int AkademskaGodinaId { get; set; }
        public AkademskaGodina AkademskaGodina { get; set; }


        [ForeignKey(nameof(KorisnickiNalog))]
        public int KorisnickiNalogId { get; set; }
        public KorisnickiNalog KorisnickiNalog { get; set; }

    }
}