package com.duorou.backend.config;

import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;


@EnableWebMvc
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	protected boolean swaggerEnabled = true;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		if (swaggerEnabled) {
			registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
			registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
		}
	}

	@Override
	public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
		// 放到第一个
		converters.add(0, stringHttpMessageConverter());
		converters.add(1, jackson2HttpMessageConverter());
	}

	@Bean
	@Order(1)
	public StringHttpMessageConverter stringHttpMessageConverter() {
		return new StringHttpMessageConverter(Charset.forName("utf-8"));
	}

	@Bean
	@Order(2)
	public MappingJackson2HttpMessageConverter jackson2HttpMessageConverter() {

		MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
		ObjectMapper objectMapper = converter.getObjectMapper();

		/** number转换为String类型展示,防止精度丢失的问题 */
		SimpleModule simpleModule = new SimpleModule();
		simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
		simpleModule.addSerializer(Long.TYPE, ToStringSerializer.instance);
		objectMapper.registerModule(simpleModule);

		/** 统一设置日期格式 */
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		objectMapper.setDateFormat(format);

		converter.setObjectMapper(objectMapper);

		return converter;

	}

}
