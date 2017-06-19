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
        url: "../../WebService.svc/getTypes",
        data: JSON.stringify({ id: id }),
        processData: true,
        dataType: "json",
        success: function (response) {
            populateTypes(response);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); bootbox.alert("Error!");
        }
    });
}

function populateTypes(types) {
    var list = JSON.parse(types.d);
    var menuPanel = $("#HomeSidebar").find(".panel");
    for (var i = 0; i < list.length; i++) {
        $(menuPanel).append('<a href="ListByType.html?id=' + list[i].id + '" class="list-group-item" data-parent="HomeSidebar">' + list[i].name + '</a>');
    }
}