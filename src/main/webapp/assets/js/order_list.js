$(function(){
    
    $(".accept, .change").click(function(){
        let seq = $(this).attr("data-seq");
        let pi_seq = $(this).attr("pi-seq");
        let cnt = $(this).attr("data-cnt");
        $(".popup_wrap").css("display","block");

        if($(this).attr("class")=="change"){
            $("#delivery_number").val($(this).attr("data-input"));
            cnt=0;
        }

        $("#yes").click(function(){
            let del_num = $("#delivery_number").val();
            $.ajax({
                url:"/api/order/accept?del_num="+del_num+"&seq="+seq+"&cnt="+cnt+"&pSeq="+pi_seq,
                type:"patch",
                success:function(r){
                    alert(r);
                    location.reload();
                }
            })
        })
    })

    $("#no").click(function(){
        location.reload();
    })

    $("#search_btn").click(function(){
        let keyword = $("#keyword").val();
        location.href="/order/list?keyword="+keyword;
    })
    $("#keyword").keydown(function(e){
        if(e.keyCode==13){
            $("#search_btn").trigger("click")
        }
    })
})