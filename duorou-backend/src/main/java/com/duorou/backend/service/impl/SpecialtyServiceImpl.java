package com.duorou.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.duorou.backend.common.mybatis.utils.ConvertConditionUtils;
import com.duorou.backend.mapper.SpecialtyMapper;
import com.duorou.backend.mapper.StudentSpecialtyMapper;
import com.duorou.backend.model.entity.Specialty;
import com.duorou.backend.model.entity.StudentSpecialty;
import com.duorou.backend.model.query.SpecialtyQuery;
import com.duorou.backend.service.SpecialtyService;

@Service
public class SpecialtyServiceImpl implements SpecialtyService {

	@Autowired
	private SpecialtyMapper specialtyMapper;
	
	@Autowired
	private StudentSpecialtyMapper studentSpecialtyMapper;

	@Override
	public SpecialtyQuery page(SpecialtyQuery query) {
		QueryWrapper<Specialty> wrapper = ConvertConditionUtils.convert(query.getClass(), query);
		wrapper.lambda().orderByDesc(Specialty::getId);
		return (SpecialtyQuery) specialtyMapper.selectPage(query, wrapper);
	}

	@Override
	public List<Specialty> listByUserId(Long userId) {
		if (userId == null) {
			return null;
		}
		QueryWrapper<StudentSpecialty> queryWrapper = new QueryWrapper<StudentSpecialty>();
		queryWrapper.lambda().eq(StudentSpecialty::getUserId, userId);
		List<StudentSpecialty> list = studentSpecialtyMapper.selectList(queryWrapper);
		if (CollectionUtils.isEmpty(list)) {
			return null;
		}
		List<Long> ids=list.stream().map(StudentSpecialty::getSpecialtyId).collect(Collectors.toList());
		return specialtyMapper.selectBatchIds(ids);
	}

	@Override
	public Specialty findById(Long id) {
		return specialtyMapper.selectById(id);
	}

}
