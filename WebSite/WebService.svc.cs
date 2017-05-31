using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using Business;
using Database;
using System.Web.Script.Serialization;
using Business.Queries;

namespace WebSite
{
    [ServiceContract(Namespace = "WebSite")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class WebService
    {
        // To use HTTP GET, add [WebGet] attribute. (Default ResponseFormat is WebMessageFormat.Json)
        // To create an operation that returns XML,
        //     add [WebGet(ResponseFormat=WebMessageFormat.Xml)],
        //     and include the following line in the operation body:
        //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";
        [OperationContract]
        public string DoWork()
        {
            // Add your operation implementation here
            return "working";
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)] //remove for post
        public string ReturnFromDatabase()
        {
            return test.getValue();
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)] //remove for post
        public string returnProduct()
        {
            return convertToJson(test.getProduct());
        }

        #region forms

        #region get
        
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)] //remove for post
        public string getCategories()
        {
            return convertToJson(Get.getCategories());
        }

        [OperationContract]
        public string getSubcategories(int id)
        {
            return convertToJson(Get.getSubcategories(id));
        }

        [OperationContract]
        public string getTypes(int id)
        {
            return convertToJson(Get.getTypes(id));
        }

        [OperationContract]
        public string getFilters(int id)
        {
            return convertToJson(Get.getFilters(id));
        }

        #endregion

        #region insert

        [OperationContract]
        public void addCategories(String names)
        {
            Insert.addCategories(names);
        }

        [OperationContract]
        public void addSubcategories(String id, String names)
        {
            Insert.addSubcategories(Convert.ToInt32(id), names);
        }

        [OperationContract]
        public void addTypes(String id, String names)
        {
            Insert.addTypes(Convert.ToInt32(id), names);
        }

        [OperationContract]
        public void addFilters(String id, String names)
        {
            Insert.addFilters(Convert.ToInt32(id), names);
        }

        [OperationContract]
        public void addFilterValues(String id, String values)
        {
            Insert.addFilterValues(Convert.ToInt32(id), values);
        }

        #endregion

        #endregion

        private string convertToJson(object obj)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string json = js.Serialize(obj);
            return json;
        }
        // Add more operations here and mark them with [OperationContract]



    }
}
