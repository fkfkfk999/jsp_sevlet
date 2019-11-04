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
        	<h1>메인페이지 입니다.</h1>
			<a href="<c:url value='/board/list.do'/>">게시판</a>
        </section>
    </main>
</body>
</html>