
$(document).ready(function () {
    var page = $('body').attr("id");
    var element = $('.sidebar-offcanvas .' + page);
    element.addClass('selectedMenu');
    if (element.parent().parent().hasClass('collapse'))
        element.parent().parent().addClass('in');

})