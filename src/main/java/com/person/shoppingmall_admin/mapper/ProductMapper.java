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
    List<ProductVO> selectProductList(String keyword, Integer offset, Integer seller_seq);
    List<ProductVO> selectRecommendProductList(String keyword, Integer offset);

    Integer selectProductCnt(String keyword, Integer seller_seq);
    List<String> selectProductImageNames(Integer seq);
    List<String> selectProductDescImageNames(Integer seq);
    ProductVO selectProductBySeq(Integer seq);
    String selectProductDescription(Integer seq);
    
    void insertProductInfo(ProductDataVO data);
    void insertProductImage(ProductImageVO data);
    void insertProductDescription(ProductDescVO data);
    void insertProductDescImage(ProductDescImageVO data);

    void deleteProduct(Integer seq);
    void deleteProductImage(String fileName);
    void deleteDetailProductImage(String fileName);
    void deleteProductImageBySeq(Integer seq);
    void deleteProductDetailImageBySeq(Integer seq);

    void updateProductInfo(ProductDataVO data);
    void updateProdDetailDesc(String desc, Integer seq);
    void updateProductCnt(Integer seq, Integer cnt);

    void insertProductRecommend(Integer seq);
    void deleteProductRecommend(Integer seq);
}
