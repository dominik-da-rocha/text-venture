package com.rochatronic.textventure;

import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.http.HttpMethod.*;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	private KeycloakAuthoritiesMapper authoritiesMapper = new KeycloakAuthoritiesMapper();

	@Bean
	public GrantedAuthoritiesMapper userAuthoritiesMapper() {
		return authoritiesMapper;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//@formatter:off
		http.cors().disable()
			.csrf().disable()
			.authorizeHttpRequests()
			.antMatchers(GET, "/**").hasAuthority("user")
			.antMatchers(POST, "/**").hasAuthority("user")
			.anyRequest().authenticated()
			.and()
			.oauth2Login(withDefaults());
		//@formatter:on
	}

}
