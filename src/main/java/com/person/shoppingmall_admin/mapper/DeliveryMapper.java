package com.person.shoppingmall_admin.mapper;

import java.util.List;

import com.person.shoppingmall_admin.data.DeliveryVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DeliveryMapper {
    List<DeliveryVO> selectDeliveries(String keyword);
    Integer selectDeliveryCnt(String keyword);
    DeliveryVO selectDeliveryBySeq(Integer seq);

    void insertDelivery(DeliveryVO data);
    void updateDelivery(DeliveryVO data);
    void deleteDelivery(Integer seq);
}
