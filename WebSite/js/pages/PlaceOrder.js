var productList;
var sum = 0;

$(document).ready(function () {

    //check if is logged in
    //if is, autocomplete fields

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
    var list = JSON.parse(response.d);
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

    var html = "<form>";

    for (var i = 0; i < list.length; i++) {
        html += "<label class='radio'><input type='radio' id='" + list[i].id + "' name='radio' value='" + list[i].cost + "'>" + list[i].name + " ( " + list[i].cost + "Ron)</label>"
    }

    html += "</form>";
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


function placeOrder() {
    //check fields
    //check stocks
    //write to database
    //show confirmation message
    alert("to be implemented");
}