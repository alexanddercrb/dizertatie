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
    public class Delete
    {
        public static int deleteCategory(int id)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {


                    var categ = (from p in db.categories where p.id == id select p).FirstOrDefault();

                    try
                    {
                        db.categories.Remove(categ);
                        db.SaveChanges();
                        scope.Complete();
                        return 1;
                    }
                    catch (Exception ex)
                    {
                        Log.error("deleteCategory - Delete.cs", DateTime.Now, ex);
                        return -1;
                    }
                    
                }
            }
        }

        public static int deleteSubcategory(int id)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {


                    var subcateg = (from p in db.subcategories where p.id == id select p).FirstOrDefault();

                    try
                    {
                        db.subcategories.Remove(subcateg);
                        db.SaveChanges();
                        scope.Complete();
                        return 1;
                    }
                    catch (Exception ex)
                    {
                        Log.error("deleteSubcategory - Delete.cs", DateTime.Now, ex);
                        return -1;
                    }

                }
            }
        }


        public static int deleteType(int id)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {


                    var type = (from p in db.product_type where p.id == id select p).FirstOrDefault();

                    try
                    {
                        db.product_type.Remove(type);
                        db.SaveChanges();
                        scope.Complete();
                        return 1;
                    }
                    catch (Exception ex)
                    {
                        Log.error("deleteType - Delete.cs", DateTime.Now, ex);
                        return -1;
                    }

                }
            }
        }

        public static int deleteFilter(int id)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {


                    var filter = (from p in db.filters where p.id == id select p).FirstOrDefault();

                    try
                    {
                        db.filters.Remove(filter);
                        db.SaveChanges();
                        scope.Complete();
                        return 1;
                    }
                    catch (Exception ex)
                    {
                        Log.error("deleteFilter - Delete.cs", DateTime.Now, ex);
                        return -1;
                    }

                }
            }
        }

        public static int deleteFilterValue(int id)
        {
            using (DB_entities db = new DB_entities())
            {
                using (TransactionScope scope = new TransactionScope())
                {


                    var filterV = (from p in db.filter_values where p.id == id select p).FirstOrDefault();

                    try
                    {
                        db.filter_values.Remove(filterV);
                        db.SaveChanges();
                        scope.Complete();
                        return 1;
                    }
                    catch (Exception ex)
                    {
                        Log.error("deleteFilterValue - Delete.cs", DateTime.Now, ex);
                        return -1;
                    }

                }
            }
        }
    }
}
