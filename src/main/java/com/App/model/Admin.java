package com.App.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "admins")
public class Admin {

	@Id
	@Column(name = "user", length = 50, nullable = false, unique = true)
	private String user;

	@Column(name = "password", nullable = false)
	private String password;

	// Constructors
	public Admin() {
		super();
	}

	public Admin(String user, String password) {
		super();
		this.user = user;
		this.password = password;
	}

	// Getters and Setters
	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
