package com.person.shoppingmall_admin.data;

import java.util.Date;

import lombok.Data;

@Data
public class MemberVO {
    private String mi_email;
    private Integer mi_seq;
    private String mi_pwd;
    private String mi_name;
    private String mi_birth;
    private String mi_phone;
    private Integer mi_gen;
    private String mi_address;
    private Integer mi_status;
    private Integer mi_grade;
    private Date mi_reg_dt;
    private Date mi_leave_dt;
    private Integer mi_role; //1:일반. 2:관리자, 99:최상위관리자
}
