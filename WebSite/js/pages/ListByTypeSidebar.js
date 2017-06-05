$(document).ready(function () {

    initSidebar();
        
});

function initSidebar() {

    var param = window.location.toString();
    var id = param.substring(param.indexOf("=") + 1);
    if (id == param) {
        window.location.replace("../index.html");
        return;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/getFilters",
        data: JSON.stringify({ id: id }),
        processData: true,
        dataType: "json",
        success: function (response) {
            populateTypes(response);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/getFilterValuesByType",
        data: JSON.stringify({ id: id }),
        processData: true,
        dataType: "json",
        success: function (response) {
            populatesubValues(response);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });


}

function populateTypes(filters) {
    var list = JSON.parse(filters.d);
    var menuPanel = $("#HomeSidebar").find(".panel");
    for (var i = 0; i < list.length; i++) {
        $(menuPanel).append('<a href="#' + list[i].id + '" class="list-group-item" data-toggle="collapse" data-parent="HomeSidebar">' + list[i].name + '</a>');
        $(menuPanel).append('<div class="collapse in" id="' + list[i].id + '"></div>');
    }
}

function populatesubValues(subValues) {
    var list = JSON.parse(subValues.d);
    var menuPanel = $("#HomeSidebar").find(".panel");
    for (var i = 0; i < list.length; i++) {
        $(menuPanel).find('#' + list[i].filter_id).append('<a href="products/subsearch.html?id=' + list[i].id + '" class="list-group-item">' + list[i].value + '</a>');
    }
}