package com.in6225.Student.Management.System.student;

import com.in6225.Student.Management.System.exception.ApiRequestException;
import com.in6225.Student.Management.System.user.User;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
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
    public Student addNewStudent(@RequestBody @Valid Student student, @RequestParam("userId") int userId) {
        System.out.println(student.getFirstName());
        if (service.isMatricNumberTaken(student.getMatricNumber())) {
            throw new ApiRequestException("Matric Number" + student.getMatricNumber() + " already exists");
        }
        if (service.isEmailTaken(student.getEmail())) {
            throw new ApiRequestException("Email already exists");
        }
        student.setGender(student.getGender().toUpperCase());
        // 设置关联字段
        User user = new User();
        user.setUserId(userId);
        student.setUser(user);

        return service.saveStudent(student);
    }


//    @GetMapping("/students")
//    public List<Student> findAllStudents() {
////        throw new IllegalStateException("Oops cannot find students");
//        return (List<Student>) service.getStudents();
//    }

    @GetMapping("/students/{userId}")
    public List<Student> findAllStudentsByUserId(@PathVariable("userId") int userId) {
        return service.getAllStudentByUserId(userId);
    }


    @PutMapping("/students")
    public Student updateStudent(@RequestBody Student student) {
        if (!service.studentExist(student.getMatricNumber())) {
            throw new ApiRequestException("Student doesn't exist");
        }
        return service.updateStudent(student);
    }

//    @DeleteMapping("/delete/{matricNumber}")
//    public String deleteStudent(@PathVariable int matricNumber) {
////        return service.deleteStudent(matricNumber);
//        return service.deleteStudent(matricNumber);
//    }

    @DeleteMapping("/students/{userId}/{matricNumber}")
    public String deleteStudent(@PathVariable int userId, @PathVariable int matricNumber) {
        // return service.deleteStudent(matricNumber);
        return service.deleteStudent(userId, matricNumber);
    }
}