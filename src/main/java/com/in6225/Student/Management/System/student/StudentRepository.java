package com.in6225.Student.Management.System.student;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Integer> {

    Student findByFirstName(String firstName);

    Boolean existsByEmail(String Email);

    List<Student> findAllByUser_UserId(int userId);


}
