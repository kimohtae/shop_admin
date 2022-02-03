<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        if('${login_status}' != 'normal' && '${login_status}' != ''){
            alert("${login_msg}");
        }
    </script>
    <link rel="stylesheet" href="/assets/css/reset.css">
    <link rel="stylesheet" href="/assets/css/login.css">
    <script>
        if("${adminuser}" != '' || "${login_seller}" != ''){
            location.href = "/summary"
        }
    </script>
</head>
<body>
    <div class="login_form">
        <h1>관리자 로그인</h1>
        <p>Administrator Login</p>
        <form action="/admin/login" method="post">
            <p>Administrator Email</p>
            <input type="text" id="user_id" placeholder="이메일 (username@service.com)" name="user_id" autocomplete="none">
            <p>Password</p>
            <input type="password" id="user_pwd" placeholder="비밀번호" name="user_pwd" autocomplete="none">
            <button type="submit">로그인</button>
        </form>
        <p class="err_msg">${admin_msg}</p>
        <a href="/">판매자 로그인</a>
    </div>
</body>
</html>