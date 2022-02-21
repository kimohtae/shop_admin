$(function(){
    $(".delivery_confirm").click(function(){
        let seq = $(this).attr("data-seq");
        $(".popup").css("display","block");
        $(".popup #save").attr("data-seq",seq);
    })
    $("#save").click(function(){
        if(!confirm("송장번호를 등록하시겠습니까?"))return;
        $(".popup").css("display","none");
        let number = $("#delivery_number").val();
        let seq = $("#save").attr("data-seq");
        $.ajax({
            url:"/api/order/delivery?seq="+seq+"&delivery_no="+number,
            type:"patch",
            success:function(r){
                alert(r);
                location.reload();
            }
        })
        $("#delivery_number").val("");
        
    })
    $("#cancel").click(function(){
        if(!confirm("송장번호를 등록을 취소하시겠습니까?"))return;
        $(".popup").css("display","none");
        $("#delivery_number").val("");
    })
})