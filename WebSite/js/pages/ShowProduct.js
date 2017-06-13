var productId;
var product;

$(document).ready(function () {


    var param = window.location.toString();
    productId = param.substring(param.indexOf("=") + 1);
    if (productId == param || productId == "") {
        window.location.replace("../index.html");
        return;
    }

    // Get product
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/returnProductById",
        data: JSON.stringify({ id: productId }),
        processData: true,
        dataType: "json",
        success: function (response) {
            product = JSON.parse(response.d);
            initPage(product)
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });



    // Click on detail
    $("ul.menu-items > li").on("click", function () {
        $("ul.menu-items > li").removeClass("active");
        $(this).addClass("active");
        if ($(this).html() == "Description")
            renderDescription();
        else
            renderReviews();
    })

    // Click on QUANTITY
    $(".btn-minus").on("click", function () {
        var now = $(".section > div > input").val();
        if ($.isNumeric(now)) {
            if (parseInt(now) - 1 > 0) { now--; }
            $(".section > div > input").val(now);
        } else {
            $(".section > div > input").val("1");
        }
    })
    $(".btn-plus").on("click", function () {
        var now = $(".section > div > input").val();
        if ($.isNumeric(now)) {
            $(".section > div > input").val(parseInt(now) + 1);
        } else {
            $(".section > div > input").val("1");
        }
    })

    // Click on buy
    $("#buyNow").on("click", function () {
        alert("to be implemented");
    })

})



function initPage(product) {
    $("#productName").html(product.name);
    $("#productPrice").html("US $" + product.price)
    if (product.offer > 0)
    {
        $("#productOffer").html("US $" + product.offer);
        $("#offer").removeClass("hidden");
        $("#productPrice").addClass("hasOffer");
    }

    if ($('.menu-items .active').html() == "Description")
        renderDescription();
    else
        renderReviews();

    //render pics
    var i = 0;
    while (product.pics[i] != null) {
        $('#allPics').append('<img  class="smallThumbnailProduct inline" src="' + product.pics[i] + '" />');
        i++;
    }

    if (product.pics[0] != null)
        $('.bigThumbnailProduct').attr('src', product.pics[0]);
    else
        $('.bigThumbnailProduct').attr('src', '/WebSite/Media/Images/Default/defaultUpload.jpg');

    $('.smallThumbnailProduct').on('click', function () {
        $('.bigThumbnailProduct').attr("src",$(this).attr('src'))
    })

    //get type name and render it
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/getTypeById",
        data: JSON.stringify({ id: product.prodtype_id }),
        processData: true,
        dataType: "json",
        success: function (response) {
            type = JSON.parse(response.d);
            var link = '/WebSite/Html/products/searchResults.html?search=' + type[0].name;
            $('#searchMore').html(type[0].name).attr('href',link);

        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });
}


function renderDescription() {
    if (product == null)
        return;

    $("#descriptionArea").html(product.specs != null ? product.specs : "No description");
}

function renderReviews() {
    $("#descriptionArea").html("");
    //add form (colapsable)
    //go to database, get and render them
    $("#descriptionArea").html("not implemented yet")
}

function addToFavorite() {
    //to be implemented
    alert("add to favorite")

    //check if logged in
    //write to a new table
    //show confirmation message
}