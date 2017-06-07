var productList;
var itemsOnPage = 5;
var startingProdIndex = 0;
var typeId;

var startingPrice = 0;
var endingPrice = 9999;

var sortBy = "priceAsc";

var filtersSelected = [];

$(document).ready(function () {

    var param = window.location.toString();
    typeId = param.substring(param.indexOf("=") + 1);
    if (typeId == param) {
        window.location.replace("../index.html");
        return;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/getTypeByID",
        data: JSON.stringify({ id: typeId }),
        processData: true,
        dataType: "json",
        success: function (response) {
            createNavigPath(response);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });


    var sectionProds = "prods";

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/returnProductsByType",
        data: JSON.stringify({
            id: typeId,
            startingPrice: startingPrice,
            endingPrice: endingPrice,
            sortBy: sortBy,
            filtersSelected: filtersSelected
        }),
        processData: true,
        dataType: "json",
        success: function (response) {
            productList = JSON.parse(response.d);
            if (productList.length == 0) {
                return;
            }
            createItem(productList, sectionProds, 0, itemsOnPage);
            if (productList.length > itemsOnPage)
                $("#btnNext").removeClass("hidden");
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });



    $("#btnNext")
        .on("click",
            function() {
                startingProdIndex += itemsOnPage;
                $("#"+sectionProds).empty();
                createItem(productList, sectionProds, startingProdIndex, itemsOnPage);
                if (startingProdIndex + itemsOnPage > productList.length) {
                    $("#btnNext").addClass("hidden");
                } else {
                    $("#btnNext").removeClass("hidden");
                }
                if (startingProdIndex > 0) {
                    $("#btnPrev").removeClass("hidden");
                } else {
                    $("#btnPrev").addClass("hidden");
                }
            });

    $("#btnPrev")
    .on("click",
        function () {
            startingProdIndex -= itemsOnPage;
            $("#" + sectionProds).empty();
            createItem(productList, sectionProds, startingProdIndex, itemsOnPage);
            if (startingProdIndex + itemsOnPage > productList.length) {
                $("#btnNext").addClass("hidden");
            } else {
                $("#btnNext").removeClass("hidden");
            }
            if (startingProdIndex > 0) {
                $("#btnPrev").removeClass("hidden");
            } else {
                $("#btnPrev").addClass("hidden");
            }
        });


});

function createNavigPath(str) {
    var list = JSON.parse(str.d);
    var subcategId = list[0].subcategory_id;
    $("#typeMenuName").html(list[0].name);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/getSubCategoryByID",
        data: JSON.stringify({ id: subcategId }),
        processData: true,
        dataType: "json",
        success: function (response) {
            var list1 = JSON.parse(response.d);
            $("#subcategoryMenuName").html(list1[0].name);
            setCategoryInMenu(list1[0].id);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });
}

function setCategoryInMenu(categId)
{
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/getCategoryById",
        data: JSON.stringify({ id: categId }),
        processData: true,
        dataType: "json",
        success: function (response) {
            var list1 = JSON.parse(response.d);
            $("#categoryMenuName").html(list1[0].name);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });
}


function createItem(productList, section, startingItem, itemsOnPage) {
    var list = productList;
    var featured = itemsOnPage;
    if (list.length < itemsOnPage || list.length - 1 - startingItem < itemsOnPage) {
        featured = list.length - startingItem;
    }
    for (var i = startingItem; i < startingItem + featured; i++) {

        var template = $('#teaser-product').html();
        var item = $(template).clone();

        //edit template
        $(item).find('#price').html(list[i].price + ' Ron');
        if (list[i].offer > 0) {
            $(item).find('#price').addClass("hasOffer");
            $(item).find('#offer').html(list[i].offer + ' Ron');
            $(item).find('#offer').removeClass("hidden");
        }
        $(item).find('#ProductTitle').html(list[i].name);
        $(item).find('#TeaserImage').attr("src", list[i].pics[0]);
        var j = 1;
        for (j = 1; j <= list.stars; j++) {
            $(item).find('#review' + j).addClass('glyphicon-star');
        }
        if (j <= 5)
            for (k = j; k <= 5; k++)
                $(item).find('#review' + k).addClass('glyphicon-star-empty');
        $('#' + section).append(item);
    }
}

function selectedFilter(item) {
    if ($(item).hasClass("active")) {
        $(item).removeClass("active");
    } else {
        $(item).addClass("active");
    }

    refreshProducts();
}

function refreshProducts() {

    startingProdIndex = 0;

    startingPrice = $("#startingPrice").val();
    endingPrice = $("#endingPrice").val();
    sortBy = $("#displaySortOption").get(0).value;

    filtersSelected = [];
    $("a.active")
        .each(function(index) {
            filtersSelected.push($(this).data('value'));
        });

    $("#btnPrev").addClass("hidden");
    $("#btnNext").addClass("hidden");

    var sectionProds = "prods";
    $("#" + sectionProds).empty();

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/returnProductsByType",
        data: JSON.stringify({
            id: typeId,
            startingPrice: startingPrice,
            endingPrice: endingPrice,
            sortBy: sortBy,
            filtersSelected: filtersSelected
        }),
        processData: true,
        dataType: "json",
        success: function (response) {
            productList = JSON.parse(response.d);
            if (productList.length == 0) {
                return;
            }
            createItem(productList, sectionProds, 0, itemsOnPage);
            if (productList.length > itemsOnPage) {
                $("#btnNext").removeClass("hidden");
            }
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });
}