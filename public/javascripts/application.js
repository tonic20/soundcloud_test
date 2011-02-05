$(function () {

  var uploader = new qq.FileUploader({
    element: $('#file-uploader')[0],
    action: '/assets',
    showMessage: function(message){ }
  });

});

