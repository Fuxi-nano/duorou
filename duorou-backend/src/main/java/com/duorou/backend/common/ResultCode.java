package com.duorou.backend.common;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

import com.duorou.backend.model.enums.BaseEnum;

public enum ResultCode implements BaseEnum<Integer> {
	/**
	 * 未知错误(可以认为是服务器内部错误，对应http响应码500)
	 */
	FAILURE(-1, "Unknown error"),

	/**
	 * 请求成功
	 */
	SUCCESS(200, "success"),

	/**
	 * MISSING_REQUEST_PARAMETER 缺少请求参数
	 */
	MISSING_REQUEST_PARAMETER(100001, "缺少请求参数"),

	/**
	 * 参数解析失败(非预期的请求参数,无法读取)
	 */
	MALFORMED_REQUEST_PARAMETER(100002, "Malformed json request"),

	/**
	 * 不支持当前请求方法
	 */
	REQUEST_METHOD_NOT_SUPPORTED(100003, "Request method[%s] not supported"),

	/**
	 * 请求URL不存在
	 */
	NOT_FOUND(100004, "请求URL不存在"),

	/**
	 * 不支持当前媒体类型
	 */
	CONTENT_TYPE_NOT_SUPPORTED(100005, "不支持当前媒体类型"),

	/** zuul网关发生异常 */
	GATEWAY_ERROR(100006, "网关发生异常"),

	/**
	 * 参数验证失败
	 */
	PARAMETER_NOT_VALID(100011, "参数验证失败"),

	/**
	 * 100007 资源不存在
	 */
	RESOURCE_NOT_EXIST_EXCEPTION(100012, "资源不存在"),

	/**
	 * 100013 资源大小限制
	 */
	RESOURCE_SIZE_LIMIT_EXCEPTION(100013, "资源大小受限制"),

	/**
	 * 100000为通用业务异常
	 */
	BUSINESS_EXCEPTION(100050, "业务出错[%s]"),

	/***
	 * 认证异常
	 */
	AUTH_EXCEPTION(110000, "Auth exception"),

	/**
	 * Token已过期
	 */
	TOKEN_EXPIRED(110001, "Token expired"),

	/**
	 * Token不存在或已失效
	 */
	TOKEN_INVALID(110002, "Token invalid"),

	/***
	 *
	 * Token删除异常
	 */
	TOKEN_REVOKE_ERROR(110003, "Token revoke error"),

	CAPTCHA_FREQUENT(120000, "请求的验证码过于频繁"),

	CAPTCHA_NOT_EXPIRED(120001, "验证码尚未失效"),

	CAPTCHA_SEND_FAILED(120002, "验证码发送失败"),

	CAPTCHA_ERROR(120003, "验证码错误"),

	CAPTCHA_EXPIRED(120004, "验证码还未失效"),
	
	LOGIN_ERROR(120005,"错误的用户名和密码"),

	EMPLOYEE_NOT_EXIST(130000, "用户不存在"),

	FILE_NOT_EXIST(140000, "文件不存在"),

	IMPORT_FAILED(140001, "导入失败");

	private final int value;
	private final String meaning;

	ResultCode(int value, String meaning) {
		this.value = value;
		this.meaning = meaning;
	}

	@Override
	public Integer getValue() {
		return this.value;
	}

	@Override
	public String getMeaning() {
		return this.meaning;
	}

	private static Map<Integer, ResultCode> CODE_MESSAGE_MAP;

	static {
		ResultCode[] resultCodes = ResultCode.values();
		CODE_MESSAGE_MAP = Arrays.stream(resultCodes)
				.collect(Collectors.toMap(ResultCode::getValue, (resultCode) -> resultCode));
	}

	@SuppressWarnings("unused")
	public ResultCode getResultCode(int code) {
		return CODE_MESSAGE_MAP.get(code);
	}
}
