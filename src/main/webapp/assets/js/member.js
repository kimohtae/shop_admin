// member.js
$(function(){
    $("#search_btn").click(function(e){
        e.preventDefault();
        let keyword = $("#keyword").val();
        location.href="/account/member?keyword="+keyword;
    })
    $("#keyword").keydown(function(e){
        if(e.keyCode==13){
            $("#search_btn").trigger("click")
        }
    })

    $("#save").click(function(){
        if(!confirm("등록하시겠습니까?"))return;
        if($("#mi_pwd").val() != $("#mi_pwd_confirm").val()){
            alert("비밀번호가 일치하지 않습니다.")
            return;
        }
        let data = {
            mi_email:$("#mi_email").val(),
            mi_pwd:$("#mi_pwd").val(),
            mi_name:$("#mi_name").val(),
            mi_birth:$("#mi_birth").val(),
            mi_phone:$("#mi_phone").val(),
            mi_address:$("#mi_address").val(),
            mi_gen:$("#mi_gen").val(),
            mi_status:$("#mi_status").val(),
            mi_grade:$("#mi_grade").val()
        }
        $.ajax({
            url:"/member/add",
            type:"post",
            data:JSON.stringify(data),
            contentType:"application/json",
            success:function(msg){
                alert(msg.message);
                if(msg.status){
                    location.reload();
                }
            }
        })
    })

    $("#update").click(function(){
        if(!confirm("수정하시겠습니까?"))return;
        
        let data = {
            mi_email:$("#mi_email").val(),
            mi_name:$("#mi_name").val(),
            mi_birth:$("#mi_birth").val(),
            mi_phone:$("#mi_phone").val(),
            mi_address:$("#mi_address").val(),
            mi_gen:$("#mi_gen").val(),
            mi_status:$("#mi_status").val(),
            mi_grade:$("#mi_grade").val()
        }
        $.ajax({
            url:"/member/update",
            type:"patch",
            data:JSON.stringify(data),
            contentType:"application/json",
            success:function(msg){
                alert(msg);
                location.reload();
            }
        })
    })
    
    $(".delete").click(function(){
        let seq = $(this).attr("data-seq");
        $.ajax({
            url:"/member/delete?seq="+seq,
            type:"delete",
            success:function(){
                alert("멤버 정보가 삭제되었습니다.")
                location.reload();
            }
        })
    })
    
    
    $("#add_member").click(function(){
        $(".popup_wrap").css("display","block");
        $(".popup h2 span").html("추가")
        $("#save").css("display","inline-block");
        $("#update").css("display","none");
    })

    $(".modify").click(function(){
        let seq = $(this).attr("data-seq");
        $("#save").attr("data-seq",seq);

        $(".popup_wrap").css("display","block");
        $(".popup h2 span").html("수정")
        $("#save").css("display","none");
        $("#update").css("display","inline-block");

        $.ajax({
            url:"/member/select_one?seq="+seq,
            type:"get",
            success:function(data){
                $("#mi_email").val(data.mi_email).prop("disabled",true);
                $("#mi_pwd").val("******").prop("disabled",true);
                $("#mi_pwd_confirm").val("******").prop("disabled",true);
                $("#mi_name").val(data.mi_name);
                $("#mi_birth").val(data.mi_birth);
                $("#mi_phone").val(data.mi_phone);
                $("#mi_address").val(data.mi_address);
                $("#mi_gen").val(data.mi_gen);
                $("#mi_status").val(data.mi_status);
                $("#mi_grade").val(data.mi_grade);
            }
        })
    })

    $("#cancel").click(function(){
        if(!confirm("취소하시겠습니까?\n입력한 정보는 저장되지 않습니다."))return;
        $(".popup_wrap").css("display","none");
        $("#mi_email").val("").prop("disabled",false);
        $("#mi_pwd").val("").prop("disabled",false);
        $("#mi_pwd_confirm").val("").prop("disabled",false);
        $("#mi_name").val("");
        $("#mi_birth").val("");
        $("#mi_phone").val("");
        $("#mi_address").val("");
        $("#mi_gen").val(0);
        $("#mi_status").val(1);
        $("#mi_grade").val(1);
    })
})