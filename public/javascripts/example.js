$(function() {
  $("#upload").attach({ url: "/upload" });
  $("#file_select").click(function() {
    $("#upload").trigger("click");
  });
});
