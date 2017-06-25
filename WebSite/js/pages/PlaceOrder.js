var productList;
var sum = 0;
var list;

$(document).ready(function () {

    initPage();

});


function initPage()
{
    $('#cartProducts').html('');
    var cookie = readCookie('cartProducts');
    if (cookie == "") {
        window.location.replace("../index.html");
    }
    else {
        productList = new Array(100); //create array of product and no. of items
        for (var i = 0; i < 100; i++) {
            productList[i] = new Array(100);
        }
        var prodsList = cookie.split(',');
        var prodIndex = 0;
        for (var i = 0; i < prodsList.length - 1; i++) {
            var prodAttr = prodsList[i].split('_');
            productList[prodIndex][0] = prodAttr[0].substring(prodAttr[0].indexOf(":") + 1);
            productList[prodIndex][1] = prodAttr[1].substring(prodAttr[1].indexOf(":") + 1);
            prodIndex++;
        }

        if (readCookie('customerId') != '') {
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
        

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/returnCart",
            data: JSON.stringify({ productList: productList }),
            processData: true,
            dataType: "json",
            success: function (response) {
                createTotal(response);
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });

        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/getShippings",
            data: "",
            processData: true,
            dataType: "json",
            success: function (response) {
                createShipping(response);
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });

    }
}


function createTotal(response)
{
    list = JSON.parse(response.d);
    sum = 0;

    for (var i = 0; i < list.length; i++) {
        if (parseInt(productList[i][1]) <= list[i].items)
            if (list[i].offer > 0)
                sum += list[i].offer * parseInt(productList[i][1]);
            else
                sum += list[i].price * parseInt(productList[i][1]);
        else
            if (list[i].offer > 0)
                sum += list[i].offer * list[i].items;
            else
                sum += list[i].price * list[i].items;
    }


    displayTotal(0);
}


function createShipping(response) {
    var list = JSON.parse(response.d);
    if (list.lengt == 0)
        return;

    var html = "";

    for (var i = 0; i < list.length; i++) {
        html += "<label class='radio'><input type='radio' id='" + list[i].id + "' name='radio' value='" + list[i].cost + "'>" + list[i].name + " ( " + list[i].cost + "Ron)</label>"
    }

    $('#shipping').append(html);

    $('input[type=radio]').on('change', function () {
        displayTotal($('input[type=radio]:checked').val());
    })
}

function displayTotal(shipping) {
    var total = "<div class='totalArea col-md-12 right'> <h3><b>TOTAL: </b>" + parseInt(parseInt(sum) + parseInt(shipping)) + "Ron</h3></div>";
    $('#orderDetails').find('.totalArea').remove();
    $('#orderDetails').append(total);
}

function initAccountDetails(response) {
    var user = JSON.parse(response.d);
    $('#firstName').val(user.first_name);
    $('#lastName').val(user.last_name);
    $('#address').val(user.location);
    $('#phone').val(user.phone);
    $('#email').val(user.email);
}

function placeOrder() {
    if (validateRequired() == 1)
        return;

    //check stocks
    for (var i = 0; i < list.length; i++) {
        if (parseInt(productList[i][1]) > list[i].items) //not enough stock
        {
            bootbox.alert('Our stocks changed, please review your cart!');
            window.location.replace('ShoppingCart.html');
            return;
        }
    }


    var prods = new Array(list.length);
    var noOfItems = new Array(list.length);

    for (var i = 0; i < list.length; i++) {
        prods[i] = productList[i][0];
        noOfItems[i] = productList[i][1];
    }



    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../WebService.svc/placeOrder",
        data: JSON.stringify({
            productList: prods,
            noOfItems : noOfItems,
            userId: readCookie('customerId'),
            total: parseInt($('input[type=radio]:checked').val()) + sum,
            first_name: $('#firstName').val(),
            last_name: $('#lastName').val(),
            address: $('#address').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            shipping: parseInt($('input[type=radio]:checked').attr('id'))
        }),
        processData: true,
        dataType: "json",
        success: function (response) {
            writeCookie('cartProducts', ''); //reset cart
            bootbox.alert("Your order was received");
            window.location.replace('/WebSite/html/forms/ShoppingCart.html');
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); bootbox.alert("Error!");
        }
    });

    
}

function validateRequired() {
    var status = 0;
    $(".required").each(function () {
        if (this.value == "")
            status = 1;
    });

    if ($('input[type=radio]:checked').length == 0)
        status = 1;

    if (status == 1)
        bootbox.alert('Please fill all fields!')

    return status;
}