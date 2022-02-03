package com.person.shoppingmall_admin.mapper;

import java.util.List;

import com.person.shoppingmall_admin.data.LoginVO;
import com.person.shoppingmall_admin.data.MemberVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    List<MemberVO> selectMemberList(String keyword, String type, Integer offset);
    Integer selectMemberCnt(String keyword, String type);
    Integer isExistMeMberEmail(String email);
    MemberVO selectMemberBySeq(Integer seq);
    MemberVO memberLogin(LoginVO login);

    void insertMemeber(MemberVO data);
    void updateMemeber(MemberVO data);
    void deleteMemeber(Integer seq);
}
