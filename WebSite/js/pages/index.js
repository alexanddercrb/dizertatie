$(document).ready(function () {
    var sectionProds = "newestProds";

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "../WebService.svc/returnProducts",
        data: "",
        processData: true,
        dataType: "json",
        success: function (response) {
            createFeaturedItem(response, sectionProds);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });

    var sectionOffers = "newestOffers";

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "../WebService.svc/returnProductOffers",
        data: "",
        processData: true,
        dataType: "json",
        success: function (response) {
            createFeaturedItem(response, sectionOffers);
        },
        error: function (errormsg) {
            console.log(errormsg.responseText); alert("Error!");
        }
    });


});

function createFeaturedItem(str, section) {
    var list = JSON.parse(str.d);
    var teasers = '';
    var featured = 4;
    if (list.length < 4) {
        featured = list.length;
    }
    for (var i = 0; i < featured; i++) {

        var template = $('#teaser-product').html();
        var item = $(template).clone();

        //edit template
        $(item).find('#price').html(list[i].price + ' Ron');
        if (list[i].offer > 0) {
            $(item).find('#price').addClass("hasOffer");
            $(item).find('#offer').html(list[i].offer + ' Ron');
            $(item).find('#offer').removeClass("hidden");
        }
        $(item).find('#ProductTitle').html(list[i].name);
        $(item).find('#TeaserImage').attr("src", list[i].pics[0]);
        var j = 1;
        for (j = 1; j <= list.stars; j++) {
            $(item).find('#review'+j).addClass('glyphicon-star');
        }
        if (j <= 5)
            for (k = j; k <= 5; k++)
                $(item).find('#review' + k).addClass('glyphicon-star-empty');
        $('#' + section).append(item);

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