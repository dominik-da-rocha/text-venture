package com.rochatronic.textventure;


import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;

public class KeycloakAuthoritiesMapper implements GrantedAuthoritiesMapper {

	private static Logger LOG = LoggerFactory.getLogger(KeycloakAuthoritiesMapper.class);

	@Override
	public Collection<? extends GrantedAuthority> mapAuthorities(Collection<? extends GrantedAuthority> authorities) {
		Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

		authorities.forEach(authority -> {
			if (authority instanceof OAuth2UserAuthority) {
				handleAuthority(mappedAuthorities, (OAuth2UserAuthority) authority);
			} else if (authority instanceof SimpleGrantedAuthority) {
				handleAuthority(mappedAuthorities, (SimpleGrantedAuthority) authority);
			} else {
				LOG.info(authority.getClass().toString() + ":" + authority.getAuthority());
			}
		});

		return mappedAuthorities;
	}

	private void handleAuthority(Set<GrantedAuthority> mappedAuthorities, SimpleGrantedAuthority authority) {
		mappedAuthorities.add(authority);
	}

	private void handleAuthority(Set<GrantedAuthority> mappedAuthorities, OAuth2UserAuthority authority) {
		mappedAuthorities.add(authority);
		authority.getAttributes().forEach((String key, Object value) -> {
			if (key.equals("groups") && value instanceof ArrayList<?>) {
				handleRealmRoles(mappedAuthorities, (ArrayList<?>) value);
			} else {
				LOG.info(key + ":" + value.getClass().toString() + ": " + value.toString());
			}
		});
	}

	private void handleRealmRoles(Set<GrantedAuthority> mappedAuthorities, ArrayList<?> realmRoles) {
		realmRoles.forEach(role -> {
			mappedAuthorities.add(new SimpleGrantedAuthority(role.toString()));
		});
	}

}
