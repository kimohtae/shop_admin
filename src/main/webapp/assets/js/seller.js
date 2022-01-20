// seller.js
$(function(){
    let uploaded_img = "";
    $("#img_upload").click(function(){
        if(uploaded_img != ""){
            $.ajax({
                url:"/image/seller/"+uploaded_img,
                type:"delete",
                success:function(msg){
                    console.log(msg)
                }
            })
        }
        let form = $("#profile_img_form");
        let formData = new FormData(form[0]);
        $.ajax({
            url:"/image/upload/seller",
            type:"post",
            data:formData,
            contentType:false,
            processData:false,
            success: function(r){
                console.log(r)
                $("#profile_img").attr("src", "/image/seller/"+r.image);
                uploaded_img = r.image;
            }
        })
    })

    $("#img_delete").click(function(){
        $("#profile_img").attr("src","/image/seller/default.jpg")
        $("#img_file").val("");
        $.ajax({
            url:"/image/seller/"+uploaded_img,
            type:"delete",
            success:function(msg){
                console.log(msg)
                uploaded_img="";
            }
        })
    })

    $("#search_btn").click(function(e){
        e.preventDefault();
        let keyword = $("#keyword").val();
        location.href="/account/seller?keyword="+keyword;
    })
    $("#keyword").keydown(function(e){
        if(e.keyCode==13){
            $("#search_btn").trigger("click");
        }
    })

    $("#save").click(function(){
        if(!confirm("등록하시겠습니까?"))return;
        
        if($("#si_pwd").val() != $("#si_pwd_confirm").val()){
            alert("비밀번호가 일치하지 않습니다. ")
            return;
        }
        
        if(uploaded_img=="" || uploaded_img==undefined || uploaded_img==null){
            uploaded_img = "default.jpg";
        }


        let data ={
            si_id : $("#si_id").val(),
            si_name : $("#si_name").val(),
            si_pwd : $("#si_pwd").val(),
            si_email : $("#si_email").val(),
            si_phone : $("#si_phone").val(),
            si_address : $("#si_address").val(),
            si_status : $("#si_status").val(),
            si_img_url:uploaded_img
        }
        $.ajax({
            url:"/seller/add",
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

    $(".modify").click(function(){
        let seq = $(this).attr("data-seq")
        $.ajax({
            url:"/seller/select_one?seq="+seq,
            type:"get",
            success:function(data){
                $("#si_id").val(data.si_id);
                $("#si_name").val(data.si_name);
                $("#si_pwd").val(data.si_pwd);
                $("#si_email").val(data.si_email);
                $("#si_phone").val(data.si_phone);
                $("#si_address").val(data.si_address);
                $("#si_status").val(data.si_status);
                $("#profile_img").attr("src","/image/seller/"+data.si_img_url);
            }
        })
    })
})