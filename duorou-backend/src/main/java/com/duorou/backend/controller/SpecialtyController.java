package com.duorou.backend.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duorou.backend.common.Result;
import com.duorou.backend.model.dto.SubscribeDTO;
import com.duorou.backend.model.entity.Specialty;
import com.duorou.backend.model.entity.StudentSpecialty;
import com.duorou.backend.model.query.SpecialtyQuery;
import com.duorou.backend.service.SpecialtyService;
import com.duorou.backend.service.StudentSpecialtyService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@Api(tags = "课程管理接口")
@RequestMapping("/specialty")
public class SpecialtyController {
	
	private final static String SESSION_NAME = "user_id";

	@Autowired
	private SpecialtyService specialtyService;
	
	@Autowired
	private StudentSpecialtyService studentSpecialtyService;

	@PostMapping("/page")
	@ApiOperation("课程分页列表")
	public Result<SpecialtyQuery> page(@RequestBody SpecialtyQuery query) {
		return Result.ok(specialtyService.page(query));
	}
	
	@GetMapping("/list")
	@ApiOperation("我订阅的课程列表")
	public Result<List<Specialty>> list(@ApiIgnore HttpSession session) {
		if (session.getAttribute(SESSION_NAME) == null) {
			return Result.ok(Collections.EMPTY_LIST);
		}
		Long userId = (Long) session.getAttribute(SESSION_NAME);
		return Result.ok(specialtyService.listByUserId(userId));
	}
	
	@PostMapping("/subscribe")
	@ApiOperation("订阅")
	public Result<Boolean> subscribe(@RequestBody SubscribeDTO subscribeDTO,@ApiIgnore HttpSession session) {
		if (session.getAttribute(SESSION_NAME) == null) {
			return Result.ok(false);
		}
		Specialty specialty=specialtyService.findById(subscribeDTO.getId());
		if(specialty == null) {
			return Result.ok(false);
		}
		Long userId = (Long) session.getAttribute(SESSION_NAME);
		StudentSpecialty studentSpecialty=new StudentSpecialty();
		studentSpecialty.setCampusId(subscribeDTO.getCampusId());
		studentSpecialty.setTermId(subscribeDTO.getTermId());
		studentSpecialty.setUserId(userId);
		if(!CollectionUtils.isEmpty(subscribeDTO.getRightTime())) {
			studentSpecialty.setRightTime(String.join(",", subscribeDTO.getRightTime()));
		}
		studentSpecialty.setStudentId(subscribeDTO.getStudentId());
		studentSpecialty.setSpecialtyId(subscribeDTO.getId());
		studentSpecialty.setSpecialtyName(specialty.getName());
		studentSpecialty.setClassIds(subscribeDTO.getClassIds());
		studentSpecialty.setIgnoreClassIds(subscribeDTO.getIgnoreClassIds());
		return Result.ok(studentSpecialtyService.insertOrUpdate(studentSpecialty));
	}
}
