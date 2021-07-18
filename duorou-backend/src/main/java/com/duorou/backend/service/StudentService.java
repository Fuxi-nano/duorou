package com.duorou.backend.service;

import java.util.List;

import com.duorou.backend.model.entity.Student;

public interface StudentService {

	List<Student> listByUserId(Long userId);
}
