
$(document).ready(function () {
    var page = $('body').attr("id");

    if (readCookie('userType') == "" || readCookie('userType') == "2") {
        $('.allOrders').addClass('hidden');
        $('.pendingOrders').addClass('hidden');
        $('.sidebarInsert').addClass('hidden');
        $('.sidebarEdit').addClass('hidden');
    }

    var element = $('.sidebar-offcanvas .' + page);
    element.addClass('selectedMenu');
    if (element.parent().parent().hasClass('collapse'))
        element.parent().parent().addClass('in');

})