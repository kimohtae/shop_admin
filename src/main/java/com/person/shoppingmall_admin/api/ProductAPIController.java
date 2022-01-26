package com.person.shoppingmall_admin.api;


import java.util.LinkedHashMap;
import java.util.Map;

import com.person.shoppingmall_admin.data.ProductImageVO;
import com.person.shoppingmall_admin.data.ProductRequest;
import com.person.shoppingmall_admin.mapper.ProductMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
public class ProductAPIController {
    @Autowired ProductMapper mapper;

    @PostMapping("/add")
    public Map<String, Object> postAddProduct(@RequestBody ProductRequest data){
        Map<String, Object> resultMap = new LinkedHashMap<>();
        mapper.insertProductInfo(data.getP_data());
        Integer seq = data.getP_data().getPi_seq();
        for(ProductImageVO imgVO : data.getP_img_list()){
            imgVO.setPii_pi_seq(seq);
            mapper.insertProductImage(imgVO);
        }
        data.getP_desc().setPdd_pi_seq(seq);
        mapper.insertProductDescription(data.getP_desc());
 
        resultMap.put("status", true);
        resultMap.put("message", "제품이 추가되었습니다.");
        return resultMap;
    }

}
