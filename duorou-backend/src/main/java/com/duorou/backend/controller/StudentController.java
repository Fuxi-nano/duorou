package com.duorou.backend.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duorou.backend.common.Result;
import com.duorou.backend.model.entity.Student;
import com.duorou.backend.service.StudentService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@Api(tags = "学生管理接口")
@RequestMapping("/student")
public class StudentController {

	private final static String SESSION_NAME = "user_id";

	@Autowired
	private StudentService studentService;

	@GetMapping("/list")
	@ApiOperation("学生列表")
	public Result<List<Student>> list(@ApiIgnore HttpSession session) {
		if (session.getAttribute(SESSION_NAME) == null) {
			return Result.ok(new ArrayList<Student>());
		}
		Long userId = (Long) session.getAttribute(SESSION_NAME);
		return Result.ok(studentService.listByUserId(userId));
	}
}
