package com.person.shoppingmall_admin.api;

import java.util.LinkedHashMap;
import java.util.Map;

import com.person.shoppingmall_admin.data.ManufacturerVO;
import com.person.shoppingmall_admin.mapper.ManufacturerMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/manufacturer")
public class ManufacturerAPIController {
    @Autowired ManufacturerMapper mapper;
    @GetMapping("/list")
    public Map<String, Object> getManufacturerList(@RequestParam @Nullable String keyword,@RequestParam @Nullable Integer offset){
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();

        if(keyword == null) keyword = "%%";
        else keyword = "%"+keyword+"%";
        if(offset==null) offset=0;

        Integer cnt = mapper.selectManufacturerCnt(keyword);
        Integer page = (cnt/24)+(cnt%24>0 ? 1:0);

        resultMap.put("list", mapper.selectManufacturerList(offset, keyword));
        resultMap.put("page", page);
        return resultMap;
    }

    @GetMapping("/select_one")
    public ManufacturerVO selectManufacturerBySeq(@RequestParam Integer seq){
        return mapper.selectManufacturerBySeq(seq);
    }
    @PostMapping("/add")
    public String insertManufacturer(@RequestBody ManufacturerVO data){
        mapper.insertManufacturer(data);
        return "제조사가 추가되었습니가";
    }
    @PatchMapping("/update")
    public String updateManufacturer(@RequestBody ManufacturerVO data){
        mapper.updateManufacturer(data);
        return "제조사 정보가 수정되었습니가";
    }
    @DeleteMapping("/delete")
    public String deleteManufacturer(@RequestParam Integer seq){
        mapper.deleteManufacturer(seq);
        return "제조사가 삭제되었습니가";
    }

}
