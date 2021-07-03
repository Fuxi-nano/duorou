package com.duorou.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.duorou.backend.service.StudentService;

@SpringBootTest
class DuorouBackendApplicationTests {

	@Autowired
	private StudentService studentService;

	@Test
	void contextLoads() {
		studentService.listByUserId(1L);
	}

}
