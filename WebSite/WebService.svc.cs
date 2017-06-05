using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web;
using System.Web.Configuration;
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
        public void DeleteThumbnail(String oldImg)
        {
            string dirFullPath = System.Web.Hosting.HostingEnvironment.MapPath(WebConfigurationManager.AppSettings["ProdImgPath"]);
            string[] path = oldImg.Split('/');
            if (File.Exists(dirFullPath + path[path.Length - 1]))
            {
                File.Delete(dirFullPath + path[path.Length - 1]);
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)] //remove for post
        public string ReturnFromDatabase()
        {
            return Homepage.getValue();
        }

        #region HomePage

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)] //remove for post
        public string returnProducts()
        {
            return convertToJson(Homepage.getProducts());
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)] //remove for post
        public string returnProductOffers()
        {
            return convertToJson(Homepage.getProductOffers());
        }

        [OperationContract]
        public string returnProductsSub(int subcategoryId)
        {
            return convertToJson(Homepage.getProductsSub(subcategoryId));
        }

        [OperationContract]
        public string returnProductOffersSub(int subcategoryId)
        {
            return convertToJson(Homepage.getProductOffersSub(subcategoryId));
        }

        [OperationContract]
        public string returnProductsByType(int id)
        {
            return convertToJson(Homepage.returnProductsByType(id));
        }
        

        #endregion

        #region forms

        #region get

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)] //remove for post
        public string getCategories()
        {
            return convertToJson(Get.getCategories());
        }

        [OperationContract]
        public string getCategoryByID(int id)
        {
            return convertToJson(Get.getCategoryByID(id));
        }


        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)] //remove for post
        public string getAllSubcategories()
        {
            return convertToJson(Get.getAllSubcategories());
        }

        [OperationContract]
        public string getSubcategories(int id)
        {
            return convertToJson(Get.getSubcategories(id));
        }

        [OperationContract]
        public string getSubcategoryByID(int id)
        {
            return convertToJson(Get.getSubcategoryByID(id));
        }
        

        [OperationContract]
        public string getTypes(int id)
        {
            return convertToJson(Get.getTypes(id));
        }

        [OperationContract]
        public string getTypeById(int id)
        {
            return convertToJson(Get.getTypeById(id));
        }

        [OperationContract]
        public string getFilters(int id)
        {
            return convertToJson(Get.getFilters(id));
        }

        [OperationContract]
        public string getFilterValues(int id)
        {
            return convertToJson(Get.getFilterValues(id));
        }

        [OperationContract]
        public string getFilterValuesByType(int id)
        {
            return convertToJson(Get.getFilterValuesByType(id));
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

        [OperationContract]
        public void addProduct(int type, int[] filters, String name, String code, String specs,
                                    int price, int offer, int items, String[] uploadedImages)
        {
            Insert.addProduct(type, filters, name, code, specs, price, offer, items, uploadedImages);
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
