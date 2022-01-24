<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
    <%@include file="/WEB-INF/includes/header.jsp"%>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/css/product.css">
</head>
<body>
    <main>
        <h1>판매 제품 관리</h1>
        <div class="summary_area">
            <p>총 ${cnt} 물품</p>
            <div class="search_area">
                <div class="search_box">
                    <input type="text" id="keyword" value="${keyword}">
                    <a href="#" id="search_btn"><i class="fas fa-search"></i></a>
                </div>
                <button id="add_product"><i class="fas fa-plus-square"></i>물품 추가</button>
            </div>
        </div>
        <div class="product_list">
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>대표이미지</th>
                        <th>제품명</th>
                        <th>가격</th>
                        <th>할인율</th>
                        <th>적립율</th>
                        <th>등록일</th>
                        <th>재고</th>
                        <th>배송사</th>
                        <th>판매자</th>
                        <th>제조사</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach items="${list}" var="item">
                        <tr>
                            <td>${item.pi_seq}</td>
                            <td><img src="/image/product/${item.pii_img_url}" class="product_img"></td>
                            <td>${item.pi_name}</td>
                            <td>${item.pi_price}원</td>
                            <td>${item.pi_discount_rate}%</td>
                            <td>${item.pi_point_rate}%</td>
                            <td>
                                <fmt:formatDate value="${item.pi_release_date}" pattern="yyyy-MM-dd"/>
                            </td>
                            <td>${item.pi_stock}</td>
                            <td>${item.di_name}</td>
                            <td><span class="product_img" style="background-image: url('/image/seller/${item.si_img_url}')"></span></td>
                            <td>${item.mfi_name}</td>
                            <td>
                                <button class="detail" data-seq="${item.pi_seq}">상세정보</button>
                                <button class="delete" data-seq="${item.pi_seq}">삭제</button>
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
        
    </main>

</body>
</html>