package com.duorou.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duorou.backend.common.Result;
import com.duorou.backend.model.query.LessonQuery;
import com.duorou.backend.service.LessonService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = "班级管理接口")
@RequestMapping("/class")
public class ClassController {

	@Autowired
	private LessonService lessonService;

	@PostMapping("/page")
	@ApiOperation("班级分页列表")
	public Result<LessonQuery> page(@RequestBody LessonQuery query) {
		return Result.ok(lessonService.page(query));
	}
}
