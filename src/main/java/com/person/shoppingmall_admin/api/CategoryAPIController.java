package com.person.shoppingmall_admin.api;

import java.util.List;

import com.person.shoppingmall_admin.data.CategoryVO;
import com.person.shoppingmall_admin.mapper.CategoryMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryAPIController {
    @Autowired CategoryMapper mapper;

    @GetMapping("/category/get/{type}")
    public List<CategoryVO> getCategoryList(@PathVariable String type, @RequestParam @Nullable Integer parent_seq){
        if(type.equals("root"))
            return mapper.selectRootCategories();
        if(type.equals("child") && parent_seq != null)
            return mapper.selectChildCategories(parent_seq); 
        return null;
    }

    @PostMapping("/category/add")
    public String insertCategory(@RequestBody CategoryVO data){
        mapper.insertCategory(data);
        return "카테고리가 추가되었습니다.";
    }
}
