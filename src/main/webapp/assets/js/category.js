// assets/js/category.js
$(function(){
    resetPopup();
    function resetPopup(){
        $(".category_select_area").html("");
        $.ajax({
            type:"get",
            url:"/category/get/root",
            success:function(list){
                $(".category_select_area").append('<select id="root_category"></select>');
                $("#root_category").append('<option value="0">카테고리 선택</option>')
                for(let i=0; i<list.length; i++){
                    let tag = '<option value="'+list[i].cate_seq+'">'+list[i].cate_name+'</option>';
                    $("#root_category").append(tag);
                }
                $("#root_category").change(function(){
                    let seq= $("#root_category option:selected").val();
                    $("#child_category_1").remove();
                    // $("#child_category_2").remove();
                    $.ajax({
                        url:"/category/get/child?parent_seq="+seq,
                        type:"get",
                        success:function(list){
                            if(list.length == 0) return;

                            $(".category_select_area").append('<select id="child_category_1"></select>');
                            $("#child_category_1").append('<option value="0">카테고리 선택</option>')
                            for(let i=0; i<list.length; i++){
                                let tag = '<option value="'+list[i].cate_seq+'">'+list[i].cate_name+'</option>';
                                $("#child_category_1").append(tag);
                            }

                            // $("#child_category_1").change(function(){
                            //     let seq= $("#child_category_1 option:selected").val();
                            //     $("#child_category_2").remove();
                            //     $.ajax({
                            //         url:"/category/get/child?parent_seq="+seq,
                            //         type:"get",
                            //         success:function(list){
                            //             if(list.length == 0) return;
                                    
                            //             $(".category_select_area").append('<select id="child_category_2"></select>');
                            //             $("#child_category_2").append('<option value="0">카테고리 선택</option>')
                            //             for(let i=0; i<list.length; i++){
                            //                 let tag = '<option value="'+list[i].cate_seq+'">'+list[i].cate_name+'</option>';
                            //                 $("#child_category_2").append(tag);
                            //             }
                            
                            //         }
                            //     })
                            // })
                        }
                    })
                })
            }
        })
    }

    $("#is_root").click(function(){
        let checked = $(this).prop("checked");
        $("#root_category").prop("disabled",checked);
        $("#child_category_1").prop("disabled",checked);
        // $("#child_category_2").prop("disabled",checked);
    })

    $("#save").click(function(){
        // if($("#child_category_2").length == 0){
        //     alert("소분류 없음")
        // }
        // if($("#child_category_2 option:selected").val() == 0){
        //     alert("소분류 선택되지 않음")
        // }
        let parent_seq = 0;
        if($("#is_root").prop("checked")){
            parent_seq = null;
        }
        else if($("#child_category_1 option:selected").val() > 0){
            parent_seq = $("#child_category_1 option:selected").val();
        }
        else if($("#root_category option:selected").val() > 0){
            parent_seq = $("#root_category option:selected").val();
        }
        else{
            parent_seq = null;
        }
        let name = $("#category_name").val();
        let data = {
            "cate_name":name,
            "cate_parent":parent_seq
        };

        $.ajax({
            url:"/category/add",
            type:"post",
            data:JSON.stringify(data),
            contentType:"application/json",
            success:function(msg){
                alert(msg);
                location.reload();
            }
        })
    })
})

