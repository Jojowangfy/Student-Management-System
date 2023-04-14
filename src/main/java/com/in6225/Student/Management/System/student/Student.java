package com.in6225.Student.Management.System.student;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.in6225.Student.Management.System.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
@Table(name = "STUDENT_TABLE")
public class Student {

    @ManyToOne
    @JoinColumn(name = "User_id")
    private User user;

    @Id
    @JsonProperty("matricNumber")
    @NotNull
    private int matricNumber;

    @JsonProperty("firstName")
    @NotBlank
    private String firstName;

    @JsonProperty("lastName")
    @NotBlank
    private String lastName;

    @JsonProperty("gender")
    @NotBlank
    private String gender;

    @JsonProperty("email")
    @Email
    @NotBlank
    private String email;

    @JsonProperty("major")
    @NotBlank
    private String major;

    @JsonProperty("status")
    @NotBlank
    private String status;

    public Student(User user, int matricNumber, String firstName, String lastName, String gender, String email, String major, String status) {
        this.user = user;
        this.matricNumber = matricNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.email = email;
        this.major = major;
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getMatricNumber() {
        return matricNumber;
    }

    public void setMatricNumber(int matricNumber) {
        this.matricNumber = matricNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}


