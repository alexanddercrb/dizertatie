using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Entities
{
    public class Product
    {
        public int id { get; set; }
        public string name { get; set; }
        public string code { get; set; }
        public string specs { get; set; }
        public float price { get; set; }
        
        public float filteredPrice { get; set; }
        public Nullable<float> offer { get; set; }
        public int prodtype_id { get; set; }
        public int items { get; set; }
        public string[] pics { get; set; }
        public int[] filters { get; set; }
    }
}
