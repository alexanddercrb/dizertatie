var productList;
var list;

$(document).ready(function () {

    initPage();

});


function initPage() {

    var cookie = readCookie('customerId');
    if (cookie == "") {
        window.location.replace("../index.html");
        return;
    }

    //ajax to get prod list from db
    //on success render prod list
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/getFavProducts",
        data: JSON.stringify({ id: readCookie('customerId') }),
        processData: true,
        dataType: "json",
        success: function (response) {
            var list = JSON.parse(response.d);
            $('#productDetails').html("");
            if (list.length == 0) {
                $('#productDetails').append("No favorite products");
                return;
            }
            renderProdList(list);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); bootbox.alert("Error!");
        }
    })
}


function renderProdList(productList) {
    for (var i = 0; i < productList.length; i++) {

        var template = $('#itemList').html();
        var item = $(template).clone();

        //edit template
        $(item).find('#price').html(productList[i].price + ' Ron');
        if (productList[i].offer > 0) {
            $(item).find('#price').addClass("hasOffer");
            $(item).find('#offer').html(productList[i].offer + ' Ron');
            $(item).find('#offer').removeClass("hidden");
        }
        $(item).find('#ProdDisplay').data("prodId", productList[i].id); //sets the product id.
        $(item).find('#ProductTitle').html(productList[i].name).attr('href', '/website/html/products/ShowProduct.html?id=' + productList[i].id);
        $(item).find('#TeaserImage').attr("src", productList[i].pics[0]);
        $(item).find('#imageLink').attr("href", '/website/html/products/ShowProduct.html?id=' + productList[i].id);
        $(item).find('button').attr("onClick", 'deleteFromFav("' + productList[i].id + '")');
        $('#productDetails').append(item);
    }
}


function deleteFromFav(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/deleteFromFav",
        data: JSON.stringify({
            id: id,
            userId: readCookie('customerId')
        }),
        processData: true,
        dataType: "json",
        success: function (response) {
            location.reload();
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); bootbox.alert("Error!");
        }
    })
}