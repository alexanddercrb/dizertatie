function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return "";
}


function writeCookie(name, value) {
    var time = 12; //12h
    var date, expires;
    if (time) {
        date = new Date();
        date.setTime(date.getTime() + (time * 60 * 60 * 1000)) //time = hours
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }

    document.cookie = name + "=" + value + expires + "; path=/";
}


function writeProductCookie(name, product, items) {
    var time = 12; //12h
    var date, expires;
    if (time) {
        date = new Date();
        date.setTime(date.getTime() + (time * 60 * 60 * 1000)) //time = hours
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    value = "";
    if (readCookie(name) != "");
    {
        var searchString = "productId:" + product;
        value = readCookie(name);
        var prods = value.split(',');
        for (var i=0; i < prods.length; i++)
        {
            if (prods[i].indexOf(searchString) >= 0)
            {
                value = value.replace(prods[i]+",", "");
            }
        }
    }
    value += "productId:" + product + "_" + "noOfItems:" + items + ",";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function removeProductFromCookie(name, product, items) {
    var time = 12; //12h
    var date, expires;
    if (time) {
        date = new Date();
        date.setTime(date.getTime() + (time * 60 * 60 * 1000)) //time = hours
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    initialValue = "";
    if (readCookie(name) != "");
    {
        initialValue = readCookie(name);
        var value = "productId:" + product + "_" + "noOfItems:" + items + ",";
        initialValue = initialValue.replace(value, "");

    }
    
    document.cookie = name + "=" + initialValue + expires + "; path=/";
}