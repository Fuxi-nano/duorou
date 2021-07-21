package com.duorou.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.duorou.backend.common.mybatis.utils.ConvertConditionUtils;
import com.duorou.backend.mapper.LessonMapper;
import com.duorou.backend.model.entity.Lesson;
import com.duorou.backend.model.query.LessonQuery;
import com.duorou.backend.service.LessonService;

@Service
public class LessonServiceImpl implements LessonService {

	@Autowired
	private LessonMapper lessonMapper;

	@Override
	public LessonQuery page(LessonQuery query) {
		QueryWrapper<Lesson> wrapper = ConvertConditionUtils.convert(query.getClass(), query);
		if (query.getBirthday() != null) {
			wrapper.lambda().le(Lesson::getMinAge, query.getBirthday()).ge(Lesson::getMaxAge, query.getBirthday());
		}
		wrapper.lambda().orderByDesc(Lesson::getId);
		return (LessonQuery) lessonMapper.selectPage(query, wrapper);
	}

}
