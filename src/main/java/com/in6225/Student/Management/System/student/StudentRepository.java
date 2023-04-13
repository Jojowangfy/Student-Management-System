package com.in6225.Student.Management.System.student;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {

    Student findByFirstName(String firstName);

    Boolean existsByEmail(String Email);


}
