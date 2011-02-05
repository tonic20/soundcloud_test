$(function () {
  var uploader = new qq.FileUploader({
    element: $('#file-uploader')[0],
    action: '/assets',
    showMessage: function(message){ }
  });

  $("ul.assets li a.edit").live("click", function(e) {
    var $this = $(this),
      title = $this.parent().find("span");

    value = $.trim(title.text());
    $this.fadeOut('fast', function() {
      edit_box = $("<span>" +
        "<input type='hidden' name='old_value' value='"+ value +"' /> " +
        "<input type='text' name='new_value' value='"+ value +"' /> " +
        "<input type='button' value='save' class='save' /> " +
        "or <a class='cancel' href='#'>cancel</a>" +
        "</span>");
      title.replaceWith(edit_box);
    });

    e.preventDefault();
  });

  $("ul.assets li a.cancel").live("click", function(e) {
    var $this = $(this),
      edit = $this.parent().siblings(".edit");

    old_value = $this.siblings("input[type=hidden]").val();
    $this.parent().replaceWith("<span>" + old_value + "</span>");
    edit.fadeIn('fast');

    e.preventDefault();
  });


  $("ul.assets li .save").live("click", function(e) {
    var $this = $(this),
      edit = $this.parent().siblings(".edit"),
      id = $this.parents("li").attr("data-id");
      new_value = $this.siblings("input[type=text]").val();

    $.ajax({
      url: "/assets/" + id,
      type: 'PUT',
      data: {'asset[title]': new_value},
      success: function () {
        $this.parent().replaceWith("<span>" + new_value + "</span>");
        edit.fadeIn();
      }
    });

    e.preventDefault();
  });
});

