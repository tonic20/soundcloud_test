$(function () {
  var $assets = $("ul.assets"),
    $item_template = $(".item_template li");

  var uploader = new qq.FileUploaderBasic({
    //debug: true,
    button: $('.uploader')[0],
    action: '/assets',
    onSubmit: function(id, fileName) {
      // add to list
      var title = $(".form input[name=title]").val(),
        new_item = $item_template.clone();
      new_item.attr("data-upload_id", id);
      new_item.find(".title span").text(title);
      new_item.find(".url span").text("0%");
      $assets.prepend(new_item);
      this.params = {upload_id: id};
    },
    onProgress: function(id, fileName, loaded, total) {
      // update progress
      var progress = Math.round(loaded / total * 100) + '%',
        current_item = $assets.find("li[data-upload_id="+id+"]");
      current_item.find(".url span").text(progress);
    },
    onComplete: function(id, fileName, response) {
      // save title
      var current_item = $assets.find("li[data-upload_id="+id+"]");
      current_item.attr("data-id", response["id"]);
      current_item.find(".url label").text("Url:");
      current_item.find(".url span").text(response["url"]);
      current_item.find(".cancel_upload").replaceWith("<a rel=\"nofollow\" data-remote=\"true\" data-method=\"delete\" data-confirm=\"Are you sure?\" class=\"delete\" href=\"/assets/"+ response["id"] +"\">delete</a>");

      $.ajax({
        url: "/assets/" + response["id"],
        type: 'PUT',
        data: {'asset[title]': current_item.find(".title span").text()}
      });
    },
    showMessage: function(message){}
  });

  $("a.spec").live("click", function(e) {
    $("div.spec").toggle();
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

    if(id == undefined) {
      $this.parent().replaceWith("<span>" + new_value + "</span>");
      edit.fadeIn();
    } else {
      $.ajax({
        url: "/assets/" + id,
        type: 'PUT',
        data: {'asset[title]': new_value},
        success: function () {
          $this.parent().replaceWith("<span>" + new_value + "</span>");
          edit.fadeIn();
        }
      });
    };
    e.preventDefault();
  });
});

