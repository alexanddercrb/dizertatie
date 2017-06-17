var productList;


$(document).ready(function () {


    //ajax to get products for page
    //parse list from cookie to array and save public
    var cookie = readCookie('cartProducts');
    if (cookie == "") {

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

            $('li option').on('click', function () {
                $(this).parent().parent().parent().find('#displayQuantity').text(this.innerHTML);
                $(this).parent().parent().parent().find('#displayQuantity').attr('value', this.value).trigger('change');
            });

            $('.quantity .btn-default').on('change', function () {
                alert("ai apasat dropdown-ul cu id-ul " + $(this).parent().parent().parent().parent().parent().data("prodId"));
            })
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });





});


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
        $(item).find('#displayQuantity').html(list[i].items).val(list[i].items);
        $('#cartProducts').append(item);
    }


}