package com.duorou.backend.service;

import com.duorou.backend.model.entity.User;

public interface UserService {

	User findById(Long id);

	User findByLoginName(String loginName);

}
