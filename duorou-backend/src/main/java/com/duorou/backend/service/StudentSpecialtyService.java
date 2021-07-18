package com.duorou.backend.service;

import java.util.List;

import com.duorou.backend.model.entity.StudentSpecialty;

public interface StudentSpecialtyService {

	List<String> listSpecialtyNameByStudentId(Long studentId);

	List<StudentSpecialty> listByStudentId(Long studentId);
	
	List<StudentSpecialty> listByUserId(Long userId);

	Boolean insertOrUpdate(StudentSpecialty studentSpecialty);
}
