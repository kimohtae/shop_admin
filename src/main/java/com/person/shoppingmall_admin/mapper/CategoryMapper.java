package com.person.shoppingmall_admin.mapper;

import java.util.List;

import com.person.shoppingmall_admin.data.CategoryVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CategoryMapper {
    List<CategoryVO> selectCategories(Integer offset);
    Integer selectCategoryCnt();
    List<CategoryVO> selectRootCategories();
    List<CategoryVO> selectChildCategories(Integer parent_seq);
    
    void insertCategory(CategoryVO data);
}
