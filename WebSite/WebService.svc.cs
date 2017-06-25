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
        public string returnProductsByType(int id, String startingPrice, String endingPrice, String sortBy, List<int> filtersSelected)
        {
            return convertToJson(Homepage.returnProductsByType(id, startingPrice, endingPrice, sortBy, filtersSelected));
        }

        [OperationContract]
        public string returnProductById(int id)
        {
            return convertToJson(Homepage.returnProductById(id));
        }

        [OperationContract]
        public string returnSearchResults(String searchString, String startingPrice, String endingPrice, String sortBy)
        {
            return convertToJson(Homepage.returnSearchResults(searchString, startingPrice, endingPrice, sortBy));
        }

        [OperationContract]
        public string getFavProducts(int id)
        {
            return convertToJson(Get.getFavProducts(id));
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

        [OperationContract]
        public string getReviews(int productId)
        {
            return convertToJson(Get.getReviews(productId));
        }

        [OperationContract]
        public string getCustomer(int id)
        {
            return convertToJson(Get.getCustomer(id));
        }

        [OperationContract]
        public int checkEmail(String email)
        {
            return Get.checkEmail(email);
        }

        [OperationContract]
        public string login(String email, String password)
        {
            return convertToJson(Get.login(email, password));
        }

        [OperationContract]
        public int checkFavorite(int productId, int userId)
        {
            return Get.checkFavorite(productId, userId);
        }

        [OperationContract]
        public string returnCart(String[][] productList)
        {
            return convertToJson(Get.returnCart(productList));
        }

        
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)] //remove for post
        public string getShippings()
        {
            return convertToJson(Get.getShippings());
        }

        [OperationContract]
        public string getProductDetailsByType(int id)
        {
            return convertToJson(Get.getProductDetailsByType(id));
        }

        [OperationContract]
        public string getFilterValuesByProduct(int id)
        {
            return convertToJson(Get.getFilterValuesByProduct(id));
        }

        [OperationContract]
        public string getOrdersByUser(int id)
        {
            return convertToJson(Get.getOrdersByUser(id));
        }

        [OperationContract]
        public string getOrderInfo(int id)
        {
            return convertToJson(Get.getOrderInfo(id));
        }

        [OperationContract]
        public string getOrderProds(int id)
        {
            return convertToJson(Get.getOrderProds(id));
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)] //remove for post
        public string getAllOrders()
        {
            return convertToJson(Get.getAllOrders());
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)] //remove for post
        public string getPendingOrders()
        {
            return convertToJson(Get.getPendingOrders());
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
                                    float price, float offer, int items, String[] uploadedImages)
        {
            Insert.addProduct(type, filters, name, code, specs, price, offer, items, uploadedImages);
        }

        [OperationContract]
        public void insertReview(int productId, String name, String review, int stars)
        {
            Insert.insertReview(productId, name, review, stars);
        }

        [OperationContract]
        public void addUser(String first_name, String last_name, String email, String password)
        {
            Insert.addUser(first_name, last_name, email, password);
        }

        [OperationContract]
        public void addToFavorite(int productId, int userId)
        {
            Insert.addToFavorite(productId, userId);
        }

        [OperationContract]
        public void placeOrder(int[] productList, int[] noOfItems, String userId, int total, String first_name, String last_name, String address, String phone, String email, int shipping)
        {
            Insert.placeOrder(productList, noOfItems, userId, total, first_name, last_name, address, phone, email, shipping);
        }

        #endregion

        #endregion

        #region Update

        [OperationContract]
        public void updateUser(int id, String first_name, String last_name, String address, String phone, String email)
        {
            Update.updateUser(id, first_name, last_name, address, phone, email);
        }

        [OperationContract]
        public void updateCategory(int id, String name)
        {
            Update.updateCategory(id, name);
        }

        [OperationContract]
        public void updateSubcategory(int id, String name)
        {
            Update.updateSubcategory(id, name);
        }

        [OperationContract]
        public void updateType(int id, String name)
        {
            Update.updateType(id, name);
        }

        [OperationContract]
        public void updateFilter(int id, String name)
        {
            Update.updateFilter(id, name);
        }

        [OperationContract]
        public void updateFilterValue(int id, String value)
        {
            Update.updateFilterValue(id, value);
        }

        [OperationContract]
        public void updateProduct(int id, int type, int[] filters, String name, String code, String specs,
                            float price, float offer, int items, String[] uploadedImages)
        {
            Update.updateProduct(id, type, filters, name, code, specs, price, offer, items, uploadedImages);
        }


        [OperationContract]
        public void updateOrderStatus(int id)
        {
            Update.updateOrderStatus(id);
        }

        #endregion


        #region Delete
        [OperationContract]
        public int deleteCategory(int id)
        {
            return Delete.deleteCategory(id);
        }

        [OperationContract]
        public int deleteSubcategory(int id)
        {
            return Delete.deleteSubcategory(id);
        }

        [OperationContract]
        public int deleteType(int id)
        {
            return Delete.deleteType(id);
        }

        [OperationContract]
        public int deleteFilter(int id)
        {
            return Delete.deleteFilter(id);
        }

        [OperationContract]
        public int deleteFilterValue(int id)
        {
            return Delete.deleteFilterValue(id);
        }

        [OperationContract]
        public void deleteFromFav(int id, int userId)
        {
            Delete.deleteFromFav(id, userId);
        }
        

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
