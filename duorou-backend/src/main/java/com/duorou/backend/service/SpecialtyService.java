package com.duorou.backend.service;

import java.util.List;

import com.duorou.backend.model.entity.Specialty;
import com.duorou.backend.model.query.SpecialtyQuery;

public interface SpecialtyService {

	SpecialtyQuery page(SpecialtyQuery query);

	List<Specialty> listByUserId(Long userId);

	Specialty findById(Long id);
}
