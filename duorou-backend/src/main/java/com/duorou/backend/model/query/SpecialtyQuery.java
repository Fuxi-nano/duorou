package com.duorou.backend.model.query;

import java.io.Serializable;

import com.baomidou.mybatisplus.core.enums.SqlKeyword;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.duorou.backend.common.mybatis.annotation.ConditionColumn;
import com.duorou.backend.model.entity.Specialty;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class SpecialtyQuery extends Page<Specialty> implements Serializable {

	private static final long serialVersionUID = 1L;

	@ConditionColumn(columnNames = { "name", "tels" }, keyword = SqlKeyword.OR)
	private String keyword;
	
	@ConditionColumn(keyword = SqlKeyword.EQ)
	private String name;
}
