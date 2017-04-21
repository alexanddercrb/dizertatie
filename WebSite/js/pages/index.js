$(document).ready(function () {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: '../WebService.svc/returnProduct',
        data: "",
        processData: true,
        dataType: "json",
        success: function (response) {
            createFeaturedItem(response);
        },
        error: function (errormsg) {
            alert(errormsg.responseText);
        }
    });
});

function createFeaturedItem(str) {
    list = JSON.parse(str.d);
    var teasers = '';
    for (var i = 0; i < list.length; i++) {

        var template = $('#teaser-product').html();
        var item = $(template).clone();
        $(item).find('#price').html(list[i].price + '$');
        $(item).find('#ProductTitle').html(list[i].title);
        $(item).find('#description').html(list[i].specs);

        var j = 1;
        for (j = 1; j <= list.stars; j++) {
            $(item).find('#review'+j).addClass('glyphicon-star');
        }
        if (j <= 5)
            for (k = j; k <= 5; k++)
                $(item).find('#review' + k).addClass('glyphicon-star-empty');
        $('#newestProds').append(item);

        /*
         var part1 =  '<div class="col-sm-4 col-lg-4 col-md-4">    <div class="thumbnail">     <img src="';
         var image = 'http://placehold.it/320x150';
         var part2 = '" alt="">     <div class="caption">     <h4 class="pull-right">$'
         var price = list[i].price;
         var part3 = '$</h4>     <h4><a href="#">';
         var name = list[i].name;
         var part4 = '</a>      </h4>  <p>';
         var description = list[i].specs;
         var part5= '</p>        </div>       <div class="ratings">   <p class="pull-right"> reviews</p>            <p>';
         var stars = '';
         var i;
         for (i = 0; i < list.stars; i++){
             stars += ' <span class="glyphicon glyphicon-star"></span> ';
         }
         if (i<5)
             for (j=i; j<5; j++)
                 stars += '<span class="glyphicon glyphicon-star-empty"></span>';
         var part6 = '   </p>  </div>    </div>   </div>';
         teasers += part1 + image + part2 + price + part3 + name + part4 + description + part5 + stars + part6;
    */
    }
}