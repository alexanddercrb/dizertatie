using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Database;

namespace Business
{
    public class test
    {
        public static string getValue()
        {
            using (var db = new DB_entities())
            {
                            // Display all Blogs from the database 
                var query = from b in db.categories
                        select b;

                string result = "response: ";
                foreach (var item in query) 
                { 
                    result += item.name + " "; 
                } 
                return result;;
            }
        }
    }
}
