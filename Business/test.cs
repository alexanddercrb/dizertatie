using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Database;
using Business.Queries;

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

        public static List<product> getProduct()
        {
            List<product> prods = new List<product>();
            using (var db = new DB_entities())
            {
                // Display all Blogs from the database 
                var query = from b in db.products
                            select b;

                foreach (var item in query)
                {
                    product prod = new product();
                    prod.name = item.name;
                    prod.code = item.code;
                    prod.price = item.price;
                    prod.offer = item.offer;
                    prod.specs = item.specs;
                    prod.items = item.items;
                    prod.pics = item.pics;

                    prods.Add(prod);
                    prods.Add(prod);
                }
            }
            return prods;
        }
    }
}
