package com.person.shoppingmall_admin.mapper;

import java.util.List;

import com.person.shoppingmall_admin.data.MemberVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    List<MemberVO> selectMemberList(String keyword, Integer offset);
    Integer selectMemberCnt(String keyword);
    Integer isExistMeMberEmail(String email);
    MemberVO selectMemberBySeq(Integer seq);

    void insertMemeber(MemberVO data);
    void updateMemeber(MemberVO data);
    void deleteMemeber(Integer seq);
}
