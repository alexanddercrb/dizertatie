﻿var productId;
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

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/getReviews",
        data: JSON.stringify({
            productId: productId,
        }),
        processData: true,
        dataType: "json",
        async: false,
        success: function (response) {
            var reviews = JSON.parse(response.d);
            if (reviews.length != 0) {
                $("#descriptionArea").append("<div class='reviewsArea'></div>");
                for (var i = 0; i < reviews.length; i++) {
                    var reviewToRender = "<div class='reviewArea'><div class='reviewName'>" + reviews[i].name + "</div>";
                    reviewToRender += "<div class='ratings'><p>";
                    for (j = 0; j < reviews[i].stars; j++) {
                        reviewToRender += '<span id="review" class="glyphicon glyphicon-star"></span>';
                    }
                    for (; j < 5; j++) {
                        reviewToRender += '<span id="review" class="glyphicon glyphicon-star-empty"></span>';
                    }
                    reviewToRender += "</p></div>";
                    reviewToRender += "<div class='reviewDescription'>" + reviews[i].comment + "</div></div>";
                    $(".reviewsArea").append(reviewToRender);

                }
            }
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });

    var formReview = '<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#addReview">Add review</button> \
          <div id="addReview" class="collapse"> \
            <div class="form-group"> \
                <label for="reviewName" class="requiredLabel">Name:</label></br> \
                <input type="text" id="reviewName" /> </br> </br> \
                <label for="review" class="requiredLabel">Review:</label> </br> \
                <textarea id="review"></textarea> </br> </br> \
                <label for="stars" class="requiredLabel">Stars:</label> </br> \
                <div class="dropdown"> \
                    <div id="drpStars" class="btn-group"> \
                        <button id="displayStars" value="5" class="btn btn-default required" data-toggle="dropdown">5</button> \
                        <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"><span class="caret"></span></button> \
                        <ul id="starsSelection" class="dropdown-menu"> \
                            <li> <option value="1">1</option></li> \
                            <li> <option value="2">2</option></li> \
                            <li> <option value="3">3</option></li> \
                            <li> <option value="4">4</option></li> \
                            <li> <option value="5">5</option></li> \
                        </ul> \
                    </div> \
                </div> </br> </br> \
                <button type="button" class="btn btn-success" onclick="saveReview()">Save</button>\
            </div> \
          </div>'
    $("#descriptionArea").append(formReview);

    $('#starsSelection li option').on('click', function () {
        $('#displayStars').text(this.innerHTML);
        $('#displayStars').attr('value', this.value);
    });
}

function saveReview() {
    if (($("#addReview").find("input").val() == null || $("#addReview").find("input").val() == "")
            || ($("#addReview").find("textarea").val() == null || $("#addReview").find("textarea").val() == "")) {
        alert("Please fill all fields");
        return;
    }

    var name = $("#addReview").find("input").val();
    var review = $("#addReview").find("textarea").val();
    var stars = $("#addReview").find("#displayStars").val();

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/insertReview",
        data: JSON.stringify({
            productId: productId,
            name: name,
            review: review,
            stars: stars
        }),
        processData: true,
        dataType: "json",
        success: function (response) {
            $("#descriptionArea").html("Your review was sent!");
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });
}


function addToFavorite() {
    //to be implemented
    alert("not implemented yet")

    //check if logged in
    //write to a new table
    //show confirmation message
}