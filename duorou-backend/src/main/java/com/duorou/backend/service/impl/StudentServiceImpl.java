package com.duorou.backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.duorou.backend.mapper.StudentMapper;
import com.duorou.backend.model.entity.Student;
import com.duorou.backend.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentMapper studentMapper;

	@Override
	public List<Student> listByUserId(Long userId) {
		QueryWrapper<Student> queryWrapper = new QueryWrapper<Student>();
		queryWrapper.lambda().eq(Student::getUserId, userId);
		return studentMapper.selectList(queryWrapper);
	}

}
