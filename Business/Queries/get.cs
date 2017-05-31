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
    }
}
