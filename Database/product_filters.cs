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
    
    public partial class product_filters
    {
        public int id { get; set; }
        public int value_id { get; set; }
        public int product_id { get; set; }
    
        public virtual filter_values filter_values { get; set; }
        public virtual product product { get; set; }
    }
}
