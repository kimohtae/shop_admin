$(function(){
    $("#keyword").val(keyword)
    $("#search_type").val(search_type);

    $(".align_type #align_" + align_type).css({
        "background-color":"orangered", "color":"white"
    })
    $(".blind_status #" + review_status).css({
        "background-color":"orangered", "color":"white"
    })

    $("#align_report, #align_date, #align_default").click(function(){
        let align_type = $(this).attr("data-align");
        location.href = "/product/review?align_type="+align_type+"&review_status="+review_status+"&keyword="+keyword+"&search_type="+search_type;
    })
    $(".blind_status button").click(function(){
        review_status = $(this).attr("data-blind");
        location.href = "/product/review?align_type="+align_type+"&review_status="+review_status+"&keyword="+keyword+"&search_type="+search_type;
    })
    $("#search_btn").click(function(){
        keyword = $("#keyword").val();
        search_type = $("#search_type").val();
        location.href = "/product/review?align_type="+align_type+"&review_status="+review_status+"&keyword="+keyword+"&search_type="+search_type;
    })
    $("#keyword").keydown(function(e){
        if(e.keyCode==13){
            $("#search_btn").trigger("click");
        }
    })
    $(".status_btn").click(function(){
        let seq = $(this).attr("data-seq");
        let status = $(this).attr("data-status");
        $.ajax({
            url:"/product/update/review/status?seq="+seq+"&status="+status,
            type:"patch",
            success:function(msg){
                alert(msg);
                location.reload();
            }
        })
    })
})