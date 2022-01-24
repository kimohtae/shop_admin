package com.person.shoppingmall_admin.mapper;

import java.util.List;

import com.person.shoppingmall_admin.data.ProductVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductMapper {
    List<ProductVO> selectProductList(String keyword,Integer offset);
    Integer selectProductCnt(String keyword);
}
