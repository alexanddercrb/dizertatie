using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
using System.Threading.Tasks;
using Business.Entities;
using Database;
using Business.Queries;
using Logging;

namespace Business.Queries
{
    public class Homepage
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
                return result;
            }
        }

        public static List<Product> getProducts() //without filters (for homepage only)
        {
            List<Product> prods = new List<Product>();
            using (var db = new DB_entities())
            {
                try { 
                // Display all Blogs from the database 
                    var query = from a in db.products
                                orderby a.id descending
                                select a;

                    foreach (var item in query)
                    {
                        Product prod = new Product();
                        prod.id = item.id;
                        prod.name = item.name;
                        prod.code = item.code;
                        prod.price = item.price;
                        prod.offer = item.offer;
                        prod.specs = item.specs;
                        prod.items = item.items;

                        List<pic> pictures= db.pics.Where(x => x.product_id == prod.id).ToList();
                        int i = 0;
                        prod.pics = new string[15];
                        foreach (var picture in pictures)
                        {
                            prod.pics[i] = picture.pic_path;
                            i++;
                        }

                        prods.Add(prod);
                    }
                }
                catch (Exception ex)
                {
                    Log.error("getProducts - Homepage.cs", DateTime.Now, ex);
                    return null;
                }
            }
            return prods;
        }

        public static List<Product> getProductOffers() //without filters (for homepage only)
        {
            List<Product> prods = new List<Product>();
            using (var db = new DB_entities())
            {
                try
                {
                    // Display all Blogs from the database 
                    var query = from a in db.products
                                where a.offer > 0
                                orderby a.id descending 
                                select a;

                    foreach (var item in query)
                    {
                        Product prod = new Product();
                        prod.id = item.id;
                        prod.name = item.name;
                        prod.code = item.code;
                        prod.price = item.price;
                        prod.offer = item.offer;
                        prod.specs = item.specs;
                        prod.items = item.items;

                        List<pic> pictures = db.pics.Where(x => x.product_id == prod.id).ToList();
                        int i = 0;
                        prod.pics = new string[15];
                        foreach (var picture in pictures)
                        {
                            prod.pics[i] = picture.pic_path;
                            i++;
                        }

                        prods.Add(prod);
                    }
                }
                catch (Exception ex)
                {
                    Log.error("getProductOffers - Homepage.cs", DateTime.Now, ex);
                    return null;
                }
            }
            return prods;
        }
    }
}
