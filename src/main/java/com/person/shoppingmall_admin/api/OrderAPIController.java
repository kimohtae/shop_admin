package com.person.shoppingmall_admin.api;

import com.person.shoppingmall_admin.mapper.OrderMapper;
import com.person.shoppingmall_admin.mapper.ProductMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/order")
public class OrderAPIController {
    @Autowired OrderMapper order_mapper;
    @Autowired ProductMapper prod_mapper;

    @PatchMapping("/accept")
    public String patchOrderAcccept(
        @RequestParam String del_num,
        @RequestParam Integer seq,
        @RequestParam Integer cnt,
        @RequestParam Integer pSeq
        ){
        order_mapper.updateOrderDeliveryStatusNumber(del_num, seq);
        prod_mapper.updateProductCnt(pSeq, cnt);

        return "요청이 처리되었습니다.";
    }
}
