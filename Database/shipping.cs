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
    
    public partial class shipping
    {
        public shipping()
        {
            this.orders = new HashSet<order>();
        }
    
        public int id { get; set; }
        public string name { get; set; }
        public Nullable<decimal> cost { get; set; }
    
        public virtual ICollection<order> orders { get; set; }
    }
}