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

    while ($('input.search').length == 0)
    {
    }

    var searchWords = searchString.replace("%20", " ");
    $('input.search').val(searchWords);
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

}

