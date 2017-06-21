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
        

    }
}
