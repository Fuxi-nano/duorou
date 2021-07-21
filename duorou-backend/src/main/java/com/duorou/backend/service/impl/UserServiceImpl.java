package com.duorou.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.duorou.backend.mapper.UserMapper;
import com.duorou.backend.model.entity.User;
import com.duorou.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;

	@Override
	public User findById(Long id) {
		return userMapper.selectById(id);
	}

	@Override
	public User findByLoginName(String loginName) {
		QueryWrapper<User> queryWrapper = new QueryWrapper<User>();
		queryWrapper.lambda().eq(User::getLoginName, loginName);
		return userMapper.selectOne(queryWrapper);
	}

}
