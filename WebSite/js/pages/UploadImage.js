function sendFile(file) {

    var formData = new FormData();
    formData.append('file', $('#uplImage1')[0].files[0]);
    $.ajax({
        type: 'post',
        url: '../../UploadImage.ashx',
        data: formData,
        success: function (status) {
            if (status != 'error') {
                $("#myUploadedImg").attr("src", "/WebSite" + status);
            }
        },
        processData: false,
        contentType: false,
        error: function () {
            alert("Upload error!");
        }
    });
}

$(document).ready(function() {
    var _URL = window.URL || window.webkitURL;
    $("#uplImage1").on('change', function () {

        var file, img;
        if ((file = this.files[0])) {
            img = new Image();
            img.onload = function () {
                sendFile(file);
            };
            img.onerror = function () {
                alert("Not a valid file:" + file.type);
            };
            img.src = _URL.createObjectURL(file);
        }
    });
})