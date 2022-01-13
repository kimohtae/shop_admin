<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
    <%@include file="/WEB-INF/includes/header.jsp"%>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <main>
        <h1>카테고리 관리</h1>
        <div class="summary">
            <div class="summary_item">
                <img src="http://placehold.it/35x35">
                <div class="summary_item_text">
                    <p class="item_title">등록 카테고리 수</p>
                    <p><span class="count">123</span>개</p>
                </div>
            </div>
        </div>

        <div class="category_list">

        </div>

${list}
        <div class="add_category_wrap">
            <div class="add_category_popup">
                <div class="category_select_area">
                    <select id="upper_category">
                        <option value="0">선택안함</option>
                        <option value="1">전자기기</option>
                        <option value="2">식품</option>
                    </select>
                </div>
                <div class="category_content">
                    <input type="text" placeholder="카테고리명 입력">
                    <button id="save">저장</button>
                    <button id="cancel">취소</button>
                </div>
            </div>
        </div>
    </main>
</body>
</html>