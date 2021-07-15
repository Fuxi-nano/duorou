package com.duorou.backend.model.entity;

import java.util.Date;

import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("w_class")
public class Lesson extends BaseInputEntity {
	
	private static final long serialVersionUID = 1L;

	private String name;

	private String tels;
	
	private Long specialtyId; 
	
	private String specialtyName;

	private Integer campusId;

	private String campusName;

	private Integer classTime;

	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	private Date maxAge;

	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	private Date minAge;

	private String teacherName;

	private String termName;

	private Integer termId;

	private Integer times;

	private Integer year;

	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	private Date beginTime;

	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	private Date endTime;

	private Integer sexType;

	private String stuTypeName;

	private String subject;

	private String weekday;

	@JsonFormat(pattern="HH:mm",timezone="GMT+8")
	private Date classStartTime;

	@JsonFormat(pattern="HH:mm",timezone="GMT+8")
	private Date classEndTime;

	private String degreeName;

	private String descript;;
}
