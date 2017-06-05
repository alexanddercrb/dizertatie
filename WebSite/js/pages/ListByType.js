$(document).ready(function () {

    var productList;

    var param = window.location.toString();
    var id = param.substring(param.indexOf("=") + 1);
    if (id == param) {
        window.location.replace("../index.html");
        return;
    }


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/getTypeByID",
        data: JSON.stringify({ id: id }),
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
        data: JSON.stringify({ id: id }),
        processData: true,
        dataType: "json",
        success: function (response) {
            productList = JSON.parse(response.d);
            createItem(productList, sectionProds, 0);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });

    //daca productList e mai mare decat 20, afiseaza butonul next page/prev page

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


function createItem(productList, section, startingItem) {
    var list = productList;
    var teasers = '';
    var featured = 20;
    if (list.length < 20) {
        featured = list.length;
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