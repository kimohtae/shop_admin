package com.person.shoppingmall_admin.controller;


import javax.servlet.http.HttpSession;

import com.person.shoppingmall_admin.data.MemberVO;
import com.person.shoppingmall_admin.data.SellerVO;
import com.person.shoppingmall_admin.mapper.OrderMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/order")
public class OrderController {
    @Autowired OrderMapper order_mapper;

    @GetMapping("/list")
    public String getOrderList(
            Model model,
            HttpSession session,
            @RequestParam @Nullable Integer offset
        ){
            SellerVO login_seller = (SellerVO)session.getAttribute("login_seller");
            MemberVO admin = (MemberVO)session.getAttribute("adminuser");
            if(login_seller == null && admin == null){
                return "redirect:/";
            }
            int seq = 0;
            if(login_seller != null){
                seq = login_seller.getSi_seq();
            }

            if(offset==null)offset=0;
            
            Integer cnt = order_mapper.selectOrderManageInfoCount(seq);
            Integer page = (cnt/10) + (cnt%10>0 ? 1: 0);

            model.addAttribute("list", order_mapper.selectOrderManageInfo(seq, offset));
            model.addAttribute("page",page);
            model.addAttribute("offset",offset);
            
            return "/order/list";
    }
}
