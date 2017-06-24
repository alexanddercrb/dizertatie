$(document).ready(function () {
    if (readCookie('userType') == "2") {
        window.location.replace("../index.html");
        return;
    }
});

    function resetFilters(startingFilter) {

        switch (startingFilter) {
            case 'category':
                resetSubcategory();
                resetType();
                resetFilter();
                resetFilterValue();
            case 'subcategory':
                resetType();
                resetFilter();
                resetFilterValue();
            case 'type':
                resetFilter();
                resetFilterValue();
            case 'filter':
                resetFilterValue();

        }

    }

    function validateRequired() {
        var status = 0;
        $(".required").each(function () {
            if (this.value == "0" || this.value == "")
                status = 1;
        });
        if (status == 1)
            $("#errorDisplay").html("Please fill all needed fields").removeClass("hidden");

        return status;
    }

    function goBack() {
        window.location.href = "../index.html";
    }


    function getCategory() {
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/getCategories",
            data: "",
            processData: true,
            dataType: "json",
            success: function (response) {
                populateCategories(response);
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
    }

    function addCategories() {
        if (validateRequired() == 1)
            return;

        var names = $("#categoryName").get(0).value;

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/addCategories",
            data: JSON.stringify({ names: names }),
            processData: true,
            dataType: "json",
            success: function () {
                bootbox.alert("Success!");
                goBack();
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
    }

    function populateCategories(categories) {
        var list = JSON.parse(categories.d);
        for (var i = 0; i < list.length; i++) {
            $('#drpCategoryName ul').append('<li><option value="' + list[i].id + '">' + list[i].name + '</option></li>');
        }

        $('#categorySelection li option').on('click', function () {
            resetFilters('category');
            $('#displayCategoryName').text(this.innerHTML);
            $('#displayCategoryName').attr('value',this.value);
            if ($('#drpSubcategoryName').length > 0) {
                getSubcategory($('#displayCategoryName').attr('value'));
            } 
        });
    }



    function getSubcategory(id) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/getSubcategories",
            data: JSON.stringify({id: id}),
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

    function addSubcategories() {
        if (validateRequired() == 1)
            return;

        var names = $("#subcategoryName").get(0).value;
        var id = $("#drpCategoryName").find(".required").get(0).value;

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/addSubcategories",
            data: JSON.stringify({ id:id , names: names }),
            processData: true,
            dataType: "json",
            success: function () {
                bootbox.alert("Success!");
                goBack();
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
    }

    function populateSubcategories(subcategories) {
        var list = JSON.parse(subcategories.d);
        for (var i = 0; i < list.length; i++) {
            $('#drpSubcategoryName ul').append('<li><option value="' + list[i].id + '">' + list[i].name + '</option></li>');
        }

        $('#subcategorySelection li option').on('click', function () {
            resetFilters('subcategory');
            $('#displaySubcategoryName').text(this.innerHTML);
            $('#displaySubcategoryName').attr('value', this.value);
            if ($('#drpTypeName').length > 0) {
                getType($('#displaySubcategoryName').attr('value'));
            }
        });
    }

    function resetSubcategory() {
        $('#displaySubcategoryName').text('Select subcategory');
        $('#displaySubcategoryName').attr('value', '0');
        $('#drpSubcategoryName ul').html('');
    }



    function getType(id) {
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

    function addTypes() {
        if (validateRequired() == 1)
            return;

        var names = $("#typeName").get(0).value;
        var id = $("#drpSubcategoryName").find(".required").get(0).value;

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/addTypes",
            data: JSON.stringify({ id: id, names: names }),
            processData: true,
            dataType: "json",
            success: function () {
                bootbox.alert("Success!");
                goBack();
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
    }

    function populateTypes(types) {
        var list = JSON.parse(types.d);
        for (var i = 0; i < list.length; i++) {
            $('#drpTypeName ul').append('<li><option value="' + list[i].id + '">' + list[i].name + '</option></li>');
        }

        $('#typeSelection li option').on('click', function () {
            resetFilters('type');
            $('#displayTypeName').text(this.innerHTML);
            $('#displayTypeName').attr('value', this.value);
            if ($('#drpFilterName').length > 0) {
                getFilter($('#displayTypeName').attr('value'));
            }
        });
    }

    function resetType() {
        $('#displayTypeName').text('Select type');
        $('#displayTypeName').attr('value', '0');
        $('#drpTypeName ul').html('');
    }



    function getFilter(id) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/getFilters",
            data: JSON.stringify({ id: id }),
            processData: true,
            dataType: "json",
            success: function (response) {
                populateFilter(response);
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
    }

    function addFilters() {
        if (validateRequired() == 1)
            return;

        var names = $("#filterName").get(0).value;
        var id = $("#drpTypeName").find(".required").get(0).value;

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/addFilters",
            data: JSON.stringify({ id: id, names: names }),
            processData: true,
            dataType: "json",
            success: function () {
                bootbox.alert("Success!");
                goBack();
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
    }

    function populateFilter(filters) {
        var list = JSON.parse(filters.d);
        for (var i = 0; i < list.length; i++) {
            $('#drpFilterName ul').append('<li><option value="' + list[i].id + '">' + list[i].name + '</option></li>');
        }

        $('#filterSelection li option').on('click', function () {
            resetFilters('filter');
            $('#displayFilterName').text(this.innerHTML);
            $('#displayFilterName').attr('value', this.value);
            if ($('#drpFilterValue').length > 0) {
                getFilterValue($('#displayFilterName').attr('value'));
            }
        });
    }

    function resetFilter() {
        $('#displayFilterName').text('Select filter');
        $('#displayFilterName').attr('value', '');
        $('#drpFilterName ul').html('');
    }

    function getFilterValue(id) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/getFilterValues",
            data: JSON.stringify({ id: id }),
            processData: true,
            dataType: "json",
            success: function (response) {
                populateFilterValues(response);
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
    }

    function addFilterValues() {
        if (validateRequired() == 1)
            return;

        var values = $("#filterValue").get(0).value;
        var id = $("#drpFilterName").find(".required").get(0).value;

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/addFilterValues",
            data: JSON.stringify({ id: id, values: values }),
            processData: true,
            dataType: "json",
            success: function () {
                bootbox.alert("Success!");
                goBack();
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
    }

    function populateFilterValues(values) {
        var list = JSON.parse(values.d);
        for (var i = 0; i < list.length; i++) {
            $('#drpFilterValue ul').append('<li><option value="' + list[i].id + '">' + list[i].value + '</option></li>');
        }

        $('#filterValueSelection li option').on('click', function () {
            $('#displayFilterValue').text(this.innerHTML);
            $('#displayFilterValue').attr('value', this.value);
        });
    }

    function resetFilterValue() {
        $('#displayFilterValue').text('Select value');
        $('#displayFilterValue').attr('value', '');
        $('#drpFilterValue ul').html('');
    }



    function addProductFilter() {
        var filter = $('#displayFilterName').get(0).innerText;
        var filterValue = $('#displayFilterName').get(0).value;
        var value = $('#displayFilterValue').get(0).value;
        var valueName = $('#displayFilterValue').get(0).innerText;
        if ($('#selectedFilters').find("button[value='" + value + "']").length > 0)
            return;
        if (filterValue != "0" && value != "0")
            $('#selectedFilters').append('<button type="button" class="btn btn-default btn-sm" onclick="$(this).remove()" value="' + value + '">' + filter + ': ' + valueName + ' <span class="glyphicon glyphicon-remove"></span></button>');
    }


    function addProduct() {
        if (validateRequired() == 1)
            return;

        var category = $("#displayCategoryName").get(0).value;
        var subcategory = $("#displaySubcategoryName").get(0).value;
        var type = $("#displayTypeName").get(0).value;
        var filters = [];
        var selectedFilters = $("#selectedFilters").find('button');
        selectedFilters.each(function() {
            filters.push(this.value);
        });
        var name = $("#productName").get(0).value;
        var code = $("#productCode").get(0).value;
        var specs = $("#productSpecs").summernote('code')
        var price = $("#productPrice").get(0).value;
        var offer = $("#productOffer").get(0).value;
        if (offer == "") {
            offer = "0";
        }
        var items = $("#productItems").get(0).value;
        if (items == "") {
            items = "0";
        }
        var images = $(".productImages").find('img');
        var uploadedImages = [];
        images.each(function () {
            if ($(this).attr("src").indexOf("defaultUpload.jpg") < 0) {
                uploadedImages.push($(this).attr("src"));
            }
        });
        if (filters.length == 0 || uploadedImages.length == 0) {
            $("#errorDisplay").html("Please fill all needed fields").removeClass("hidden");
            return;
        }

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/addProduct",
            data: JSON.stringify({
                type: type,
                filters: filters,
                name: name,
                code: code,
                specs: specs,
                price: price,
                offer: offer,
                items: items,
                uploadedImages: uploadedImages
            }),
            processData: true,
            dataType: "json",
            success: function () {
                bootbox.alert("Success!");
                goBack();
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
        
    }

