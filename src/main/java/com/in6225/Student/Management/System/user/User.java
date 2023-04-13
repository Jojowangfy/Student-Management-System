package com.in6225.Student.Management.System.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
@Table(name = "USER_TABLE")
public class User {

    @Id
    @JsonProperty("userId")
    @NotNull
    @Column(name = "userId", length = 20)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userId;

    @JsonProperty("userName")
    @NotBlank
    @Column(name = "userName", length = 20)
    private String userName;

    @JsonProperty("password")
    @NotBlank
    @Column(name = "password")
//    @Size(min = 5, max = 65555)
    private String password;

    public User(int userId, String userName, String password) {
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


