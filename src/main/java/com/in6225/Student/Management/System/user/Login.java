package com.in6225.Student.Management.System.user;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Login {

    @JsonProperty("userId")
    private int userId;

    @JsonProperty("userName")
    private String userName;

    @JsonProperty("password")
    private String password;

    public Login(int userId, String userName, String password) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
