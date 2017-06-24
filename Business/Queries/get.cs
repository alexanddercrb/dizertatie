using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Database;
using Logging;
using Business.Entities;

namespace Business.Queries
{
    public class Get
    {
        public static List<category> getCategories()
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    return db.categories.ToList();
                }
                catch (Exception ex)
                {
                    Log.error("getCategories - get.cs", DateTime.Now, ex);
                    return null;
                }
            }
        }

        public static List<category> getCategoryByID(int id)
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.categories where e.id == id orderby e.id ascending select e;
                    return result.ToList();
                }
                catch (Exception ex)
                {
                    Log.error("getCategoryByID - get.cs", DateTime.Now, ex);
                    return null;
                }
            }
        }

        public static List<subcategory> getAllSubcategories()
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.subcategories orderby e.category_id ascending select e;
                    return result.ToList();
                }
                catch (Exception ex)
                {
                    Log.error("getAllSubcategories - get.cs", DateTime.Now, ex);
                    return null;
                }
            }
        }

        public static List<subcategory> getSubcategories(int categoryId)
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.subcategories where e.category_id == categoryId select e;
                    return result.ToList();
                }
                catch (Exception ex)
                {
                    Log.error("getSubcategories - get.cs", DateTime.Now, ex);
                    return null;
                }
            }
        }

        public static List<subcategory> getSubcategoryByID(int id)
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.subcategories where e.id == id select e;
                    return result.ToList();
                }
                catch (Exception ex)
                {
                    Log.error("getSubcategoryByID - get.cs", DateTime.Now, ex);
                    return null;
                }
            }
        }

        public static List<product_type> getTypes(int subcategoryId)
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.product_type where e.subcategory_id == subcategoryId select e;
                    return result.ToList();
                }
                catch (Exception ex)
                {
                    Log.error("getTypes - get.cs", DateTime.Now, ex);
                    return null;
                }
            }
        }

        public static List<product_type> getTypeById(int id)
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.product_type where e.id == id select e;
                    return result.ToList();
                }
                catch (Exception ex)
                {
                    Log.error("getTypeById - get.cs", DateTime.Now, ex);
                    return null;
                }
            }
        }

        public static List<filter> getFilters(int typeId)
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.filters where e.prodtype_id == typeId select e;
                    return result.ToList();
                }
                catch (Exception ex)
                {
                    Log.error("getFilters - get.cs", DateTime.Now, ex);
                    return null;
                }
            }
        }
        public static List<filter_values> getFilterValues(int filterId)
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.filter_values where e.filter_id == filterId select e;
                    return result.ToList();
                }
                catch (Exception ex)
                {
                    Log.error("getFilterValues - get.cs", DateTime.Now, ex);
                    return null;
                }
            }
        }

        public static List<filter_values> getFilterValuesByType(int typeId)
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.filter_values
                                 join f in db.filters on e.filter_id equals f.id
                                 join g in db.product_type on f.prodtype_id equals g.id
                                 where g.id == typeId
                                 select e;
                    return result.ToList();
                }
                catch (Exception ex)
                {
                    Log.error("getFilterValuesByType - get.cs", DateTime.Now, ex);
                    return null;
                }
            }
        }

        public static List<review> getReviews(int productId)
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.reviews
                                 where e.product_id == productId
                                 orderby e.id descending
                                 select e;
                    return result.ToList();
                }
                catch (Exception ex)
                {
                    Log.error("getReviews - get.cs", DateTime.Now, ex);
                    return null;
                }
            }
        }

        public static int checkEmail(String email)
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.users
                                 where e.email == email
                                 orderby e.id descending
                                 select e;
                    bool exists = result.Count() > 0;
                    if (exists)
                        return 1;
                    else
                        return 0;
                }
                catch (Exception ex)
                {
                    Log.error("checkEmail - get.cs", DateTime.Now, ex);

                    return -1;
                }
            }
        }

        public static user login(String email, String password)
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.users
                                 where e.email == email && e.password == password
                                 orderby e.id descending
                                 select e;
                    return result.FirstOrDefault();
                }
                catch (Exception ex)
                {
                    Log.error("login - get.cs", DateTime.Now, ex);
                    return null;
                }
            }
        }

        public static int checkFavorite(int productId, int userId)
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.userFavorites
                                 where e.user_id == userId && e.product_id == productId
                                 orderby e.id descending
                                 select e;
                    bool exists = result.Count() > 0;
                    if (exists)
                        return 1;
                    else
                        return 0;
                }
                catch (Exception ex)
                {
                    Log.error("checkFavorite - get.cs", DateTime.Now, ex);

                    return -1;
                }
            }
        }

        public static List<Product> returnCart(String[][] productList)
        {
            List<Product> prods = new List<Product>();
            using (var db = new DB_entities())
            {
                int[] prodIds = new int[productList.Length];
                for (int i = 0; i < productList.Length; i++)
                    prodIds[i] = Convert.ToInt32(productList[i][0]);


                try
                {
                    var query = from a in db.products
                                where prodIds.Contains(a.id)
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
                    Log.error("returnCart - Homepage.cs", DateTime.Now, ex);
                    return null;
                }
            }
            return prods;
        }


        public static List<shipping> getShippings()
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.shippings orderby e.id ascending select e;
                    return result.ToList();
                }
                catch (Exception ex)
                {
                    Log.error("getShippings - get.cs", DateTime.Now, ex);
                    return null;
                }
            }
        }

        public static user getCustomer(int id)
        {
            using (DB_entities db = new DB_entities())
            {
                try
                {
                    var result = from e in db.users orderby e.id ascending select e;
                    return result.FirstOrDefault();
                }
                catch (Exception ex)
                {
                    Log.error("getCustomer - get.cs", DateTime.Now, ex);
                    return null;
                }
            }
        }

    }
}
