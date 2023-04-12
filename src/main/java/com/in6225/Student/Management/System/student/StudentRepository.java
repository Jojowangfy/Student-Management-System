package com.in6225.Student.Management.System.student;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    //    List<Student> removeByMatricNumber(int matricNumber);
//    removeByFirstName(String firstName);
    Student findByFirstName(String firstName);

    Boolean existsByEmail(String Email);

}
