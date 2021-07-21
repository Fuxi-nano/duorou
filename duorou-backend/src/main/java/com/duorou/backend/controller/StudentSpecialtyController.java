package com.duorou.backend.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duorou.backend.common.Result;
import com.duorou.backend.model.entity.StudentSpecialty;
import com.duorou.backend.service.StudentSpecialtyService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@Api(tags = "学生订阅课程接口")
@RequestMapping("/student_specialty")
public class StudentSpecialtyController {
	
	private final static String SESSION_NAME = "user_id";

	@Autowired
	private StudentSpecialtyService studentSpecialtyService;


	
	@GetMapping("/list")
	@ApiOperation("我订阅的课程列表")
	public Result<List<StudentSpecialty>> list(@ApiIgnore HttpSession session) {
		if (session.getAttribute(SESSION_NAME) == null) {
			return Result.ok(new ArrayList<StudentSpecialty>());
		}
		Long userId = (Long) session.getAttribute(SESSION_NAME);
		return Result.ok(studentSpecialtyService.listByUserId(userId));
	}
}
