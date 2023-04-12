package com.in6225.Student.Management.System.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;


@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public Iterable<Student> saveStudents(List<Student> students) {
        return studentRepository.saveAll(students);
    }

    public Iterable<Student> getStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(int id) {
        return studentRepository.findById(id).orElse(null);
    }

    public Student getStudentByName(String firstName) {
        return studentRepository.findByFirstName(firstName);
    }

    public String deleteStudent(int matricNumber) {
        studentRepository.deleteById(matricNumber);
//        studentRepository.removeByMatricNumber(matricNumber);
        return "student removed !! " + matricNumber;
    }

    public Student updateStudent(Student student) {
        Student existingStudent = studentRepository.findById(student.getMatricNumber()).orElse(null);
        existingStudent.setFirstName(student.getFirstName());
        existingStudent.setLastName(student.getLastName());
        existingStudent.setGender(student.getGender());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setMajor(student.getMajor());
        existingStudent.setStatus(student.getStatus());

        return studentRepository.save(existingStudent);
    }

    public boolean isMatricNumberTaken(int matricNumber) {
        return studentRepository.existsById(matricNumber);
    }

    public boolean isEmailTaken(String email) {
        return studentRepository.existsByEmail(email);
    }

}