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
    
    public partial class user
    {
        public user()
        {
            this.customer_orders = new HashSet<customer_orders>();
        }
    
        public int id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public int privileges { get; set; }
        public string location { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
    
        public virtual ICollection<customer_orders> customer_orders { get; set; }
        public virtual privilege privilege { get; set; }
    }
}
