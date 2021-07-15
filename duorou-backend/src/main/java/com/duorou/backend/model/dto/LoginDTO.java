package com.duorou.backend.model.dto;

import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class LoginDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private String userName;

	private String password;
}
