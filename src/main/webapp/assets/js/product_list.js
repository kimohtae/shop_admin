// product_list.js
$(function(){
    $("#root_cate").change(function(){
        let seq = $(this).val();
        $("#small_cate").html('<option value="0">소분류 선택</option>')
        $("#small_cate").prop("disabled",true);
        $.ajax({
            url:"/category/get/child?parent_seq="+seq,
            type:"get",
            success:function(r){
                $("#mid_cate").html('<option value="0">중분류 선택</option>')

                if(r.length > 0){
                    $("#mid_cate").prop("disabled",false);
                    for(let i=0; i<r.length; i++){
                        let tag = '<option value="'+r[i].cate_seq+'">'+r[i].cate_name+'</option>';
                        $("#mid_cate").append(tag);
                    }
                }else{
                    $("#mid_cate").prop("disabled",true);
                }
            }
        })
    })
    $("#mid_cate").change(function(){
        let seq = $(this).val();
        $.ajax({
            url:"/category/get/child?parent_seq="+seq,
            type:"get",
            success:function(r){
                $("#small_cate").html('<option value="0">소분류 선택</option>')

                if(r.length > 0){
                    $("#small_cate").prop("disabled",false);
                    for(let i=0; i<r.length; i++){
                        let tag = '<option value="'+r[i].cate_seq+'">'+r[i].cate_name+'</option>';
                        $("#small_cate").append(tag);
                    }
                }else{
                    $("#small_cate").prop("disabled",true);
                }
            }
        })
    })
    let delivery_keyword = "";
    let delivery_seq = 0;
    let delivery_name = "";
    $("#pi_delivery").click(function(){
        $.ajax({
            url:"/delivery/list?keyword="+delivery_keyword,
            type:"get",
            success:function(data){
                $(".delivery_list tbody").html("");
                for(let i=0; i<data.length; i++){
                    let tag = 
                    '<tr>' +
                        '<td>'+data[i].di_name+'</td>' +
                        '<td>'+data[i].di_price+'원</td>' +
                        '<td>' +
                            '<button class="delivery_select" data-seq="'+data[i].di_seq+'" data-name="'+data[i].di_name+'">선택</button>' +
                        '</td>' +
                    '</tr>'
                    $(".delivery_list tbody").append(tag)
                    
                }
                $(".delivery_select").click(function(){
                    delivery_seq = $(this).attr("data-seq");
                    delivery_name = $(this).attr("data-name");
                    $(".delivery_list tr").css("background-color","")
                    $(this).parent().parent().css("background-color","yellow")
                })
            }
        })
    })
    $("#delivery_search_btn").click(function(){
        delivery_keyword = $("#delivery_keyword").val();
        $("#pi_delivery").trigger("click");
    })
    $("#delivery_keyword").keydown(function(e){
        if(e.keyCode==13){
            $("#delivery_search_btn").trigger("click");
        }
    })
    $("#delivery_save").click(function(){
        $("#pi_delivery").attr("di-seq",delivery_seq);
        $("#pi_delivery").val(delivery_name);
        $(".delivery_list tr").css("background-color","")
    })
    $("#delivery_cancel").click(function(){
        delivery_seq = 0;
        delivery_name = "";
        $(".delivery_list tr").css("background-color","")
    })

    let manufacturer_keyword = "";
    let manufacturer_seq = 0;
    let manufacturer_name = "";
    $("#pi_manufacturer").click(function(){
        $.ajax({
            url:"/manufacturer/list?keyword="+manufacturer_keyword,
            type:"get",
            success:function(r){
                $(".mf_pager_area").html("");
                for(let i=0; i<r.page; i++){
                    let tag = 
                    '<button class="mf_pager" data-offset="'+(i*24)+'">'+(i+1)+'</button>';
                    $(".mf_pager_area").append(tag);
                }
                
                $(".manufacturer_list tbody").html("");
                for(let i=0; i<r.list.length; i++){
                    let tag =
                    '<tr>' +
                        '<td>'+r.list[i].mfi_name+'</td>'+
                        '<td>'+r.list[i].mfi_phone+'</td>'+
                        '<td>'+r.list[i].mfi_email+'</td>'+
                        '<td>' +
                        '<button class="manufacturer_select" data-seq="'+r.list[i].mfi_seq+'" data-name="'+r.list[i].mfi_name+'">선택</button>'+
                        '</td>'+
                    '</tr>'
                    $(".manufacturer_list tbody").append(tag);
                }
                $(".manufacturer_select").click(function(){
                    manufacturer_seq = $(this).attr("data-seq")
                    manufacturer_name = $(this).attr("data-name")
                    $(".manufacturer_list tr").css("background-color","");
                    $(this).parent().parent().css("background-color","yellow");
                })
            }
        })
    })
    $("#manufacturer_search_btn").click(function(){
        manufacturer_keyword=$("#manufacturer_keyword").val();
        $("#pi_manufacturer").trigger("click");
    })
    $("#manufacturer_keyword").keydown(function(e){
        if(e.keyCode==13){
            $("#manufacturer_search_btn").trigger("click");
        }
    })
    $("#manufacturer_save").click(function(){
        $("#pi_manufacturer").val(manufacturer_name);
        $("#pi_manufacturer").attr("data-seq",manufacturer_seq);
        $(".manufacturer_list tr").css("background-color","");
    })
    $("#manufacturer_cancel").click(function(){
        manufacturer_seq = 0;
        manufacturer_name = "";
        $(".manufacturer_list tr").css("background-color","");
    })
})