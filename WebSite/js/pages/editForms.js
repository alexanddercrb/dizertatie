$(document).ready(function () {
    if (readCookie('userType') == "2") {
        window.location.replace("../index.html");
        return;
    }
});

    function resetFilters(startingFilter) {

        switch (startingFilter) {
            case 'category':
                resetCategory();
                resetSubcategory();
                resetType();
                resetFilter();
                resetFilterValue();
            case 'subcategory':
                resetSubcategory();
                resetType();
                resetFilter();
                resetFilterValue();
            case 'type':
                resetType();
                resetFilter();
                resetFilterValue();
            case 'filter':
                resetFilter();
                resetFilterValue();
            case 'filterValue':
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

    function updateCategory() {
        if (validateRequired() == 1)
            return;

        var name = $("#categoryName").val();

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/updateCategory",
            data: JSON.stringify({ id: $('#displayCategoryName').val() , name: name }),
            processData: true,
            dataType: "json",
            success: function () {
                bootbox.alert("Success!");
                resetFilters('category');
                getCategory();
                $("#categoryName").val("");
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
            resetFilters('subcategory');
            $('#displayCategoryName').text(this.innerHTML);
            $('#displayCategoryName').attr('value',this.value);
            if ($('#drpSubcategoryName').length > 0) {
                getSubcategory($('#displayCategoryName').attr('value'));
            } 
        });
    }

    function resetCategory() {
        $('#displayCategoryName').text('Select category');
        $('#displayCategoryName').attr('value', '0');
        $('#drpCategoryName ul').html('');
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

    function updateSubcategory() {
        if (validateRequired() == 1)
            return;

        var name = $("#subcategoryName").val();
        var id = $("#displaySubcategoryName").val();

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/updateSubcategory",
            data: JSON.stringify({ id: id , name: name }),
            processData: true,
            dataType: "json",
            success: function () {
                bootbox.alert("Success!");
                resetFilters('category');
                getCategory();
                $("#subcategoryName").val("");
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
            resetFilters('type');
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

    function updateType() {
        if (validateRequired() == 1)
            return;

        var name = $("#typeName").val();
        var id = $("#displayTypeName").val();

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/updateType",
            data: JSON.stringify({ id: id, name: name }),
            processData: true,
            dataType: "json",
            success: function () {
                bootbox.alert("Success!");
                resetFilters('category');
                getCategory();
                $("#typeName").val("");
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
            resetFilters('filter');
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

    function updateFilter() {
        if (validateRequired() == 1)
            return;

        var name = $("#filterName").val();
        var id = $("#displayFilterName").val();

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/updateFilter",
            data: JSON.stringify({ id: id, name: name }),
            processData: true,
            dataType: "json",
            success: function () {
                bootbox.alert("Success!");
                resetFilters('category');
                getCategory();
                $("#filterName").val("");
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
            resetFilters('filterValue');
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

    function updateFilterValue() {
        if (validateRequired() == 1)
            return;

        var value = $("#filterValue").val();
        var id = $("#displayFilterValue").val();

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/updateFilterValue",
            data: JSON.stringify({ id: id, value: value }),
            processData: true,
            dataType: "json",
            success: function () {
                bootbox.alert("Success!");
                resetFilters('category');
                getCategory();
                $("#filterValue").val("");
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

    function addProductFilter(name, value, filterName) {
        if ($('#selectedFilters').find("button[value='" + value + "']").length > 0)
            return;
        if (value != "0")
            $('#selectedFilters').append('<button type="button" class="btn btn-default btn-sm" onclick="$(this).remove()" value="' + value + '">' + filterName + ': ' + name + ' <span class="glyphicon glyphicon-remove"></span></button>');
    }


    function updateProduct() {
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
            url: "../../WebService.svc/updateProduct",
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


    function searchProd() {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/returnSearchResults",
            data: JSON.stringify({
                searchString: $('#searchString').val(),
                startingPrice: 0,
                endingPrice: 999999,
                sortBy: ""
            }),
            processData: true,
            dataType: "json",
            success: function (response) {
                var productList = JSON.parse(response.d);
                if (productList.length == 0) {
                    $('#productDetails').html('No products found');
                    return;
                }
                $('#productDetails').html('');
                renderProdList(productList);
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
    }

    function renderProdList(productList){
        for (var i = 0; i < productList.length; i++) {

            var template = $('#itemList').html();
            var item = $(template).clone();

            //edit template
            $(item).find('#price').html(productList[i].price + ' Ron');
            if (productList[i].offer > 0) {
                $(item).find('#price').addClass("hasOffer");
                $(item).find('#offer').html(productList[i].offer + ' Ron');
                $(item).find('#offer').removeClass("hidden");
            }
            $(item).find('#ProdDisplay').data("prodId", productList[i].id); //sets the product id.
            $(item).find('#ProductTitle').html(productList[i].name).attr('href', '/website/html/products/ShowProduct.html?id=' + productList[i].id);
            $(item).find('#TeaserImage').attr("src", productList[i].pics[0]);
            $(item).find('#imageLink').attr("href", '/website/html/products/ShowProduct.html?id=' + productList[i].id);
            $(item).find('button').attr("onClick", 'editProduct("' + productList[i].id + '")');
            $('#productDetails').append(item);
        }
    }


    function editProduct(id) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/returnProductById",
            data: JSON.stringify({ id: id }),
            processData: true,
            dataType: "json",
            success: function (response) {
                product = JSON.parse(response.d);
                renderProdDetails(product)
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
    }

    function renderProdDetails(product)
    {
        $('#productDetails').html("");
        var template = $('#prodTemplate').html();
        var item = $(template).clone();



        //render name, code, etc.
        $(item).find('#productName').val(product.name);
        $(item).find('#productCode').val(product.code);
        $(item).find('#productItems').val(product.items);
        $(item).find('#productPrice').val(product.price);
        $(item).find('#productOffer').val(product.offer);
        $(item).find('#productSpecs').val(product.specs).summernote()


        $('#productDetails').append(item);



        var id = product.prodtype_id;

        //fill category, subcategory and type
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/getProductDetailsByType",
            data: JSON.stringify({ id: id }),
            processData: true,
            dataType: "json",
            success: function (result) {
                var type = JSON.parse(result.d);
                selectCategory(type.CategoryId, type.SubcategoryId, type.TypeId);
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
        
        //get list of filter values
        //render filter values
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/getFilterValuesByProduct",
            data: JSON.stringify({ id: product.id }),
            processData: true,
            dataType: "json",
            success: function (result) {
                var items = JSON.parse(result.d);
                for (var i = 0; i<items.length; i++)
                {
                    addProductFilter(items[i].name, items[i].value, items[i].filterName);
                }
                //selectCategory(type.CategoryId, type.SubcategoryId, type.TypeId);
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
        

        //get pictures
        //render pictures
        var i = 0;
        while (product.pics[i] != null) {
            $('#myUploadedImg' + (i+1)).attr('src', product.pics[i]).addClass('hasImage');
            i++;
        }

        imageOnChange();
        imageOnClick();
        
    }

    function selectCategory(category_id, subcategory_id, type_id) {
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/getCategories",
            data: "",
            processData: true,
            dataType: "json",
            success: function (response) {
                populateCategories(response);
                $('#drpCategoryName option[value="' + category_id + '"]').trigger('click');
                selectSubcategory(category_id, subcategory_id, type_id);
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
    }

    function selectSubcategory(category_id, subcategory_id, type_id) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/getSubcategories",
            data: JSON.stringify({ id: category_id }),
            processData: true,
            dataType: "json",
            success: function (response) {
                resetFilters('subcategory');
                populateSubcategories(response);
                $('#drpSubcategoryName option[value="' + subcategory_id + '"]').trigger('click');
                
                selectType(subcategory_id, type_id);
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
    }

    function selectType(subcategory_id, type_id) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../WebService.svc/getTypes",
            data: JSON.stringify({ id: subcategory_id }),
            processData: true,
            dataType: "json",
            success: function (response) {
                resetFilters('type');
                populateTypes(response);
                $('#drpTypeName option[value="' + type_id + '"]').trigger('click');
            },
            error: function (errormsg) {
                console.log(errormsg.responseText); bootbox.alert("Error!");
            }
        });
    }