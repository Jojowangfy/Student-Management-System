package com.in6225.Student.Management.System.user;

import com.in6225.Student.Management.System.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Login loginUser) {
        LoginResponse loginResponse = userService.loginUser(loginUser);
        return ResponseEntity.ok(loginResponse);
    }

}
