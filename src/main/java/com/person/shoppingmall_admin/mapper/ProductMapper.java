package com.person.shoppingmall_admin.mapper;

import java.util.List;

import com.person.shoppingmall_admin.data.ProductDataVO;
import com.person.shoppingmall_admin.data.ProductDescImageVO;
import com.person.shoppingmall_admin.data.ProductDescVO;
import com.person.shoppingmall_admin.data.ProductImageVO;
import com.person.shoppingmall_admin.data.ProductVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductMapper {
    List<ProductVO> selectProductList(String keyword,Integer offset);
    Integer selectProductCnt(String keyword);
    
    void insertProductInfo(ProductDataVO data);
    void insertProductImage(ProductImageVO data);
    void insertProductDescription(ProductDescVO data);
    void insertProductDescImage(ProductDescImageVO data);
}
