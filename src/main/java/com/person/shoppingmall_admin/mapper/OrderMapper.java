package com.person.shoppingmall_admin.mapper;

import java.util.List;

import com.person.shoppingmall_admin.data.OrderInfoVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderMapper {
    List<OrderInfoVO> selectOrderList(Integer seq, Integer offset, String keyword);
    Integer selectOrderCnt(Integer seq, String keyword);
    
    void updateOrderDeliveryStatusNumber(String del_num, Integer seq);
}
