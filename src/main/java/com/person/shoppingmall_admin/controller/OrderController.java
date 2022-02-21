package com.person.shoppingmall_admin.controller;

import javax.servlet.http.HttpSession;

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
    public String getOrderList(HttpSession session, Model model, @RequestParam @Nullable Integer offset, @RequestParam @Nullable String keyword){
        SellerVO seller = (SellerVO)session.getAttribute("login_seller");
        if(seller==null){
            return "redirect:/";
        }
        if(offset == null) offset=0;
        model.addAttribute("keyword",keyword);
        if(keyword==null || keyword==""){
            keyword = "%%";
        }else{
            keyword = "%"+keyword+"%";
        }

        int cnt = order_mapper.selectOrderCnt(seller.getSi_seq(),keyword);
        int page = cnt/10 + (cnt%10>0?1:0);

        model.addAttribute("cnt", cnt);
        model.addAttribute("page", page);
        model.addAttribute("offset", offset);
        model.addAttribute("order_list", order_mapper.selectOrderList(seller.getSi_seq(), offset, keyword));
        return "/order/list";
    }
}
