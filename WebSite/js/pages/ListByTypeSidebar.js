$(document).ready(function () {

    initSidebar();
    $(".priceFilter")
        .on('change', function () {
            console.log($("#endingPrice").value);
            if ($("#endingPrice").val() == "") {
                $("#endingPrice").val(9999);
            }
            if ($("#startingPrice").val() == "") {
                $("#startingPrice").val(0);
            }
            
            refreshProducts();
            });
        });

function initSidebar() {

    $('#drpSort li option').on('click', function () {
        $('#displaySortOption').text(this.innerHTML);
        $('#displaySortOption').attr('value', this.value);

        refreshProducts();
    });

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
    var menuPanel = $("#HomeSidebar").find(".mainFilter");
    for (var i = 0; i < list.length; i++) {
        $(menuPanel).append('<a href="#" class="list-group-item" data-toggle="collapse" data-parent="HomeSidebar">' + list[i].name + '</a>');
        $(menuPanel).append('<div class="collapse in" id="' + list[i].id + '"></div>');
    }
}

function populatesubValues(subValues) {
    var list = JSON.parse(subValues.d);
    var menuPanel = $("#HomeSidebar").find(".mainFilter");
    for (var i = 0; i < list.length; i++) {
        $(menuPanel).find('#' + list[i].filter_id).append('<a href="javascript:" onclick="selectedFilter(this)" class="list-group-item fltVal" data-value="' + list[i].id + '">' + list[i].value + '</a>');
    }
}

