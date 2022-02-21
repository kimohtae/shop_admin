// recommend.js
$(function(){
    $(".recommend_btn").click(function(){
        let seq = $(this).attr("data-seq");
        if($(this).hasClass("active")){
            $.ajax({
                url:"/product/recommend?seq="+seq,
                type:"delete",
                success:function(r){
                    console.log(r);
                }
            })
            $(this).removeClass("active");
        }else{
            $.ajax({
                url:"/product/recommend?seq="+seq,
                type:"put",
                success:function(r){
                    console.log(r);
                }
            })
            $(this).addClass("active");
        }
    })
})