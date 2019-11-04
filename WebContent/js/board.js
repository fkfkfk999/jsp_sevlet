//카테고리 값을 넘겨주면 벨류로 리턴
function SelectTextToValue(text) {
  let returnText = "";

  for (let i = 0; i < $("#cg_code").get(0).length; i++) {
    if ($("#cg_code").get(0)[i].textContent === text)
      returnText = $("#cg_code").get(0)[i].value;
  }

  return returnText;
}

$(document).ready(function() {
  // /******************* list.html *********************/

  // 국가표준에서 글쓰기 버튼 클릭 이벤트
  $("#writeBtn").click(function() {
    // 모달 창이 안보이는 상태라면 보이게끔 한다.
    hiddenClassToggle($(".modalBox_write"));
    //제목을 글쓰기로 해준다.
    $(".write-list > li > h1").text("국가표준 등록");
    // 등록에선 수정과 삭제가 필요 없으므로 숨겨준다.
    hiddenClassToggle($("#modalWriteUpdateBtn").parent());
    hiddenClassToggle($("#modalWriteDeleteBtn").parent());
    $("#is_title").val("");
    $("#is_proposer").val("");
    $("#is_step").val("");
    $("#is_startDate").val("");
    $(".uploadArea").text("이미지를 업로드 하려면 클릭 하세요.");
    $("#uploadPicture").val("");
    //0번째로 불러온 카테고리를 기본값으로 준다.
    $("#cg_code").val($("#cg_code").get(0).children[0].value);
    console.log($("#cg_code").val());
  });

  // 국가표준에서 view를 호출하기 위해 게시물 클릭 시 이벤트
  $(".board-item").click(function() {
    const numTd = $(this).get(0);
    console.log(numTd.cells);
    const categoryValue = SelectTextToValue(numTd.cells[0].textContent);
    // 모달 창이 안보이는 상태라면 보이게끔 한다.
    hiddenClassToggle($(".modalBox_write"));
    //제목을 변경 해준다.
    $(".write-list > li > h1").text(numTd.cells[1].textContent + " 수정");
    //view값 셋팅
    $("#cg_code").val(categoryValue);
    $("#is_seqNo").val(numTd.cells[0].dataset.seqno);
    $("#is_picture").val(numTd.cells[0].dataset.picture);
    $(".uploadArea").html(
      "<img src='/display/displayFile?filePath=" +
        numTd.cells[0].dataset.picture +
        "' />"
    );
    $("#is_title").val(numTd.cells[1].textContent);
    $("#is_proposer").val(numTd.cells[2].textContent);
    $("#is_step").val(numTd.cells[3].textContent);
    $("#is_startDate").val(numTd.cells[4].textContent);
    //ccView 값 셋팅
    $("#cc_seqNo").val(numTd.cells[0].dataset.seqno);
    $("#cc_name").val(numTd.cells[1].textContent);
    $("#cc_institution").val(numTd.cells[2].textContent);
    $("#cc_incumbency").val(numTd.cells[3].textContent);
    $("#cc_startDate").val(numTd.cells[4].textContent);
    // View에선 등록이 필요 없으므로 숨겨준다.
    hiddenClassToggle($("#modalWriteSubmitBtn").parent());
    hiddenClassToggle($("#ccSubmitBtn").parent());
  });

  //페이지 버튼
  $(".pagination li a").on("click", function(event) {
    event.preventDefault();

    var targetPage = $(this).attr("href");

    var pageingForm = $("#PagingForm");
    pageingForm.find("[name='pageNum']").val(targetPage);
    pageingForm.attr("action", "/board/list.do").attr("method", "get");
    pageingForm.submit();
  });
  // 검색 버튼
  $("#submitBtn").click(function() {
    $("#searchForm").attr("method", "get");
    $("#searchForm").submit();
  });
  /**************** END list.html *******************/

  /******************* view.html *********************/

  //모달의 닫기 버튼과 모달창 밖을 클릭하면 모달창을 닫아준다.
  //이 함수는 view.html과 ccView.html이 같이 사용한다.
  $("#modalWriteCloseBtn, .modalBox_write_body").click(function() {
    const modalTitle = $(".write-list > li > h1").text();

    // 모달 창이 안보이게 한다.
    hiddenClassToggle($(".modalBox_write"));
    // 글쓰기 버튼 클릭시 숨긴 데이터를 바꿔주기 위한 if
    if (modalTitle === "국가표준 등록") {
      // 수정과 삭제를 기본값으로 돌려준다.
      hiddenClassToggle($("#modalWriteUpdateBtn").parent());
      hiddenClassToggle($("#modalWriteDeleteBtn").parent());
    } else if (modalTitle.substr(-2) === "수정") {
      // 등록버튼 클래스를 기본값으로
      hiddenClassToggle($("#modalWriteSubmitBtn").parent());
      hiddenClassToggle($("#ccSubmitBtn").parent());
    } else if (modalTitle === "의장단 등록") {
      // 등록버튼 클래스를 기본값으로
      hiddenClassToggle($("#ccUpdateBtn").parent());
      hiddenClassToggle($("#ccDeleteBtn").parent());
    }
  });

  // 국가표준에서 등록버튼 클릭 이벤트
  $("#modalWriteSubmitBtn").click(function() {
    $("#frm").attr("action", "/board/writeSave.do");
    $("#frm").attr("method", "post");
    $("#frm").submit();
  });
  // 국가표준 이미지 업로드시 이미지만 업로드 할 수 있도록 체크
  $("#uploadPicture").change(function(event) {
    const fileType = event.target.files[0].type;

    if (fileType.indexOf("image") > -1)
      $(".uploadArea").html(event.target.files[0].name);
    else {
      $("#uploadPicture").val("");
      alert("이미지만 업로드 가능합니다.");
    }
  });

  $("#modalWriteDeleteBtn").click(function() {
    if (
      confirm("삭제 이후에 데이터를 복구할 수 없습니다.\n삭제하시겠습니까?")
    ) {
      $("#frm").attr("action", "/board/isDelete.do");
      $("#frm").attr("method", "post");
      $("#frm").submit();
    }
  });
  $("#modalWriteUpdateBtn").click(function() {
    if (confirm("변경하신 내용으로 데이터를 수정하시겠습니까?")) {
      $("#frm").attr("action", "/board/isModify.do");
      $("#frm").attr("method", "post");
      $("#frm").submit();
    }
  });
  /**************** END view.html *******************/

  /******************* category.html *********************/

  // 카테고리 관리 클릭 이벤트
  $("#categoryBtn").click(function() {
    hiddenClassToggle($(".categoryBox"));
  });
  // 카테고리 관리 닫는 이벤트
  $(".categoryBox_body, #cgCloseBtn").click(function() {
    hiddenClassToggle($(".categoryBox"));
  });

  /**************** END category.html *******************/

  /******************* chairmanCorps.html *********************/

  // 글쓰기 클릭 이벤트
  $("#ccWriteBtn").click(function() {
    // 모달 창이 안보이는 상태라면 보이게끔 한다.
    hiddenClassToggle($(".modalBox_write"));
    //제목을 글쓰기로 해준다.
    $(".write-list > li > h1").text("의장단 등록");
    // 등록에선 수정과 삭제가 필요 없으므로 숨겨준다.
    hiddenClassToggle($("#ccUpdateBtn").parent());
    hiddenClassToggle($("#ccDeleteBtn").parent());
    $("#cc_name").val("");
    $("#cc_institution").val("");
    $("#cc_incumbency").val("");
    $("#cc_startDate").val("");
    //0번째로 불러온 카테고리를 기본값으로 준다.
    $("#cg_code").val($("#cg_code").get(0).children[0].value);
    console.log($("#cg_code").val());
  });

  //페이지 버튼
  $(".cc-pagination li a").on("click", function(event) {
    event.preventDefault();

    var targetPage = $(this).attr("href");

    var pageingForm = $("#PagingForm");
    pageingForm.find("[name='pageNum']").val(targetPage);
    pageingForm.attr("action", "/board/chairmanCorps.do").attr("method", "get");
    pageingForm.submit();
  });
  // 검색 버튼
  $("#cc-submitBtn").click(function() {
    $("#searchForm").attr("method", "get");
    $("#searchForm").submit();
  });

  /**************** END chairmanCorps.html *******************/

  /******************* ccView.html *********************/

  // 의장단 등록 버튼 클릭
  $("#ccSubmitBtn").click(function() {
    $("#ccForm").attr("action", "/board/chairmanCorpsInsert.do");
    $("#ccForm").attr("method", "post");
    $("#ccForm").submit();
  });

  $("#ccDeleteBtn").click(function() {
    if (
      confirm("삭제 이후에 데이터를 복구할 수 없습니다.\n삭제하시겠습니까?")
    ) {
      $("#ccForm").attr("action", "/board/ccDelete.do");
      $("#ccForm").attr("method", "post");
      $("#ccForm").submit();
    }
  });
  $("#ccUpdateBtn").click(function() {
    if (confirm("변경하신 내용으로 데이터를 수정하시겠습니까?")) {
      $("#ccForm").attr("action", "/board/ccModify.do");
      $("#ccForm").attr("method", "post");
      $("#ccForm").submit();
    }
  });

  /**************** END ccView.html *******************/
});
