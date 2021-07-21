package com.duorou.backend.controller;

import javax.servlet.http.HttpSession;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duorou.backend.common.Result;
import com.duorou.backend.common.ResultCode;
import com.duorou.backend.model.dto.LoginDTO;
import com.duorou.backend.model.dto.UserDTO;
import com.duorou.backend.model.entity.User;
import com.duorou.backend.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@Api(tags = "账号接口")
@RequestMapping("/user")
public class UserController {
	
	private final static String SESSION_NAME="user_id";
	
	@Autowired
	private UserService userService;

	@PostMapping("/login")
	@ApiOperation("登录")
	public Result login(@RequestBody LoginDTO loginDTO,@ApiIgnore HttpSession session) {
		if (StringUtils.isEmpty(loginDTO.getUserName()) || StringUtils.isEmpty(loginDTO.getPassword())) {
			return Result.errorMsg(ResultCode.PARAMETER_NOT_VALID);
		}
		User user=userService.findByLoginName(loginDTO.getUserName());
		if(user == null) {
			return Result.errorMsg(ResultCode.LOGIN_ERROR); 
		}
		if(!DigestUtils.md5Hex(loginDTO.getPassword()).equals(user.getPassword())) {
			return Result.errorMsg(ResultCode.LOGIN_ERROR); 
		}
		session.setAttribute(SESSION_NAME, user.getId());
		return Result.ok();
	}

	@GetMapping("/logout")
	@ApiOperation("注销")
	public void logout(@ApiIgnore HttpSession session) {
		session.removeAttribute(SESSION_NAME);
	}
	
	@GetMapping("/info")
	@ApiOperation("用户信息")
	public Result info(@ApiIgnore HttpSession session) {
		if(session.getAttribute(SESSION_NAME) == null) {
			return Result.errorMsg(ResultCode.AUTH_EXCEPTION);
		}
		Long userId=(Long) session.getAttribute(SESSION_NAME);
		User user=userService.findById(userId);
		UserDTO userDTO=new UserDTO();
		BeanUtils.copyProperties(user, userDTO);
		return Result.ok(userDTO); 
	}
}
