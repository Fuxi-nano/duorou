package com.duorou.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duorou.backend.common.Result;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = "报名区域接口")
@RequestMapping("/campus")
public class CampusController {

	@GetMapping("/list")
	@ApiOperation("报名区域列表")
	public Result<List<Map<String, String>>> list() {
		List<Map<String, String>> resultList = new ArrayList<>();
		Map<String, String> a = new HashMap<String, String>();
		a.put("id", "1");
		a.put("name", "活动中心");
		resultList.add(a);

		Map<String, String> b = new HashMap<String, String>();
		b.put("id", "2");
		b.put("name", "发展中心");
		resultList.add(b);

		Map<String, String> c = new HashMap<String, String>();
		c.put("id", "6");
		c.put("name", "滨江中心");
		resultList.add(c);
		return Result.ok(resultList);
	}
}
