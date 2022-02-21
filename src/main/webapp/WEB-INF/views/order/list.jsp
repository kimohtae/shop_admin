<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
    <%@include file="/WEB-INF/includes/header.jsp"%>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="/assets/js/order_list.js"></script>
    <script>
    </script>
</head>
<body>
    <main>
        ${order_list.size()}
        
        <div class="summary_area">
            <div class="summary">
                <h2>총 주문 제품 수 : ${cnt}개</h2>
                <p>페이지 : <span id="current_page">1</span> / ${page}</p>
            </div>
            <div class="search_area">
                <div class="search_box">
                    <input type="text" id="keyword" value="${keyword}">
                    <button id="search_btn">검색</button>
                </div>
                <button id="add_product" class="add_btn">
                    <i class="fas fa-plus-square"></i>제품 추가
                </button>
            </div>
        </div>
        <div class="order_list_area">
            <table>
                <c:if test="${order_list.size()!=0}">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제품명</th>
                        <th>주문량/재고량</th>
                        <th>받는사람</th>
                        <th>배송주소</th>
                        <th>전화번호</th>
                        <th>요청사항</th>
                        <th>송장번호</th>
                        <th>주문상태</th>
                        <th>배송상태</th>
                        <th>등록일</th>
                        <th>수정일</th>
                        <th></th>
                    </tr>
                </thead>
                </c:if>
                <c:if test="${order_list.size()==0}">
                    <tr>
                        <td colspan="13">주문이 들어온 제품이 없습니다.</td>
                    </tr>
                </c:if>
                <tbody>
                    <c:forEach items="${order_list}" var="item">
                        <tr>
                            <td>${item.oi_seq}</td>
                            <td><a href="http://localhost:8757/product/detail?index=${item.oi_pi_seq}" target="blanked">[${item.mfi_name}]${item.pi_name}</a></td>
                            <td>${item.oi_count} / ${item.pi_stock}</td>
                            <td>${item.oi_shipping_name}</td> 
                            <td>${item.oi_shipping_address}</td> 
                            <td>${item.oi_shipping_phone}</td> 
                            <td>${item.oi_shipping_request}</td> 
                            <td>${item.oi_delivery_number}</td> 
                            <td>
                                <c:if test="${item.oi_status==0}"><span>정상</span></c:if>
                                <c:if test="${item.oi_status==1}"><span>반품</span></c:if>
                                <c:if test="${item.oi_status==2}"><span>교환</span></c:if>
                            </td> 
                            <td>
                                <c:if test="${item.oi_delivery_status==0}"><span>배송전</span></c:if>
                                <c:if test="${item.oi_delivery_status==1}"><span>배송중</span></c:if>
                                <c:if test="${item.oi_delivery_status==2}"><span>배송완료</span></c:if>
                            </td> 
                            <td>
                                <fmt:formatDate value="${item.oi_reg_dt}" pattern="yyyy-MM-dd HH:mm:ss"/>
                            </td> 
                            <td>
                                <fmt:formatDate value="${item.oi_mod_dt}" pattern="yyyy-MM-dd HH:mm:ss"/>
                            </td> 
                            <td>
                                <c:if test="${item.oi_delivery_status==0}">
                                    <button class="accept" data-seq="${item.oi_seq}" pi-seq="${item.oi_pi_seq}" data-cnt="${item.oi_count}">수락</button>
                                </c:if>
                                <c:if test="${item.oi_delivery_status==2}">
                                    <button class="change" data-seq="${item.oi_seq}" pi-seq="${item.oi_pi_seq}" data-cnt="${item.oi_count}" data-input="${item.oi_delivery_number}">변경</button>
                                </c:if>
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>

        <div class="pager_area">
            <c:forEach begin="1" end="${page}" var="i">
                <a href="/order/list?offset=${(i-1)*10}&keyword=${keyword}" class="pager">${i}</a>
            </c:forEach>
        </div>

        <div class="popup_wrap" style="display: none;">
            <div class="popup_box">
                <input type="text" id="delivery_number" placeholder="송장번호를 입력해 주세요">
                <button id="yes">확인</button>
                <button id="no">취소</button>
            </div>
        </div>
    </main>
</body>
</html>