using Database;
using Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Queries
{
    public class Insert
    {
        public static int addCategory(string name)
        {
            using (DB_entities db = new DB_entities())
            {
                category categ = new category();
                categ.name = name;
                try
                {
                    db.categories.Add(categ);
                    db.SaveChanges();
                    return categ.id;
                }
                catch (Exception ex)
                {
                    Log.error("addCategoy - Insert.cs", DateTime.Now, ex);
                    return 0;
                }
            }
        }

        public static int addSubcategory(string name, int categoryId)
        {
            using (DB_entities db = new DB_entities())
            {
                subcategory subcateg = new subcategory();
                subcateg.name = name;
                subcateg.category_id = categoryId;
                try
                {
                    db.subcategories.Add(subcateg);
                    db.SaveChanges();
                    return subcateg.id;
                }
                catch (Exception ex)
                {
                    Log.error("addSubcategory - Insert.cs", DateTime.Now, ex);
                    return 0;
                }
            }
        }

        public static int addType(string name, int subcategoryId)
        {
            using (DB_entities db = new DB_entities())
            {
                product_type prodType = new product_type();
                prodType.name = name;
                prodType.subcategory_id = subcategoryId;
                try
                {
                    db.product_type.Add(prodType);
                    db.SaveChanges();
                    return prodType.id;
                }
                catch (Exception ex)
                {
                    Log.error("addType - Insert.cs", DateTime.Now, ex);
                    return 0;
                }
            }
        }

        public static int addFilter(string name, int typeId)
        {
            using (DB_entities db = new DB_entities())
            {
                filter prodFilter = new filter();
                prodFilter.name = name;
                prodFilter.prodtype_id = typeId;
                try
                {
                    db.filters.Add(prodFilter);
                    db.SaveChanges();
                    return prodFilter.id;
                }
                catch (Exception ex)
                {
                    Log.error("addFilter - Insert.cs", DateTime.Now, ex);
                    return 0;
                }
            }
        }

        public static int addFilterValue(string value, int filterId)
        {
            using (DB_entities db = new DB_entities())
            {
                filter_values filterVal = new filter_values();
                filterVal.value = value;
                filterVal.filter_id = filterId;
                try
                {
                    db.filter_values.Add(filterVal);
                    db.SaveChanges();
                    return filterVal.id;
                }
                catch (Exception ex)
                {
                    Log.error("addFilterValue - Insert.cs", DateTime.Now, ex);
                    return 0;
                }
            }
        }

        public static int addReview(string name, string text, int productId, int stars)
        {
            using (DB_entities db = new DB_entities())
            {
                review prodReview = new review();
                prodReview.name = name;
                prodReview.comment = text;
                prodReview.product_id = productId;
                prodReview.stars = stars;
                try
                {
                    db.reviews.Add(prodReview);
                    db.SaveChanges();
                    return prodReview.id;
                }
                catch (Exception ex)
                {
                    Log.error("addReview - Insert.cs", DateTime.Now, ex);
                    return 0;
                }
            }
        }

        public static int addPicture(string path, int productId)
        {
            using (DB_entities db = new DB_entities())
            {
                pic pics = new pic();
                pics.pic_path = path;
                pics.product_id = productId;
                try
                {
                    db.pics.Add(pics);
                    db.SaveChanges();
                    return pics.id;
                }
                catch (Exception ex)
                {
                    Log.error("addPicture - Insert.cs", DateTime.Now, ex);
                    return 0;
                }
            }
        }

        public static int addProduct(string name, string code, string specs, float price, int typeId, int items, int filterValueId, float? offer)
        {
            using (DB_entities db = new DB_entities())
            {
                product prod = new product();
                prod.name = name;
                prod.code = code;
                prod.specs = specs;
                prod.price = price;
                prod.prodtype_id = typeId;
                prod.items = items;
                prod.filter_value = filterValueId;
                if (offer.HasValue)
                    prod.offer = offer;

                try
                {
                    db.products.Add(prod);
                    db.SaveChanges();
                    return prod.id;
                }
                catch (Exception ex)
                {
                    Log.error("addProduct - Insert.cs", DateTime.Now, ex);
                    return 0;
                }
            }
        }


        public static void test()
        {
            try
            {
                int cat = addCategory("Electronice");
                int subcateg = addSubcategory("Audio", cat);
                int tp = addType("Playere Audio", subcateg);
                int filter = addFilter("iPod", tp);
                int filt_val = addFilterValue("64gb", filter);
                int prod = addProduct("iPod Nano", "iNano64", "iPod produs de Apple, etc.", 250, tp, 50, filt_val, null);
                int rev = addReview("Alex", "un produs excelent", prod, 5);
                int pic = addPicture("testPath", prod);
            }
            catch (Exception ex)
            {
                Log.error("test - Insert.cs", DateTime.Now, ex);
            }
        }
    }
}
