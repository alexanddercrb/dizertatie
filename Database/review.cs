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
    
    public partial class review
    {
        public int id { get; set; }
        public string name { get; set; }
        public string comment { get; set; }
        public Nullable<int> product_id { get; set; }
        public int stars { get; set; }
    
        public virtual product product { get; set; }
    }
}
