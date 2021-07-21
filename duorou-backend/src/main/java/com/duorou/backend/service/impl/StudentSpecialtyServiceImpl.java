package com.duorou.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.duorou.backend.mapper.StudentSpecialtyMapper;
import com.duorou.backend.model.entity.StudentSpecialty;
import com.duorou.backend.service.StudentSpecialtyService;

@Service
public class StudentSpecialtyServiceImpl implements StudentSpecialtyService {

	@Autowired
	private StudentSpecialtyMapper studentSpecialtyMapper;

	@Override
	public List<String> listSpecialtyNameByStudentId(Long studentId) {
		if (studentId == null) {
			return null;
		}
		QueryWrapper<StudentSpecialty> queryWrapper = new QueryWrapper<StudentSpecialty>();
		queryWrapper.lambda().eq(StudentSpecialty::getStudentId, studentId);
		List<StudentSpecialty> list = studentSpecialtyMapper.selectList(queryWrapper);
		if (CollectionUtils.isEmpty(list)) {
			return null;
		}
		return list.stream().map(StudentSpecialty::getSpecialtyName).collect(Collectors.toList());
	}

	@Override
	public List<StudentSpecialty> listByStudentId(Long studentId) {
		if (studentId == null) {
			return null;
		}
		QueryWrapper<StudentSpecialty> queryWrapper = new QueryWrapper<StudentSpecialty>();
		queryWrapper.lambda().eq(StudentSpecialty::getStudentId, studentId);
		List<StudentSpecialty> list = studentSpecialtyMapper.selectList(queryWrapper);
		if (CollectionUtils.isEmpty(list)) {
			return null;
		}
		return list;
	}

	@Override
	public Boolean insertOrUpdate(StudentSpecialty studentSpecialty) {
		QueryWrapper<StudentSpecialty> queryWrapper = new QueryWrapper<StudentSpecialty>();
		queryWrapper.lambda().eq(StudentSpecialty::getStudentId, studentSpecialty.getStudentId())
		.eq(StudentSpecialty::getCampusId, studentSpecialty.getCampusId())
		.eq(StudentSpecialty::getSpecialtyId, studentSpecialty.getSpecialtyId())
		.eq(StudentSpecialty::getTermId, studentSpecialty.getTermId());
		StudentSpecialty old = studentSpecialtyMapper.selectOne(queryWrapper);
		if (old != null) {
			old.setRightTime(studentSpecialty.getRightTime());
			studentSpecialtyMapper.updateById(old);
		} else {
			studentSpecialty.setIsEnable(true);
			studentSpecialtyMapper.insert(studentSpecialty);
		}
		return true;
	}

	@Override
	public List<StudentSpecialty> listByUserId(Long userId) {
		if (userId == null) {
			return null;
		}
		QueryWrapper<StudentSpecialty> queryWrapper = new QueryWrapper<StudentSpecialty>();
		queryWrapper.lambda().eq(StudentSpecialty::getUserId, userId);
		List<StudentSpecialty> list = studentSpecialtyMapper.selectList(queryWrapper);
		if (CollectionUtils.isEmpty(list)) {
			return null;
		}
		return list;
	}

}
