var productList;


$(document).ready(function () {

    initPage();

});


function initPage()
{
    $('#cartProducts').html('');
    var cookie = readCookie('cartProducts');
    if (cookie == "") {
        //to be implemented
        $('#cartProducts').append("<h4 style='margin-top: 50px; margin-bottom:300px;'>Your cart is empty!</h4>");
        $('#btnZone').addClass('hidden');
        //hide next step button
    }
    else {
        productList = new Array(100); //create array of product and no. of items
        for (var i = 0; i < 100; i++) {
            productList[i] = new Array(100);
        }
        var prodsList = cookie.split(',');
        var prodIndex = 0;
        for (var i = 0; i < prodsList.length - 1; i++) {
            var prodAttr = prodsList[i].split('_');
            productList[prodIndex][0] = prodAttr[0].substring(prodAttr[0].indexOf(":") + 1);
            productList[prodIndex][1] = prodAttr[1].substring(prodAttr[1].indexOf(":") + 1);
            prodIndex++;
        }

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/returnCart",
            data: JSON.stringify({ productList: productList }),
            processData: true,
            dataType: "json",
            success: function (response) {
                createFeaturedItem(response);
                createTotal(response);

                $('li option').on('click', function () {
                    $(this).parent().parent().parent().find('#displayQuantity').attr('value', this.value).trigger('change');
                });

                $('.quantity .btn-default').on('change', function () {
                    var id = $(this).parent().parent().parent().parent().parent().data("prodId");
                    writeProductCookie('cartProducts', id, $(this).val());
                    initPage();
                })

                $('.glyphicon-trash').on('click', function () {
                    var id = $(this).parent().parent().parent().parent().parent().data("prodId");
                    removeProductFromCookie('cartProducts', id);
                    var items = readCookie('cartProducts').split(',');
                    $("#cartItems").html(items.length - 1);
                    initPage();
                })
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });

    }
}


function createFeaturedItem(str, section) {
    var list = JSON.parse(str.d);

    for (var i = 0; i < list.length; i++) {

        var template = $('#teaser-product').html();
        var item = $(template).clone();

        console.log(item);
        //edit template
        $(item).find('#price').html(list[i].price + ' Ron');
        if (list[i].offer > 0) {
            $(item).find('#price').addClass("hasOffer");
            $(item).find('#offer').html(list[i].offer + ' Ron');
            $(item).find('#offer').removeClass("hidden");
        }
        $(item).find('#ProdDisplay').data("prodId", list[i].id); //sets the product id.
        $(item).find('#ProductTitle').html(list[i].name).attr('href', '/website/html/products/ShowProduct.html?id=' + list[i].id);
        $(item).find('#TeaserImage').attr("src", list[i].pics[0]);
        $(item).find('#imageLink').attr("href", '/website/html/products/ShowProduct.html?id=' + list[i].id);
        if (parseInt(productList[i][1]) <= list[i].items)
            $(item).find('#displayQuantity').html(productList[i][1]).val(parseInt(productList[i][1]));
        else {
            $(item).find('#displayQuantity').html(list[i].items).val(list[i].items);
            $(item).find('.form-group').append("<div style='color:red;'>Last pieces on stock</div>");
        }
        $('#cartProducts').append(item);
    }


}


function createTotal(response)
{
    var list = JSON.parse(response.d);
    var sum = 0;

    for (var i = 0; i < list.length; i++) {
        if (parseInt(productList[i][1]) <= list[i].items)
            if (list[i].offer > 0)
                sum += list[i].offer * parseInt(productList[i][1]);
            else
                sum += list[i].price * parseInt(productList[i][1]);
        else
            if (list[i].offer > 0)
                sum += list[i].offer * list[i].items;
            else
                sum += list[i].price * list[i].items;
    }

    var total = "<div class='totalArea col-md-12 right'> <h3><b>TOTAL: </b>" + sum + "Ron</h3></div>";
    $('#cartProducts').append(total);
}