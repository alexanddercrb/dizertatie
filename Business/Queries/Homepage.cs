using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Common.CommandTrees;
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
                try
                {
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

        public static List<Product> getProductsSub(int subcategoryId) //with filters (for subcategory search)
        {
            List<Product> prods = new List<Product>();
            using (var db = new DB_entities())
            {
                try
                {
                    // Display all Blogs from the database 
                    var query = from a in db.products
                                join b in db.product_type on a.prodtype_id equals b.id
                                join c in db.subcategories on b.subcategory_id equals c.id
                                where c.id == subcategoryId
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
                    Log.error("getProductsSub(subcategoryId) - Homepage.cs", DateTime.Now, ex);
                    return null;
                }
            }
            return prods;
        }

        public static List<Product> getProductOffersSub(int subcategoryId) //with filters (for subcategory search)
        {
            List<Product> prods = new List<Product>();
            using (var db = new DB_entities())
            {
                try
                {
                    // Display all Blogs from the database 
                    var query = from a in db.products
                                join b in db.product_type on a.prodtype_id equals b.id
                                join c in db.subcategories on b.subcategory_id equals c.id
                                where c.id == subcategoryId && a.offer > 0
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
                    Log.error("getProductOffersSub(subcategoryId) - Homepage.cs", DateTime.Now, ex);
                    return null;
                }
            }
            return prods;
        }

        public static List<Product> returnProductsByType(int typeId, String startingPrice, String endingPrice, String sortBy, List<int> filtersSelected) //with filters (for subcategory search)
        {
            List<Product> prods = new List<Product>();
            using (var db = new DB_entities())
            {
                try
                {
                    IQueryable<product> query;
                    Double startPrice = Double.Parse(startingPrice);
                    Double endPrice = Double.Parse(endingPrice);
                    if (sortBy == "priceAsc" || sortBy == "priceDesc")
                    {
                         query = from a in db.products
                            join b in db.product_filters on a.id equals b.product_id
                            where a.prodtype_id == typeId &&
                                  ((a.price >= startPrice || (a.offer >= startPrice && a.offer != 0)) &&
                                   (a.price <= endPrice || (a.offer <= endPrice && a.offer != 0)))
                                  && (filtersSelected.Count == 0 || filtersSelected.Contains(b.value_id))
                            orderby a.price, a.offer descending
                            select a;
                    }
                    else
                    {
                         query = from a in db.products
                                    join b in db.product_filters on a.id equals b.product_id
                                    where a.prodtype_id == typeId &&
                                          ((a.price >= startPrice || (a.offer >= startPrice && a.offer != 0)) &&
                                           (a.price <= endPrice || (a.offer <= endPrice && a.offer != 0)))
                                          && (filtersSelected.Count == 0 || filtersSelected.Contains(b.value_id))
                                    orderby a.id descending
                                    select a;
                    }

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
                        prod.filteredPrice = item.offer.HasValue && item.price > item.offer && item.offer.Value >0 ? item.offer.Value : item.price;

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

                    if (sortBy == "priceAsc" || sortBy == "priceDesc")
                        prods = prods.OrderBy(o => o.filteredPrice).ToList();

                    if (sortBy == "dateDesc" || sortBy == "priceDesc")
                        prods.Reverse();

                }
                catch (Exception ex)
                {
                    Log.error("returnProductsByType - Homepage.cs", DateTime.Now, ex);
                    return null;
                }
            }
            return prods;
        }



        public static List<Product> returnSearchResults(String searchString, String startingPrice, String endingPrice, String sortBy)
        {
            List<Product> prods = new List<Product>();
            using (var db = new DB_entities())
            {
                try
                {
                    IQueryable<product> query;
                    Double startPrice = Double.Parse(startingPrice);
                    Double endPrice = Double.Parse(endingPrice);
                    searchString = searchString.Replace("%20", " ");
                    if (sortBy == "priceAsc" || sortBy == "priceDesc")
                    {
                        query = from a in db.products
                                join b in db.product_type on a.prodtype_id equals b.id
                                where
                                     (a.name.Contains(searchString) || a.specs.Contains(searchString) || b.name.Contains(searchString)) &&
                                      ((a.price >= startPrice || (a.offer >= startPrice && a.offer != 0)) &&
                                       (a.price <= endPrice || (a.offer <= endPrice && a.offer != 0)))
                                orderby a.price, a.offer descending
                                select a;
                    }
                    else
                    {
                        query = from a in db.products
                                join b in db.product_type on a.prodtype_id equals b.id
                                where
                                        (a.name.Contains(searchString) || a.specs.Contains(searchString) || b.name.Contains(searchString)) &&
                                      ((a.price >= startPrice || (a.offer >= startPrice && a.offer != 0)) &&
                                       (a.price <= endPrice || (a.offer <= endPrice && a.offer != 0)))
                                orderby a.id descending
                                select a;
                    }


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
                        prod.filteredPrice = item.offer.HasValue && item.price > item.offer && item.offer.Value > 0 ? item.offer.Value : item.price;

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

                    if (sortBy == "priceAsc" || sortBy == "priceDesc")
                        prods = prods.OrderBy(o => o.filteredPrice).ToList();

                    if (sortBy == "dateDesc" || sortBy == "priceDesc")
                        prods.Reverse();

                }
                catch (Exception ex)
                {
                    Log.error("returnSearchResults - Homepage.cs", DateTime.Now, ex);
                    return null;
                }
            }
            return prods;
        }
        
    }
}
