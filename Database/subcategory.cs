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
    
    public partial class subcategory
    {
        public subcategory()
        {
            this.product_type = new HashSet<product_type>();
        }
    
        public int id { get; set; }
        public string name { get; set; }
        public Nullable<int> category_id { get; set; }
    
        public virtual category category { get; set; }
        public virtual ICollection<product_type> product_type { get; set; }
    }
}