$(document).ready(function () {

    initPage();

});

function initPage() {
    var cookie = readCookie('customerId');
    if (cookie == "") {
        window.location.replace("../index.html");
        return;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/getCustomer",
        data: JSON.stringify({ id: readCookie('customerId') }),
        processData: true,
        dataType: "json",
        success: function (response) {
            if (response.d != null)
                initAccountDetails(response);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); bootbox.alert("Error!");
        }
    });
}


function initAccountDetails(response) {
    var user = JSON.parse(response.d);
    $('#firstName').val(user.first_name);
    $('#lastName').val(user.last_name);
    $('#address').val(user.location);
    $('#phone').val(user.phone);
    $('#email').val(user.email);
}

function saveProfile() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/updateUser",
        data: JSON.stringify({
            id: readCookie('customerId'),
            first_name: $('#firstName').val(),
            last_name: $('#lastName').val(),
            address: $('#address').val(),
            phone: $('#phone').val(),
            email: $('#email').val()
        }),
        processData: true,
        dataType: "json",
        success: function () {
            bootbox.alert("Success!");
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); bootbox.alert("Error!");
        }
    });

}