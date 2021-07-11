package com.duorou.backend.common.mybatis.utils;

import java.lang.reflect.Field;
import java.util.Collection;
import java.util.stream.IntStream;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.enums.SqlKeyword;
import com.duorou.backend.common.mybatis.annotation.ConditionColumn;
import com.google.common.base.CaseFormat;

public class ConvertConditionUtils {
	public static <T, E, F> QueryWrapper<F> convert(Class<T> clazz, E e) {
		QueryWrapper<F> queryWrapper = new QueryWrapper<F>();
		Field[] fields = clazz.getDeclaredFields();
		process(fields, queryWrapper, e);
		return queryWrapper;
	}

	private static <T, E> void setWrapper(Field field, QueryWrapper<T> queryWrapper, ConditionColumn target, E e) {
		String fieldName = field.getName();
		String[] columnNames = target.columnNames();
		// 注解传入的字段名为空的情况下，将字段名转为小写下划线分隔
		if (null == columnNames || columnNames.length == 0) {
			fieldName = CaseFormat.LOWER_CAMEL.to(CaseFormat.LOWER_UNDERSCORE, fieldName);
			columnNames = new String[] { fieldName };
		}
		SqlKeyword keyword = target.keyword();
		ConditionColumn.Sort sort = target.sort();
		try {
			field.setAccessible(true);
			Object value = field.get(e);
			if (null != value) {
				setQueryConditionWrapper(queryWrapper, columnNames, value, keyword);
			}
			if (null != sort && sort != ConditionColumn.Sort.NONE) {
				setQuerySortWrapper(queryWrapper, columnNames, sort);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static <T, E> void process(Field[] fields, QueryWrapper<T> queryWrapper, E e) {
		for (Field field : fields) {
			ConditionColumn target = field.getDeclaredAnnotation(ConditionColumn.class);
			if (null != target) {
				setWrapper(field, queryWrapper, target, e);
			}
		}
	}

	private static <T> void setQuerySortWrapper(QueryWrapper<T> queryWrapper, String[] columnNames,
			ConditionColumn.Sort sort) {
		switch (sort) {
		case ASC:
			IntStream.range(0, columnNames.length).forEach(i -> {
				String columnName = columnNames[i];
				queryWrapper.orderByAsc(columnName);
			});
			break;
		case DESC:
			IntStream.range(0, columnNames.length).forEach(i -> {
				String columnName = columnNames[i];
				queryWrapper.orderByDesc(columnName);
			});
			break;
		default:
			break;
		}
	}

	private static <T> void setQueryConditionWrapper(QueryWrapper<T> queryWrapper, String[] columnNames, Object value,
			SqlKeyword keyword) {
		switch (keyword) {
		case EQ:
			queryWrapper.eq(columnNames[0], value);
			break;
		case GE:
			queryWrapper.ge(columnNames[0], value);
			break;
		case GT:
			queryWrapper.gt(columnNames[0], value);
			break;
		case IN:
			if (value instanceof Collection) {
				queryWrapper.in(columnNames[0], (Collection) value);
			} else {
				queryWrapper.in(columnNames[0], value);
			}
			break;
		case LE:
			queryWrapper.le(columnNames[0], value);
			break;
		case LT:
			queryWrapper.lt(columnNames[0], value);
			break;
		case NE:
			queryWrapper.ne(columnNames[0], value);
			break;
		case OR:
			int length = columnNames.length;

			queryWrapper.and(wrapper -> {
				for (int i = 0; i < length; i++) {
					if (i == length - 1) {
						wrapper.like(columnNames[i], value);
					} else {
						wrapper.like(columnNames[i], value).or();
					}
				}
			});

			break;
		case IS_NULL:
			queryWrapper.isNull(columnNames[0]);
			break;
		case IS_NOT_NULL:
			queryWrapper.isNotNull(columnNames[0]);
			break;
		case LIKE:
			queryWrapper.like(columnNames[0], value);
			break;
		default:
			break;
		}

	}
}
