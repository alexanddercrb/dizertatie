    function resetFilters(startingFilter) {

        switch (startingFilter) {
            case 'category':
                resetSubcategory();
                resetType();
                resetFilter();
            case 'subcategory':
                resetType();
                resetFilter();
            case 'type':
                resetFilter();

        }

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
                alert(errormsg.responseText);
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
                alert(errormsg.responseText);
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
                alert(errormsg.responseText);
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
                alert(errormsg.responseText);
            }
        });
    }

    function populateFilter(filters) {
        var list = JSON.parse(filters.d);
        for (var i = 0; i < list.length; i++) {
            $('#drpFilterName ul').append('<li><option value="' + list[i].id + '">' + list[i].name + '</option></li>');
        }

        $('#filterSelection li option').on('click', function () {
            $('#displayFilterName').text(this.innerHTML);
            $('#displayFilterName').attr('value', this.value);
        });
    }
    
    function resetFilter() {
        $('#displayFilterName').text('Select filter');
        $('#displayFilterName').attr('value', '');
        $('#drpFilterName ul').html('');
    }



