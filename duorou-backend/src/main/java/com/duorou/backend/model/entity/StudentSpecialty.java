package com.duorou.backend.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("w_student_specialty")
public class StudentSpecialty extends BaseInputEntity {

	private static final long serialVersionUID = 1L;

	private Long studentId;
	
	private String studentName;
	
	private Long userId;

	private Long specialtyId;

	private String specialtyName;

	private Integer campusId;
	
	private Integer termId;

	private String rightTime;
	
	private String classIds;

	private Boolean isEnable;


}
