package com.duorou.backend.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("w_user")
public class User extends BaseInputEntity {

	private static final long serialVersionUID = 1L;

	private String avatar;

	private String name;
	
	private String loginName;

	private String password;
}
