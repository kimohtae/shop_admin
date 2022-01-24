package com.person.shoppingmall_admin.api;

import java.util.LinkedHashMap;
import java.util.Map;

import com.person.shoppingmall_admin.data.MemberVO;
import com.person.shoppingmall_admin.mapper.MemberMapper;
import com.person.shoppingmall_admin.util.AESAlgorithm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
public class MemberAPIController {
    @Autowired MemberMapper mapper;

    @PostMapping("/add")
    public Map<String, Object> postMemberAdd(@RequestBody MemberVO data)throws Exception{
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();

        if(mapper.isExistMeMberEmail(data.getMi_email())==1){
            resultMap.put("status", false);
            resultMap.put("message", data.getMi_email()+"은/는 이미 존재하는 Email 입니다.");
            return resultMap;
        }
        data.setMi_pwd(AESAlgorithm.Encrypt(data.getMi_pwd()));

        mapper.insertMemeber(data);
        resultMap.put("status", true);
        resultMap.put("message", "멤버가 등록되었습니다..");
        
        return resultMap;
    } 

    @GetMapping("/select_one")
    public MemberVO getMemberSelectOne(@RequestParam Integer seq){
        return mapper.selectMemberBySeq(seq);
    }

    @PatchMapping("/update")
    public String patchMemberUpdate(@RequestBody MemberVO data){
        mapper.updateMemeber(data);
        return "수정되었습니다.";
    }

    @DeleteMapping("/delete")
    public String deleteMember(@RequestParam Integer seq){
        mapper.deleteMemeber(seq);
        return "삭제되었습니다.";
    }
}
