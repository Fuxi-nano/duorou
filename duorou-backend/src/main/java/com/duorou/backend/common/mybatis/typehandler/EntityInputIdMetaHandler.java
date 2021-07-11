package com.duorou.backend.common.mybatis.typehandler;

import java.util.Date;

import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;

@Component
public class EntityInputIdMetaHandler implements MetaObjectHandler {

	@Override
	public void insertFill(MetaObject metaObject) {
		Date currentDate = new Date();
		this.setFieldValByName("createDate", currentDate, metaObject);
		this.setFieldValByName("modifyDate", currentDate, metaObject);
	}

	@Override
	public void updateFill(MetaObject metaObject) {
		this.setFieldValByName("modifyDate", new Date(), metaObject);
	}
}
