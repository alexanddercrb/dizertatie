function sendFile(file, obj) {

    var formData = new FormData();
    formData.append('file', $(obj)[0].files[0]);
    $.ajax({
        type: 'post',
        url: '../../UploadImage.ashx',
        data: formData,
        success: function (status) {
            if (status != 'error') {
                $(obj).parent().find("."+obj.id).attr("src", "/WebSite" + status);
            }
        },
        processData: false,
        contentType: false,
        error: function () {
            bootbox.alert("Upload error!");
        }
    });
}

function deleteOld(oldImg) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../../WebService.svc/DeleteThumbnail',
        data: JSON.stringify({ oldImg: oldImg }),
        processData: true,
        dataType: "json",
        success: function () {
        },
        error: function () {
        }
    });
}

function imageOnChange() {
    var _URL = window.URL || window.webkitURL;
    $(".uplImg").on('change', function () {

        var file, img;
        var obj = this;
        var oldImg = $(obj).parent().find("." + obj.id).attr("src");
        deleteOld(oldImg);
        if ((file = this.files[0])) {
            img = new Image();
            img.onload = function () {
                sendFile(file, obj);
            };
            img.onerror = function () {
                bootbox.alert("Not a valid file:" + file.type);
            };
            img.src = _URL.createObjectURL(file);
        }
    });
}

function imageOnClick() {
    var _URL = window.URL || window.webkitURL;
    $("img.thumbnail").on('click', function () {

        var file, img;
        var obj = this;
        var oldImg = $(obj).attr("src");
        deleteOld(oldImg);
        $(this).attr("src", "../../Media/Images/Default/defaultUpload.jpg");
    });
}

$(document).ready(function() {
    var _URL = window.URL || window.webkitURL;
    $(".uplImg").on('change', function () {

        var file, img;
        var obj = this;
        var oldImg = $(obj).parent().find("." + obj.id).attr("src");
        deleteOld(oldImg);
        if ((file = this.files[0])) {
            img = new Image();
            img.onload = function () {
                sendFile(file, obj);
            };
            img.onerror = function () {
                bootbox.alert("Not a valid file:" + file.type);
            };
            img.src = _URL.createObjectURL(file);
        }
    });

    $("img.thumbnail").on('click', function () {

        var file, img;
        var obj = this;
        var oldImg = $(obj).attr("src");
        deleteOld(oldImg);
        $(this).attr("src", "../../Media/Images/Default/defaultUpload.jpg");
    });
})

