package com.duorou.backend.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("w_student")
public class Student extends BaseInputEntity {

	private static final long serialVersionUID = 1L;
	
	private Long userId;

	private String name;

	private String minAge;

	private String cardNo;

	private String password;
	
	private Boolean enable;
}
