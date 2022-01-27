package com.person.shoppingmall_admin.controller;


import com.person.shoppingmall_admin.mapper.CategoryMapper;
import com.person.shoppingmall_admin.mapper.ProductMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProductController {
    @Autowired ProductMapper mapper;
    @Autowired CategoryMapper cate_mapper;
    
    @GetMapping("/product/list")
    public String getProductList(
        @RequestParam @Nullable String keyword, 
        @RequestParam @Nullable Integer offset,
        Model model 
    ){
            model.addAttribute("keyword", keyword);
            if(keyword == null) keyword = "%%";
                else keyword = "%"+ keyword +"%";
            if(offset == null) offset=0;

            int cnt = mapper.selectProductCnt(keyword);
            int page = (cnt/10)+(cnt%10>0?1:0);

            model.addAttribute("offset", offset);
            model.addAttribute("cnt", cnt);
            model.addAttribute("page", page);
            model.addAttribute("list", mapper.selectProductList(keyword, offset));
            model.addAttribute("root_cate", cate_mapper.selectRootCategories());
            
            return "/product/list";
        }
}
