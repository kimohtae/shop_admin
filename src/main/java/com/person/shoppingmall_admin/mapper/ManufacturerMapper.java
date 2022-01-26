package com.person.shoppingmall_admin.mapper;

import java.util.List;

import com.person.shoppingmall_admin.data.ManufacturerVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ManufacturerMapper {
    List<ManufacturerVO> selectManufacturerList(Integer offset,String keyword, Integer limit);
    Integer selectManufacturerCnt(String keyword);
    ManufacturerVO selectManufacturerBySeq(Integer seq);

    void insertManufacturer(ManufacturerVO data);
    void updateManufacturer(ManufacturerVO data);
    void deleteManufacturer(Integer seq);


}
