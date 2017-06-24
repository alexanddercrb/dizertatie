function validateAndSend(){
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var cpassword = $("#cpassword").val();
    if (first_name == '' || last_name == '' || email == '' || password == '' || cpassword == '') {
        bootbox.alert("Please fill all fields!");
        return;
    }
    else if (!ValidateEmail(email)) {
        bootbox.alert("Please insert a valid email adress!");
        return;
    } else if ((password.length) < 8) {
        bootbox.alert("Password should atleast 8 character in length!");
        return;
    } else if (!(password).match(cpassword)) {
        bootbox.alert("Your passwords don't match. Try again?");
        return;
    }
    checkEmailRegistered(first_name, last_name, email, password);

}

function checkEmailRegistered(first_name, last_name, email, password) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/checkEmail",
        data: JSON.stringify({ email: email}),
        processData: true,
        dataType: "json",
        success: function (result) {
            if (result.d == 1) {
                bootbox.alert("The email address is already used");
                return;
            }
            if (result.d == 0)
            {
                insertUser(first_name, last_name, email, password);
            }
            if (result.d == -1)
            {
                bootbox.alert("Error while checking the email address. Contact our administrators.");
                return;
            }
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); bootbox.alert("Error!");
        }
    });
}

function insertUser(first_name, last_name, email, password) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/addUser",
        data: JSON.stringify({ first_name: first_name, last_name: last_name, email: email, password: password }),
        processData: true,
        dataType: "json",
        success: function () {
            bootbox.alert("Registration complete!");
            window.location.replace("../../html/forms/LogIn.html");
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); bootbox.alert("Error!");
        }
    });
}


function validateAndLogin() {
    var email = $("#email").val();
    var password = $("#password").val();
    if (email == '' || password == '') {
        bootbox.alert("Please fill all fields!");
        return;
    }
    else if (!ValidateEmail(email)) {
        bootbox.alert("Please insert a valid email adress!");
        return;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/login",
        data: JSON.stringify({ email: email, password: password }),
        processData: true,
        dataType: "json",
        success: function (result) {
            if (result.d == null || result.d == "null")
            {
                bootbox.alert('Invalid credentials!');
                return;
            }
            var user = JSON.parse(result.d);
            writeCookie('customerId', user.id);
            writeCookie("userType", user.privileges);
            window.history.back();
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); bootbox.alert("Error!");
        }
    });
}


function ValidateEmail(email) {
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
        return false;
    }
    else {
        return true;
    }
}

$(document).ready(function () {
    $(".form input").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#register").click();
        }
    });
})