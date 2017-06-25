var orderList;
var itemsOnPage = 10;
var start = 0;

$(document).ready(function () {

    initPage();

    $('#btnNext').on('click', function () {
        start += itemsOnPage;
        renderOrderList(orderList, itemsOnPage, start);
        if (orderList.length <= itemsOnPage + start)
        {
            $('#btnNext').addClass("hidden");
        }
        $('#btnPrevious').removeClass('hidden');
    });

    $('#btnPrevious').on('click', function () {
        start -= itemsOnPage;
        renderOrderList(orderList, itemsOnPage, start);
        if (start == 0) {
            $('#btnPrevious').addClass("hidden");
        }
        if (orderList.length > itemsOnPage + start) {
            $('#btnNext').removeClass('hidden');
        }
    });

});


function initPage() {

    if (readCookie('userType') != "1") {
        window.location.replace("../index.html");
        return;
    }

    //ajax to get order list from db
    //on success render order list
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/getAllOrders",
        data: "",
        processData: true,
        dataType: "json",
        success: function (response) {
            var list = JSON.parse(response.d);
            $('#orderList').html("");
            if (list.length == 0) {
                $('#orderList').append("No orders");
                return;
            }
            orderList = list;
            renderOrderList(orderList, itemsOnPage, 0);

            if (orderList.length > itemsOnPage + start)
            {
                $('#btnNext').removeClass('hidden');
            }    
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); bootbox.alert("Error!");
        }
    })
}


function renderOrderList(orders, items, start) {

    var limit = 0;
    if (orders.length <= items + start)
        limit = orders.length;
    else
        limit = start + items;
    $('#orderList').html("");
   for (var i = start; i < limit; i++) {

        var template = $('#itemList').html();
        var item = $(template).clone();

        //edit template
        $(item).find('#ProductTitle').html('Order no. ' + orders[i].id);
        $(item).find('#ProductTitle').attr('href', 'javascript:renderOrderDetails(' + orders[i].id + ')');

        $(item).find('#orderDate').html("Date: " + orders[i].dt);

        $(item).find('#orderTotal').html('Total: ' + orders[i].total + " Ron");
        $(item).find('#orderStatus').html('Status: ' + orders[i].status);

        $(item).find('button').attr("onClick", 'renderOrderDetails(' + orders[i].id + ')');
        $('#orderList').append(item);
   }

}











function renderOrderDetails(orderId) {
    $('#orderList').html("<div id='orderInfos'></div> <div id='orderProducts'></div>");

    //get order
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/getOrderInfo",
        data: JSON.stringify({ id: orderId }),
        processData: true,
        dataType: "json",
        success: function (response) {
            var order = JSON.parse(response.d);
            createOrderInfoSection(order);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); bootbox.alert("Error!");
        }
    });

    //get order items
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/getOrderProds",
        data: JSON.stringify({ id: orderId }),
        processData: true,
        dataType: "json",
        success: function (response) {
            createFeaturedItem(response);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); bootbox.alert("Error!");
        }
    });

}


function createOrderInfoSection(order) {

    var template = $('#order-info').html();
    var item = $(template).clone();

    //edit template
    $(item).find('#userName').html('Name: ' + order.first_name + ' ' + order.last_name);
    $(item).find('#userLocation').html('Location: </br>' + order.location);
    $(item).find('#userPhone').html('Phone: ' + order.phone);
    $(item).find('#userEmail').html('Email: ' + order.email);

    $(item).find('#orderDate').html('Order date: ' + order.date);
    $(item).find('#orderShippingStatus').html('Status: ' + order.status);
    $(item).find('#orderShipping').html('Shipping method: ' + order.shipping);
    $(item).find('#orderShippingCost').html('Shipping cost: ' + order.shippingCost + ' Ron');
    
    $(item).find('#orderTotalValue').html('<b>Total:</b> </br>' + order.total + ' Ron');

    $('#orderInfos').html(item);

}


function createFeaturedItem(str) {
    list = JSON.parse(str.d);
    $('#orderProducts').html("");
    for (var i = 0; i < list.length; i++) {

        var template = $('#teaser-product').html();
        var item = $(template).clone();

        //edit template
        $(item).find('#price').html('Total: ' + list[i].totalPrice + ' Ron');
        $(item).find('#ProdDisplay').data("prodId", list[i].id); //sets the product id.
        $(item).find('#ProductTitle').html(list[i].name).attr('href', '/website/html/products/ShowProduct.html?id=' + list[i].prodId);
        $(item).find('#TeaserImage').attr("src", list[i].pic);
        $(item).find('#imageLink').attr("href", '/website/html/products/ShowProduct.html?id=' + list[i].prodId);
        $(item).find('#displayQuantity').html(list[i].items).attr('disabled', true);
        $(item).find('.btn.btn-default.dropdown-toggle.floatRight').attr('disabled', true);
        
        $('#orderProducts').append(item);
    }


}
