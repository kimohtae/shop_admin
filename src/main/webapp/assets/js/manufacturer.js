// manufacturer.js

$(function(){

    $(".pager_area a").eq(offset/24).css("font-weight","700").css("color","#000")

    $("#search_btn").click(function(e){
        e.preventDefault();
        let keyword = $("#keyword").val();
        location.href="/manage/manufacturer?keyword="+keyword;
    })
    $("#add_manufacturer").click(function(){
        $(".manufacturer_popup_wrap").css("display","block");
        $(".manufacturer_popup h2 span").html("추가")
        $("#save").css("display","inline-block");
        $("#update").css("display","none");
        $("#mfi_name").val("");
        $("#mfi_phone").val("");
        $("#mfi_email").val("");
    })
    $(".modify").click(function(){
        $(".manufacturer_popup_wrap").css("display","block");
        $(".manufacturer_popup h2 span").html("수정")
        $("#save").css("display","none");
        $("#update").css("display","inline-block");

        let seq = $(this).attr("data-seq");
        $("#update").attr("data-seq",seq);
        
        $.ajax({
            url:"/manufacturer/select_one?seq="+seq,
            type:"get",
            success:function(data){
                $("#mfi_name").val(data.mfi_name);
                $("#mfi_phone").val(data.mfi_phone);
                $("#mfi_email").val(data.mfi_email);
            }
        })
    })
    $(".delete").click(function(){
        if(!confirm("삭제하시겠습니까?\n이 동작은 취소할 수 없습니다."))return;
        let seq = $(this).attr("data-seq");
        $.ajax({
            url:"/manufacturer/delete?seq="+seq,
            type:"delete",
            success:function(msg){
                alert(msg);
                location.reload();
            }
        })
    })
    $("#save").click(function(){
        if(!confirm("추가하시겠습니까?"))return;
        let data={
            mfi_name:$("#mfi_name").val(),
            mfi_phone:$("#mfi_phone").val(),
            mfi_email:$("#mfi_email").val()
        }
        
        $.ajax({
            url:"/manufacturer/add",
            type:"post",
            data:JSON.stringify(data),
            contentType:"application/json",
            success:function(msg){
                alert(msg);
                location.reload();
            }
        })
    })
    $("#update").click(function(){
        if(!confirm("수정하시겠습니까?\n이 동작은 취소할 수 없습니다."))return;
        let data={
            mfi_seq:$(this).attr("data-seq"),
            mfi_name:$("#mfi_name").val(),
            mfi_phone:$("#mfi_phone").val(),
            mfi_email:$("#mfi_email").val()
        }
        $.ajax({
            url:"/manufacturer/update",
            type:"patch",
            data:JSON.stringify(data),
            contentType:"application/json",
            success:function(msg){
                alert(msg);
                location.reload();
            }
        }) 
    })
    $("#cancel").click(function(){
        if(!confirm("취소하시겠습니까?\n 입력된 정보는 저장되지 않습니다."))return;
        $(".manufacturer_popup_wrap").css("display","none");
    })
})