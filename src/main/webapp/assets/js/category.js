// assets/js/category.js
$(function(){
    $("#search_keyword").val(keyword);
    $(".category_types a").removeClass("current");
    if(type == 'root'){
        $(".category_types a").eq(1).addClass("current");
    }
    else if(type == 'child'){
        $(".category_types a").eq(2).addClass("current");
    }
    else{
        $(".category_types a").eq(0).addClass("current");
    }

    let active_index = offset/12;
    $(".pager_area a").eq(active_index).addClass("current");

    resetPopup();
    $(".modify_container").css("display","none")

    function resetPopup(){
        // $(".category_select_area").html("");
        $.ajax({
            type:"get",
            url:"/category/get/root",
            success:function(list){
                // $(".category_select_area").append('<select id="root_category"></select>');
                $("#root_category").html("");
                $("#root_category").append('<option value="0">카테고리 선택</option>')
                for(let i=0; i<list.length; i++){
                    let tag = '<option value="'+list[i].cate_seq+'">'+list[i].cate_name+'</option>';
                    $("#root_category").append(tag);
                }
            }
        })
    }
    $("#root_category").change(function(){
        let seq= $("#root_category option:selected").val();
        $("#child_category_1").html('<option value="0">카테고리 선택</option>');
        $.ajax({
            url:"/category/get/child?parent_seq="+seq,
            type:"get",
            success:function(list){
                if(list.length == 0) return;

                // $(".category_select_area").append('<select id="child_category_1"></select>');
                // $("#child_category_1").append('<option value="0">카테고리 선택</option>')
                for(let i=0; i<list.length; i++){
                    let tag = '<option value="'+list[i].cate_seq+'">'+list[i].cate_name+'</option>';
                    $("#child_category_1").append(tag);
                }
            }
        })
    })

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

    $(".category_delete").click(function(){
        if(!confirm("삭제하시겠습니까?\n하위 카테고리도 모두 삭제됩니다."))return;


        let seq = $(this).attr("data-seq");
        $.ajax({
            url:"/category/delete?seq="+seq,
            type:"delete",
            success:function(msg){
                alert(msg);
                location.reload();
            }
        })
    })

    $("#mod_cancel").click(function(){
        location.reload()
    })

    $(".category_modify").click(function(){
        let seq = $(this).attr("data-seq");

        $(".add_category_wrap").css("display","block");
        $(".popup_title span").html("수정");
        $("#save").css("display","none");
        $("#modify").css("display","inline-block");
        $("#modify").attr("data-seq",seq);

        $.ajax({
            url:"/category/select_one?seq="+seq,
            type:"get",
            success:function(r){
                $("#category_name").val(r.data.cate_name);
                if(r.parents.length==0){
                    $("#is_root").prop("checked",true);
                    $("#root_category").prop("disabled",true);
                    $("#child_category_1").prop("disabled",true);
                    $("#root_category").val(0).prop("selected",true);
                    $("#child_category_1").val(0).prop("selected",true);
                    return;
                }
                $("#is_root").prop("checked",false);
                $("#root_category").prop("disabled",false);
                $("#child_category_1").prop("disabled",false);
                
                if(r.parents.length==1){
                    $("#root_category").val(r.parents[0]).prop("selected",true);
                    $("#root_category").trigger("change");
                }
                if(r.parents.length==2){
                    $("#root_category").val(r.parents[1]).prop("selected",true);
                    let seq= $("#root_category option:selected").val();
                    $("#child_category_1").html('<option value="0">카테고리 선택</option>');
                    $.ajax({
                        url:"/category/get/child?parent_seq="+seq,
                        type:"get",
                        success:function(list){
                            if(list.length == 0) return;
                            for(let i=0; i<list.length; i++){
                                let tag = '<option value="'+list[i].cate_seq+'">'+list[i].cate_name+'</option>';
                                $("#child_category_1").append(tag);
                            }
                            $("#child_category_1").val(r.parents[0]).prop("selected",true);
                        }
                    })
                }
            }
        })
        
    })
    
    $("#modify").click(function(){
        let seq = $(this).attr("data-seq");
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
            "cate_seq":seq,
            "cate_name":name,
            "cate_parent":parent_seq
        };
        console.log(data)
        $.ajax({
            url:"/category/update",
            type:"patch",
            data:JSON.stringify(data),
            contentType:"application/json",
            success:function(msg){
                alert(msg)
                location.reload()
            }
        })
    })

    $("#add_category").click(function(){
        $(".add_category_wrap").css("display","block");
        $("#save").css("display","inline-block");
        $("#modify").css("display","none");
        $(".popup_title span").html("추가");
    })

    $("#cancel").click(function(){
        if(!confirm("취소하시겠습니까?\n편집된 내용은 저장되지 않습니다."))return;
        $(".add_category_wrap").css("display","")
    })

    $(".search_box a").click(function(e){
        e.preventDefault();
        let keyword = $("#search_keyword").val();
        location.href="/manage/category?keyword="+keyword+"&type="+type;
    })
    $(".category_types a").click(function(e){
        e.preventDefault();
        let dataType = $(this).attr("data-type");
        let keyword = $("#search_keyword").val();
        location.href="/manage/category?keyword="+keyword+"&type="+dataType;
    })
    $("#search_keyword").keydown(function(e){
        if(e.keyCode==13){
            $(".search_box a").trigger("click");
        }
    })

})

