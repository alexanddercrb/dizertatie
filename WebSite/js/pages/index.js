$(document).ready(function () {
    var sectionProds = "newestProds";

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "../WebService.svc/returnProducts",
        data: "",
        processData: true,
        dataType: "json",
        success: function (response) {
            createFeaturedItem(response, sectionProds);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });

    var sectionOffers = "newestOffers";

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "../WebService.svc/returnProductOffers",
        data: "",
        processData: true,
        dataType: "json",
        success: function (response) {
            createFeaturedItem(response, sectionOffers);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });


});

function createFeaturedItem(str, section) {
    var list = JSON.parse(str.d);
    var teasers = '';
    var featured = 4;
    if (list.length < 4) {
        featured = list.length;
    }
    for (var i = 0; i < featured; i++) {

        var template = $('#teaser-product').html();
        var item = $(template).clone();

        //edit template
        $(item).find('#price').html(list[i].price + ' Ron');
        if (list[i].offer > 0) {
            $(item).find('#price').addClass("hasOffer");
            $(item).find('#offer').html(list[i].offer + ' Ron');
            $(item).find('#offer').removeClass("hidden");
        }
        $(item).find('#ProductTitle').html(list[i].name).attr('href','/website/html/products/ShowProduct.html?id=' + list[i].id);
        $(item).find('#TeaserImage').attr("src", list[i].pics[0]);
        $(item).find('#imageLink').attr("href", '/website/html/products/ShowProduct.html?id=' + list[i].id);
        var j = 1;
        for (j = 1; j <= list.stars; j++) {
            $(item).find('#review'+j).addClass('glyphicon-star');
        }
        if (j <= 5)
            for (k = j; k <= 5; k++)
                $(item).find('#review' + k).addClass('glyphicon-star-empty');
        $('#' + section).append(item);
    }
}