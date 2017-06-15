using Database;
using Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace Business.Queries
{
    public class Insert
    {
        public static void addCategories(String names)
        {
            String[] nameList = names.Split(';');
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    foreach (String name in nameList)
                    {
                        if (name == "") break;
                        category categ = new category();
                        categ.name = name;
                        try
                        {
                            db.categories.Add(categ);
                            db.SaveChanges();
                        }
                        catch (Exception ex)
                        {
                            Log.error("addCategories - Insert.cs", DateTime.Now, ex);
                        }
                    }
                    scope.Complete();
                }
            }
        }

        public static void addSubcategories(int categoryId, String names)
        {
            String[] nameList = names.Split(';');
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    foreach (String name in nameList)
                    {
                        if (name == "") break;
                        subcategory subcateg = new subcategory();
                        subcateg.name = name;
                        subcateg.category_id = categoryId;
                        try
                        {
                            db.subcategories.Add(subcateg);
                            db.SaveChanges();
                        }
                        catch (Exception ex)
                        {
                            Log.error("addSubcategories - Insert.cs", DateTime.Now, ex);
                        }
                    }
                    scope.Complete();
                }
            }
        }

        public static void addTypes(int subcategoryId, String names)
        {
            String[] nameList = names.Split(';');
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    foreach (String name in nameList)
                    {
                        if (name == "") break;
                        product_type prodType = new product_type();
                        prodType.name = name;
                        prodType.subcategory_id = subcategoryId;
                        try
                        {
                            db.product_type.Add(prodType);
                            db.SaveChanges();
                        }
                        catch (Exception ex)
                        {
                            Log.error("addTypes - Insert.cs", DateTime.Now, ex);
                        }
                    }
                    scope.Complete();
                }
            }
        }

        public static void addFilters(int typeId, String names)
        {
            String[] nameList = names.Split(';');
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    foreach (String name in nameList)
                    {
                        if (name == "") break;
                        filter prodFilter = new filter();
                        prodFilter.name = name;
                        prodFilter.prodtype_id = typeId;
                        try
                        {
                            db.filters.Add(prodFilter);
                            db.SaveChanges();
                        }
                        catch (Exception ex)
                        {
                            Log.error("addFilters - Insert.cs", DateTime.Now, ex);
                        }
                    }
                    scope.Complete();
                }
            }
        }

        public static void addFilterValues(int filterId, String values)
        {
            String[] valueList = values.Split(';');
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    foreach (String value in valueList)
                    {
                        if (value == "") break;
                        filter_values filterVal = new filter_values();
                        filterVal.value = value;
                        filterVal.filter_id = filterId;
                        try
                        {
                            db.filter_values.Add(filterVal);
                            db.SaveChanges();
                        }
                        catch (Exception ex)
                        {
                            Log.error("addFilterValues - Insert.cs", DateTime.Now, ex);
                        }
                    }
                    scope.Complete();
                }
            }
        }

        public static int addReview(String name, String text, int productId, int stars)
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

        public static int addPictures(String path, int productId)
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
                    Log.error("addPictures - Insert.cs", DateTime.Now, ex);
                    return 0;
                }
            }
        }

        public static int addProductData(String name, String code, String specs, float price, int typeId, int items, int filterValueId, float? offer)
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
                    Log.error("addProductData - Insert.cs", DateTime.Now, ex);
                    return 0;
                }
            }
        }

        public static void addProduct(int type, int[] filters, String name,
            String code, String specs, int price, int offer, int items, String[] uploadedImages)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {



                    product prod = new product();
                    prod.name = name;
                    prod.code = code;
                    prod.specs = specs;
                    prod.price = price;
                    prod.offer = offer;
                    prod.items = items;
                    prod.prodtype_id = type;

                    try
                    {
                        db.products.Add(prod);
                        db.SaveChanges();

                        int productId = prod.id;

                        pic pics = new pic();
                        for (int i = 0; i < uploadedImages.Length; i++)
                        {
                            pics.pic_path = uploadedImages[i];
                            pics.product_id = productId;
                            db.pics.Add(pics);
                            db.SaveChanges();
                        }

                        product_filters filterList = new product_filters();
                        for (int i = 0; i < filters.Length; i++)
                        {
                            filterList.value_id = filters[i];
                            filterList.product_id = productId;
                            db.product_filters.Add(filterList);
                            db.SaveChanges();
                        }

                        db.SaveChanges();

                    }
                    catch (Exception ex)
                    {
                        Log.error("addProduct - Insert.cs", DateTime.Now, ex);
                    }
                    scope.Complete();
                }
            }
        }

        public static void insertReview(int productId, String name, String review, int stars)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {



                    review rev = new review();
                    rev.name = name;
                    rev.product_id = productId;
                    rev.stars = stars;
                    rev.comment = review;

                    try
                    {
                        db.reviews.Add(rev);
                        db.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        Log.error("insertReview - Insert.cs", DateTime.Now, ex);
                    }
                    scope.Complete();
                }
            }
        }


    }
}
