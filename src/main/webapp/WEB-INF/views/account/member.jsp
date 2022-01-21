<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
    <%@include file="/WEB-INF/includes/header.jsp"%>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="/assets/js/member.js"></script>
    <link rel="stylesheet" href="/assets/css/member.css">
</head>
<body>
    <main>
        <h1>멤버 관리</h1>
        <div class="summary_area">
            <p>총 ${cnt} 멤버</p>
            <div class="search_area">
                <div class="search_box">
                    <input type="text" id="keyword" value="${keyword}">
                    <a href="#" id="search_btn"><i class="fas fa-search"></i></a>
                </div>
                <button id="add_member"><i class="fas fa-plus-square"></i>멤버 추가</button>
            </div>
        </div>
        <div class="member_list">
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이메일</th>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>전화번호</th>
                        <th>주소</th>
                        <th>성별</th>
                        <th>상태</th>
                        <th>등급</th>
                        <th>등록일</th>
                        <th>탈퇴일</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach items="${list}" var="item">
                        <tr>
                            <td>${item.mi_seq}</td>
                            <td>${item.mi_email}</td>
                            <td>${item.mi_name}</td>
                            <td>${item.mi_birth}</td>
                            <td>${item.mi_phone}</td>
                            <td>${item.mi_address}</td>
                            <td>
                                <c:if test="${item.mi_gen==0}">여자</c:if>
                                <c:if test="${item.mi_gen==1}">남자</c:if>
                            </td>
                            <td>
                                <c:if test="${item.mi_status==1}">정상</c:if>
                                <c:if test="${item.mi_status==2}">중지</c:if>
                                <c:if test="${item.mi_status==3}">탈퇴대기</c:if>
                                <c:if test="${item.mi_status==4}">탈퇴</c:if>
                            </td>
                            <td>
                                <c:if test="${item.mi_grade==1}">일반</c:if>
                                <c:if test="${item.mi_grade==2}">우수</c:if>
                                <c:if test="${item.mi_grade==3}">VIP</c:if>
                                <c:if test="${item.mi_grade==4}">VVIP</c:if>
                            </td>
                            <td>
                                <fmt:formatDate value="${item.mi_reg_dt}" pattern="yyyy-MM-dd"/>
                            </td>
                            <td>
                                <fmt:formatDate value="${item.mi_leave_dt}" pattern="yyyy-MM-dd"/>
                            </td>
                            <td>
                                <button class="modify" data-seq="${item.mi_seq}"><i class="fas fa-edit"></i></button>
                                <button class="delete" data-seq="${item.mi_seq}"><i class="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
        <div class="popup_wrap">
            <div class="popup">
                <h2>멤버 <span>추가</span></h2>
                <div class="member_info">
                    <div class="member_basic_info">
                        <input type="text" id="mi_email" placeholder="이메일">
                        <input type="password" id="mi_pwd" placeholder="비밀번호">
                        <input type="password" id="mi_pwd_confirm" placeholder="비밀번호 확인">
                        <input type="text" id="mi_name" placeholder="이름">
                        <input type="text" id="mi_birth" placeholder="생년월일 ex)20120503">
                        <input type="text" id="mi_phone" placeholder="전화번호  '-' 제외">
                    </div>
                    <div class="member_additional_info">
                        <textarea type="text" id="mi_address" placeholder="주소"></textarea>
                        <select id="mi_gen">
                            <option value="0">여자</option>
                            <option value="1">남자</option>
                        </select>
                        <select id="mi_status">
                            <option value="1">정상</option>
                            <option value="2">중지</option>
                            <option value="3">탈퇴대기</option>
                            <option value="4">탈퇴</option>
                        </select>
                        <select id="mi_grade">
                            <option value="1">일반</option>
                            <option value="2">우수</option>
                            <option value="3">VIP</option>
                            <option value="4">VVIP</option>
                        </select>
                    </div>
                </div>
                <div class="btns">
                    <button id="save">저장</button>
                    <button id="update">수정</button>
                    <button id="cancel">취소</button>
                </div>
            </div>
        </div>
        <div class="pager_area">
            <c:forEach begin="1" end="${page}" var="i">
                <a href="/account/member?keyword=${keyword}%offset=${offset}">${i}</a>
            </c:forEach>
        </div>
    </main>

</body>
</html>