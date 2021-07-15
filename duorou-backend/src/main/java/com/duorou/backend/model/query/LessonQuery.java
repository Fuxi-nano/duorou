package com.duorou.backend.model.query;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.core.enums.SqlKeyword;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.duorou.backend.common.mybatis.annotation.ConditionColumn;
import com.duorou.backend.model.entity.Lesson;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class LessonQuery extends Page<Lesson> implements Serializable {

	private static final long serialVersionUID = 1L;

	@ConditionColumn(keyword = SqlKeyword.EQ)
	private Long specialtyId;
	
	@ConditionColumn(keyword = SqlKeyword.EQ)
	private Integer termId;
	
	@ConditionColumn(keyword = SqlKeyword.EQ)
	private Integer campusId;

	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	private Date birthday;

}
