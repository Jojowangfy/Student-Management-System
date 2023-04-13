package com.in6225.Student.Management.System.user;

import com.in6225.Student.Management.System.exception.ApiRequestException;
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
        if (userService.existUserName(user)) {
            throw new ApiRequestException("User name " + user.getUserName() + " already taken");
        }
        return userService.addUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Login loginUser) {
        LoginResponse loginResponse = userService.loginUser(loginUser);
        System.out.println(ResponseEntity.ok(loginResponse));
        return ResponseEntity.ok(loginResponse);
    }

}
