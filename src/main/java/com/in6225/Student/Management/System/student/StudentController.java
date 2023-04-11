package com.in6225.Student.Management.System.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @PostMapping("/addStudent")
    public Student addStudent(@RequestBody Student student) {
        return service.saveStudent(student);
    }

    @PostMapping("/addStudents")
    public List<Student> addStudents(@RequestBody List<Student> students) {
        return (List<Student>) service.saveStudents(students);
    }

    @PostMapping("/students")
    public Student addNewStudent(@RequestBody Student student) {
        System.out.println(student.getFirstName());
        return service.saveStudent(student);
    }

    @GetMapping("/students")
    public List<Student> findAllStudents() {
        return (List<Student>) service.getStudents();
    }

    @GetMapping("/studentById/{matricNumber}")
    public Student findStudentById(@PathVariable int matricNumber) {
        return service.getStudentById(matricNumber);
    }

    @GetMapping("/student/{firstName}")
    public Student findProductByName(@PathVariable String firstName) {
        return service.getStudentByName(firstName);
    }

    @PutMapping("/update")
    public Student updateStudent(@RequestBody Student student) {
        return service.updateStudent(student);
    }

    @DeleteMapping("/delete/{matricNumber}")
    public String deleteStudent(@PathVariable int matricNumber) {
//        return service.deleteStudent(matricNumber);
        return service.deleteStudent(matricNumber);
    }
}