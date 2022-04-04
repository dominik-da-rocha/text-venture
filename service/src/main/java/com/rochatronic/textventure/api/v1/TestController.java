package com.rochatronic.textventure.api.v1;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/test")
public class TestController {

	@GetMapping("/greeting")
	public String getGreeting() {
		return "Hello World";
	}

	@PostMapping(value = "/echo", produces = { MediaType.TEXT_PLAIN_VALUE }, consumes = {
			MediaType.TEXT_PLAIN_VALUE })
	public String getGreeting(@RequestBody String data) {
		return data;
	}

}
