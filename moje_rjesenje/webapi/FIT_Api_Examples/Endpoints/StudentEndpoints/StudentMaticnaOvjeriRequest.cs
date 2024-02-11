using System;
using static AutoMapper.Internal.ExpressionFactory;

namespace FIT_Api_Examples.Endpoints.StudentEndpoints
{
    public class StudentMaticnaOvjeriRequest
    {
        public int Id { get; set; }
        public DateTime? ZimskiSemsterOvjera { get; set; }
        public string Napomena { get; set; }
    }
}