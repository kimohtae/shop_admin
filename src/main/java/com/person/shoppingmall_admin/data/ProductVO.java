package com.person.shoppingmall_admin.data;

import java.util.Date;

import lombok.Data;

@Data
public class ProductVO {
    private Integer pi_seq;
    private String pi_name;
    private Integer pi_price;
    private String pi_sub_title;
    private String pi_info;
    private Double pi_discount_rate;
    private Double pi_point_rate;
    private Date pi_release_date;
    private Integer pi_stock;
    private Integer pi_cate_seq;
    private Integer pi_seller_seq;
    private Integer pi_delivery_seq;
    private Integer pi_status;
    private Integer pi_mfi_seq;

    private Integer cate_seq;
    private String cate_name;
    private Integer cate_parent;

    private Integer di_seq;
    private Integer di_price;
    private String di_name;

    private Integer mfi_seq;
    private String mfi_name;
    private String mfi_phone;
    private String mfi_email;

    private Integer pii_seq;
    private String pii_img_url;
    private Integer pii_pi_seq;
    private boolean pii_thumb;

    private Integer si_seq;
    private String si_id;
    private String si_name;
    private String si_email;
    private String si_phone;
    private String si_address;
    private Date si_reg_dt;
    private String si_img_url;
    private Integer si_status;

    private Double discounted_price;
    private Double saving_point;
    private String thumbnail;
}
