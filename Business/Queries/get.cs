using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Database;
using Logging;

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


    }
}
