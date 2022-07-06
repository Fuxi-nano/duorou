package com.duorou.backend.model.dto;

import java.io.Serializable;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class SubscribeDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private Long id;
	
	private Long studentId; 
	
	private Integer campusId;
	
	private Integer termId;
	
	private List<String> rightTime;

	private String classIds;

	private String ignoreClassIds;

}
