package com.duorou.backend.common;

import java.io.Serializable;

import com.duorou.backend.model.enums.BaseEnum;
import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Result<T> implements Serializable {
	private static final long serialVersionUID = 4814611774349568918L;
	@ApiModelProperty(value = "返回代码")
	private int code;
	@ApiModelProperty(value = "成功标志")
	private String status;
	private Boolean success;
	@ApiModelProperty(value = "返回信息")
	private String message;
	@ApiModelProperty(value = "返回数据对象")
	private T data;
	@ApiModelProperty(value = "时间戳")
	private long serverTime = System.currentTimeMillis();
	


	public Result setErrorMsg(BaseEnum baseEnum) {
		return this.setCode(baseEnum.getValue()).setMessage(baseEnum.getMeaning());
	}

	public static Result successMsg(String msg) {
		return new Result().setStatus("ok").setSuccess(true).setCode(ResultCode.SUCCESS.getValue())
				.setMessage(msg);
	}


	public static Result errorMsg(Integer code, String msg) {
		return new Result().setStatus("error").setSuccess(false).setCode(code).setMessage(msg);
	}

	public static Result errorMsg(BaseEnum error) {
		return new Result().setStatus("error").setSuccess(false).setCode(error.getValue()).setMessage(error.getMeaning());
	}

	public static <T> Result<T> ok(T data) {
		return new Result().setStatus("ok").setSuccess(true).setData(data).setCode(ResultCode.SUCCESS.getValue())
				.setMessage(ResultCode.SUCCESS.getMeaning());
	}


	public static Result ok() {
		return ok(null);
	}

	public static Result fail(String msg) {
		return errorMsg(ResultCode.FAILURE.getValue(), msg);
	}

	public static Result fail() {
		return fail(null);
	}

	public static Result error(String msg) {
		return fail(msg);
	}

	public static Result error() {
		return fail();
	}

	public static Result baseOnBool(Boolean flag) {
		return flag ? ok() : error();
	}

	public static <T> Result<T> error(BaseEnum resultCode, T errorData) {
		return new Result().setStatus("error").setSuccess(false).setErrorMsg(resultCode).setData(errorData);
	}

	public static <T> Result<T> error(T errorData) {
		return new Result().setStatus("error").setSuccess(false).setErrorMsg(ResultCode.FAILURE).setData(errorData);
	}
}
