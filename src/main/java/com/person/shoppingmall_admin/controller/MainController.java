package com.person.shoppingmall_admin.controller;

import javax.servlet.http.HttpSession;

import com.person.shoppingmall_admin.data.LoginVO;
import com.person.shoppingmall_admin.data.MemberVO;
import com.person.shoppingmall_admin.data.SellerVO;
import com.person.shoppingmall_admin.mapper.MemberMapper;
import com.person.shoppingmall_admin.mapper.SellerMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MainController {
    @Autowired SellerMapper seller_mapper;
    @Autowired MemberMapper member_mapper;

    @GetMapping("/")
    public String getMain(HttpSession session){
        Boolean try_login = (Boolean)session.getAttribute("try_login");
        if(try_login == null || try_login == false){
            session.setAttribute("login_status",null);
            session.setAttribute("login_msg",null);
        }
        session.setAttribute("try_login", false);
        return "/index";
    }

    @PostMapping("/login")
    public String getLogin(LoginVO data, HttpSession session)throws Exception{
        session.setAttribute("try_login", true);

        SellerVO seller = seller_mapper.LoginSeller(data);

        if(seller != null){
            if(seller.getSi_status() == 2){
                session.setAttribute("login_status","stopped");
                session.setAttribute("login_msg","사용 정지된 계정입니다. 관리자에게 문의하세요.");
                return "redirect:/";
            }
            if(seller.getSi_status() == 3){
                session.setAttribute("login_status","blocked");
                session.setAttribute("login_msg","영구 정지된 계정입니다.(사유 : 인가되지 않은 상품 판매)");
                return "redirect:/";
            }
            session.setAttribute("login_seller", seller);
            session.setAttribute("login_status", "normal");
            return "redirect:/summary";
        }
        session.setAttribute("login_status", "failed");
        session.setAttribute("login_msg", "아이디 또는 비밀번호 오류입니다.");
        return "redirect:/";
    }

    @GetMapping("/logout")
    public String getLogout(HttpSession session){
        session.invalidate();
        return "redirect:/";
    }

    @GetMapping("/admin")
    public String getAdmin(HttpSession session){
        Boolean try_login = (Boolean)session.getAttribute("try_admin_login");
        if(try_login == null || try_login == false){
            session.setAttribute("admin_status",null);
            session.setAttribute("admin_msg",null);
        }
        session.setAttribute("try_admin_login", false);
        return "/admin/login";
    }
    
    @PostMapping("/admin/login")
    public String postAdminLogin(LoginVO admin, HttpSession session){
        session.setAttribute("try_admin_login", true);

        System.out.println(admin.getUser_id());
        System.out.println(admin.getUser_pwd());
        MemberVO member = member_mapper.memberLogin(admin);
        if(member != null){
            if(member.getMi_role() == 1){
                session.setAttribute("admin_status", "failed");
                session.setAttribute("admin_msg", "관리자 전용 로그인 입니다.");
                return "redirect:/admin";
            }
            session.setAttribute("adminuser", member);
            session.setAttribute("admin_status", "success");
            session.setAttribute("admin_msg", null);
            return "redirect:/summary";
        }
        session.setAttribute("admin_status", "failed");
        session.setAttribute("admin_msg", "아이디 또는 비밀번호 오류입니다.");
        return "redirect:/admin";
    }

    @GetMapping("/admin/logout")
    public String getAdminLogout(HttpSession session){
        session.invalidate();
        return "redirect:/admin";
    }
}
