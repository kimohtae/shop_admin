package com.person.shoppingmall_admin.controller;

import com.person.shoppingmall_admin.mapper.MemberMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MemberController {
    @Autowired MemberMapper mapper;
    @GetMapping("/account/member")
    public String getAccountMember(
        @RequestParam @Nullable String keyword, 
        @RequestParam @Nullable String type, 
        @RequestParam @Nullable Integer offset,
        Model model
    ) {
        model.addAttribute("keyword", keyword);
        if(keyword == null) keyword = "%%";
        else keyword = "%"+keyword+"%";

        if(offset == null) offset = 0;

        model.addAttribute("type", type);
        model.addAttribute("offset", offset);

        model.addAttribute("list", mapper.selectMemberList(keyword, type, offset));
        Integer cnt = mapper.selectMemberCnt(keyword, type);
        Integer page = (cnt / 10) + (cnt%10 > 0 ? 1 : 0);
        model.addAttribute("cnt", cnt);
        model.addAttribute("page", page);
        model.addAttribute("menu1", "account");
        model.addAttribute("menu2", "member");
        return "/account/member";
    }
}
