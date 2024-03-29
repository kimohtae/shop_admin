package com.person.shoppingmall_admin.controller;

import com.person.shoppingmall_admin.mapper.ManufacturerMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ManufacturerController {
    @Autowired ManufacturerMapper mapper;

    @GetMapping("/manage/manufacturer")
    public String getManageManufactuerer(
        @RequestParam @Nullable Integer offset, @RequestParam @Nullable String keyword, Model model
    ) {
        model.addAttribute("keyword", keyword);

        if(offset == null) offset = 0;
        if(keyword == null) keyword = "%%";
        else keyword = "%"+keyword+"%";

        model.addAttribute("offset", offset);

        Integer cnt = mapper.selectManufacturerCnt(keyword);

        model.addAttribute("list", mapper.selectManufacturerList( offset, keyword, 20));
        model.addAttribute("cnt", cnt);

        Integer page = (cnt / 20) + (cnt % 20 > 0 ? 1 : 0);
        model.addAttribute("page", page);
        model.addAttribute("menu1", "manage");
        model.addAttribute("menu2", "manufacturer");
        return "/manage/manufacturer";
    }


}
