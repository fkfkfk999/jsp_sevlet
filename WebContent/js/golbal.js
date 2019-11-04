// 보이지 않게끔 하는 css클래스 hidden을 toggle한다.
function hiddenClassToggle(obj) {
  if (!obj.hasClass("hidden")) obj.addClass("hidden");
  else obj.removeClass("hidden");
}
$(document).ready(function() {
  $("#board").click(function() {
    location.assign("/board/list.do");
  });
  $("#video").click(function() {
    const openUrl = "/board/videoPop.do";
    const name = "Video Upload";
    const option =
      "width = 500, height=250, top = 100, left = 200, location = no";
    window.open(openUrl, name, option);
  });
  $("#chairmanCorps").click(function() {
    location.assign("/board/chairmanCorps.do");
  });
});
