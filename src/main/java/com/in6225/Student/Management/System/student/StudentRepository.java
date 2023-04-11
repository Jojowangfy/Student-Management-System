package com.in6225.Student.Management.System.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;

import javax.swing.*;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    //    List<Student> removeByMatricNumber(int matricNumber);
//    removeByFirstName(String firstName);
    Student findByFirstName(String firstName);
}
