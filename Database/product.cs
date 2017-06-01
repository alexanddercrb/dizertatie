//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class product
    {
        public product()
        {
            this.pics = new HashSet<pic>();
            this.product_filters = new HashSet<product_filters>();
            this.product_list = new HashSet<product_list>();
            this.reviews = new HashSet<review>();
        }
    
        public int id { get; set; }
        public string name { get; set; }
        public string code { get; set; }
        public string specs { get; set; }
        public float price { get; set; }
        public Nullable<float> offer { get; set; }
        public int prodtype_id { get; set; }
        public int items { get; set; }
    
        public virtual ICollection<pic> pics { get; set; }
        public virtual product_type product_type { get; set; }
        public virtual ICollection<product_filters> product_filters { get; set; }
        public virtual ICollection<product_list> product_list { get; set; }
        public virtual ICollection<review> reviews { get; set; }
    }
}
