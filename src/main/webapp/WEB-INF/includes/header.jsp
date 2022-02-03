<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/reset.css">
    <link rel="stylesheet" href="/assets/css/header.css">
    
    <script src="/assets/plugins/jquery-3.4.1.min.js"></script>
    <script>
        if( '${adminuser}' == '' && '${login_seller}' == ''){
            alert("로그인 후 사용하실 수 있습니다.");
            location.href = "/";
        }
    </script>
    <title>Document</title>
</head>
<body>
    <header>
        <a href="#" id="logo">
            <img src="http://placehold.it/150x50">
        </a>
        <nav id="gnb">
            <a href="#" id="alarm">
                <img src="http://placehold.it/35x35" >
                <span class="new_badge"></span>
            </a>
            <a href="#" id="msg">
                <img src="http://placehold.it/35x35" >
                <span class="new_badge"></span>
            </a>
            <c:if test="${login_seller != null}">
                <div class="user_profile_img" 
                    style="display: inline-block; width: 35px; height: 35px; 
                    background-image: url(/image/seller/${login_seller.si_img_url});
                    border: 1px solid #ccc; border-radius: 50%; background-size: 100%; 
                    background-position: center; vertical-align: middle;
                    ">
                </div>
                <a href="#">
                    <span>${login_seller.si_name}(${login_seller.si_id})</span>
                </a>
                <a href="/logout">로그아웃</a>
            </c:if>
            <c:if test="${adminuser != null}">
                <a href="#">
                    <span>${adminuser.mi_name}(${adminuser.mi_email})</span>
                </a>
                <a href="/admin/logout">로그아웃</a>
            </c:if>
        </nav>
    </header>
    <%@include file="/WEB-INF/includes/left_menu.jsp"%>

</body>
</html>