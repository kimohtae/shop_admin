package com.person.shoppingmall_admin.controller;

import java.util.List;

import com.person.shoppingmall_admin.data.CategoryVO;
import com.person.shoppingmall_admin.mapper.CategoryMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CategoryController {
    @Autowired CategoryMapper mapper;

    @GetMapping("/manage/category")
    public String getManageCategory(@RequestParam @Nullable Integer offset, Model model){
        if(offset==null)offset=0;
        List<CategoryVO> list = mapper.selectCategories(offset);
        model.addAttribute("list", list);
        model.addAttribute("cnt", mapper.selectCategoryCnt());

        return "/manage/category";
    }
}