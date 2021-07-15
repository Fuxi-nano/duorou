package com.duorou.backend.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("w_specialty")
public class Specialty extends BaseInputEntity {
	
	private static final long serialVersionUID = 1L;

	private String name;

	private String tels;

	private String abilitys;

	private String attitudes;
}
