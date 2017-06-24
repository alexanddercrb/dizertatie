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
    public class Update
    {
        public static void updateUser(int id, String first_name, String last_name, String address, String phone, String email)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    var user = (from e in db.users where e.id == id orderby e.id ascending select e).FirstOrDefault();
                    user.first_name = first_name;
                    user.last_name = last_name;
                    user.location = address;
                    user.phone = phone;
                    user.email = email;


                    try
                    {
                        db.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        Log.error("updateUser - Update.cs", DateTime.Now, ex);
                    }
                    scope.Complete();
                }
            }
        }

        public static void updateCategory(int id, String name)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    var categ = (from e in db.categories where e.id == id select e).FirstOrDefault();

                    categ.name = name;

                    try
                    {
                        db.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        Log.error("updateCategory - Update.cs", DateTime.Now, ex);
                    }
                    scope.Complete();
                }
            }
        }

        public static void updateSubcategory(int id, String name)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    var subcateg = (from e in db.subcategories where e.id == id select e).FirstOrDefault();

                    subcateg.name = name;

                    try
                    {
                        db.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        Log.error("updateSubategory - Update.cs", DateTime.Now, ex);
                    }
                    scope.Complete();
                }
            }
        }

        public static void updateType(int id, String name)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    var type = (from e in db.product_type where e.id == id select e).FirstOrDefault();

                    type.name = name;

                    try
                    {
                        db.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        Log.error("updateType - Update.cs", DateTime.Now, ex);
                    }
                    scope.Complete();
                }
            }
        }

        public static void updateFilter(int id, String name)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    var filt = (from e in db.filters where e.id == id select e).FirstOrDefault();

                    filt.name = name;

                    try
                    {
                        db.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        Log.error("updateFilter - Update.cs", DateTime.Now, ex);
                    }
                    scope.Complete();
                }
            }
        }

        public static void updateFilterValue(int id, String value)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    var filt = (from e in db.filter_values where e.id == id select e).FirstOrDefault();

                    filt.value = value;

                    try
                    {
                        db.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        Log.error("updateFilterValue - Update.cs", DateTime.Now, ex);
                    }
                    scope.Complete();
                }
            }
        }


    }
}
