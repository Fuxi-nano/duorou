package com.duorou.backend.common.mybatis.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.baomidou.mybatisplus.core.enums.SqlKeyword;

@Target({ ElementType.ANNOTATION_TYPE, ElementType.METHOD, ElementType.CONSTRUCTOR, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface ConditionColumn {

	String[] columnNames() default {};

	SqlKeyword keyword() default SqlKeyword.EQ;

	Sort sort() default Sort.NONE;

	enum Sort {
		/** 正序 */
		ASC,
		/** 倒序 */
		DESC,
		/** 不排序 */
		NONE
	}
}
