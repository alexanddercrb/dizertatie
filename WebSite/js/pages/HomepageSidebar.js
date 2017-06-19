$(document).ready(function () {

    initSidebar();

});

function initSidebar() {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "../WebService.svc/getCategories",
        data: "",
        processData: true,
        dataType: "json",
        asyic: false,
        success: function (response) {
            populateCategories(response);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); bootbox.alert("Error!");
        }
    });

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "../WebService.svc/getAllSubcategories",
        data: "",
        processData: true,
        dataType: "json",
        success: function (response) {
            populateSubcategories(response);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); bootbox.alert("Error!");
        }
    });
}

function populateCategories(categories) {
    var list = JSON.parse(categories.d);
    var menuPanel = $("#HomeSidebar").find(".panel");
    for (var i = 0; i < list.length; i++) {
        $(menuPanel).append('<a href="#' + list[i].id + '" class="list-group-item" data-toggle="collapse" data-parent="HomeSidebar">' + list[i].name + '</a>');
        $(menuPanel).append('<div class="collapse" id="' + list[i].id + '"></div>');
    }
}

function populateSubcategories(subcategories) {
    var list = JSON.parse(subcategories.d);
    var menuPanel = $("#HomeSidebar").find(".panel");
    for (var i = 0; i < list.length; i++) {
        $(menuPanel).find('#' + list[i].category_id).append('<a href="products/subsearch.html?id=' + list[i].id + '" class="list-group-item">' + list[i].name + '</a>');
    }
}