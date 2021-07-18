package com.duorou.backend.service;

import com.duorou.backend.model.query.LessonQuery;

public interface LessonService {
	
	LessonQuery page(LessonQuery query);
}
