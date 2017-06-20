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
            String code, String specs, float price, float offer, int items, String[] uploadedImages)
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

        public static void addUser(String first_name, String last_name, String email, String password)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    user usr = new user();
                    usr.first_name = first_name;
                    usr.last_name = last_name;
                    usr.password = password;
                    usr.email = email;
                    usr.privileges = 2;
                    usr.location = "";
                    usr.phone = "";

                    try
                    {
                        db.users.Add(usr);
                        db.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        Log.error("addUser - Insert.cs", DateTime.Now, ex);
                    }
                    scope.Complete();
                }
            }
        }


        public static void addToFavorite(int productId, int userId)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    userFavorite fav = new userFavorite();
                    fav.user_id = userId;
                    fav.product_id = productId;

                    try
                    {
                        db.userFavorites.Add(fav);
                        db.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        Log.error("addToFavorite - Insert.cs", DateTime.Now, ex);
                    }
                    scope.Complete();
                }
            }
        }

        public static void placeOrder(int[] productList, int[] noOfItems, String userId, int total, String first_name, String last_name, String address, String phone, String email, int shipping)
        {
            using (DB_entities db = new DB_entities())
            {
                if (String.IsNullOrEmpty(userId))
                {
                    using (TransactionScope scope = new TransactionScope())
                    {
                        //add order to DB
                        order ord = new order();
                        ord.first_name = first_name;
                        ord.last_name = last_name;
                        ord.location = address;
                        ord.phone = phone;
                        ord.email = email;
                        ord.total = total;
                        ord.status_id = 1; //order received
                        ord.dt = DateTime.UtcNow;
                        ord.shipping_id = shipping;



                        try
                        {
                            db.orders.Add(ord);
                            db.SaveChanges();

                            int orderId = ord.id;

                            //add to product_list
                            try
                            {
                                for (int i = 0; i < productList.Length; i++)
                                {
                                    product_list prdList = new product_list();
                                    prdList.order_id = orderId;
                                    prdList.product_id = productList[i];
                                    prdList.no_items = noOfItems[i];
                                    int thisProdId = productList[i];

                                    var theProd = (from e in db.products where e.id == thisProdId orderby e.id ascending select e).FirstOrDefault();

                                    theProd.items = theProd.items - noOfItems[i]; //update the stock

                                    if (theProd.offer > 0)
                                    {
                                        prdList.price = noOfItems[i] * theProd.offer;
                                    }
                                    else
                                    {
                                        prdList.price = noOfItems[i] * theProd.price;
                                    }


                                    db.product_list.Add(prdList);
                                    db.SaveChanges();

                                }
                            }
                            catch (Exception ex)
                            {
                                Log.error("placeOrder (insert product_list - no user) - Insert.cs", DateTime.Now, ex);
                            }

                        }
                        catch (Exception ex)
                        {
                            Log.error("placeOrder (insert order) - no user - Insert.cs", DateTime.Now, ex);
                        }
                        scope.Complete();

                    }
                }
                else
                {
                    //convert user id to int;
                    //insert in orders
                    //decrease stocks
                    //return order id
                    //insert products into prod_list (get product price for sum)
                    //insert into customer_orders
                    int user = Convert.ToInt32(userId);

                    using (TransactionScope scope = new TransactionScope())
                    {
                        //add order to DB
                        order ord = new order();
                        ord.first_name = first_name;
                        ord.last_name = last_name;
                        ord.location = address;
                        ord.phone = phone;
                        ord.email = email;
                        ord.total = total;
                        ord.status_id = 1; //order received
                        ord.dt = DateTime.UtcNow;
                        ord.shipping_id = shipping;
                        
                        try
                        {
                            db.orders.Add(ord);
                            db.SaveChanges();

                            int orderId = ord.id;

                            //add to product_list
                            try
                            {
                                for (int i = 0; i < productList.Length; i++)
                                {
                                    product_list prdList = new product_list();
                                    prdList.order_id = orderId;
                                    prdList.product_id = productList[i];
                                    prdList.no_items = noOfItems[i];
                                    int thisProdId = productList[i];

                                    var theProd = (from e in db.products where e.id == thisProdId orderby e.id ascending select e).FirstOrDefault();

                                    theProd.items = theProd.items - noOfItems[i]; //update the stock

                                    if (theProd.offer > 0)
                                    {
                                        prdList.price = noOfItems[i] * theProd.offer;
                                    }
                                    else
                                    {
                                        prdList.price = noOfItems[i] * theProd.price;
                                    }



                                    db.product_list.Add(prdList);
                                    db.SaveChanges();

                                }

                                //add to customer orders
                                customer_orders custOrd = new customer_orders();
                                custOrd.customer_id = user;
                                custOrd.order_id = orderId;

                                db.customer_orders.Add(custOrd);
                                db.SaveChanges();

                            }
                            catch (Exception ex)
                            {
                                Log.error("placeOrder (insert product_list) - Insert.cs", DateTime.Now, ex);
                            }

                        }
                        catch (Exception ex)
                        {
                            Log.error("placeOrder (insert order) - Insert.cs", DateTime.Now, ex);
                        }
                        scope.Complete();

                    }
                }

            }
        }



    }
}
