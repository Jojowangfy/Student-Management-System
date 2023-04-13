package com.in6225.Student.Management.System.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public User addUser(User registerUser) {
        User user = new User(
                registerUser.getUserId(),
                registerUser.getUserName(),
                this.passwordEncoder.encode(registerUser.getPassword())
        );
        return userRepository.save(user);
    }

//    public User saveUser(User user) {
//        return userRepository.save(user);
//    }

    public boolean existUserName(User user) {
        return userRepository.existsByUserName(user.getUserName());
    }

    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }
//
//    public User getUserById(int id) {
//        return userRepository.findById(id).orElse(null);
//    }

    public LoginResponse loginUser(Login loginUser) {

        String msg = "";
        User user1 = userRepository.findUserByUserName(loginUser.getUserName());
        if (user1 != null) {
            String password = loginUser.getPassword();
            String encodedPassword = user1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<User> user = Optional.ofNullable(userRepository.findUserByUserNameAndPassword(loginUser.getUserName(),
                        encodedPassword));

                if (user.isPresent()) {
                    new LoginResponse("Login Success", true);
                } else {
                    new LoginResponse("Login Failed", false);
                }

            } else {
                return new LoginResponse("Password Wrong", false);
            }


        }
        return new LoginResponse("User ID doesn't exist!", false);
    }

}
