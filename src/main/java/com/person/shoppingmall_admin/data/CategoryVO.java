package com.person.shoppingmall_admin.data;

import lombok.Data;

@Data
public class CategoryVO {
    private String cate_seq;
    private String cate_name;
    private String count;
    private String parent_name;
}
