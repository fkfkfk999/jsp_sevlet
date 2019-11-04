<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/views/include/head.jsp"/>
<title>테스트보드</title>
</head>
<body>
<jsp:include page="/views/include/header.jsp"/>
    <main class="g-contents">
        <!-- 메뉴바 부분 -->
        <jsp:include page="/views/include/nav.jsp"/>
        <section class="main-contents">
      		<h3>총 데이터 수 : ${allCount}</h3>
      		<article class="board-table-box">
		      <table class="board-table">
		          <colgroup>
		              <col width="10%">
		              <col width="*">
		              <col width="20%">
		              <col width="15%">
		          </colgroup>
		          <tr>
		          	  <th>No</th>
		              <th>제목</th>
		              <th>글쓴이</th>
		              <th>등록 날짜</th>
		          </tr>
		          <c:forEach var="boardVO" items="${result}">
		          	<tr class="board-item">
		          		<td>${boardVO.seqno}</td>
		          		<td>${boardVO.title}</td>
		          		<td>${boardVO.writer}</td>
		          		<td>${boardVO.regdate}</td>
		          	</tr>
		          </c:forEach>
		      </table>
			</article>
        </section>
    </main>
</body>
</html>