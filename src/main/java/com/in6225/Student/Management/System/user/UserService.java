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

    public boolean existUserId(int userId) {
        return userRepository.existsById(userId);
    }

    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }
//
//    public User getUserById(int id) {
//        return userRepository.findById(id).orElse(null);
//    }

    public LoginResponse loginUser(Login loginUser) {
        User user1 = userRepository.findByUserName(loginUser.getUserName());
//        User user1 = userRepository.findByUserId(loginUser.getUserId()));
        System.out.println(loginUser.getUserName());
        System.out.println(user1);
        if (user1 != null) {
            String password = loginUser.getPassword();
            String encodedPassword = user1.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);

            if (isPwdRight) {
                Optional<User> user = Optional.ofNullable(userRepository.findUserByUserNameAndPassword(loginUser.getUserName(),
                        encodedPassword));

                if (user.isPresent()) {
                    return new LoginResponse("Login Success", true, user1.getUserId());
                } else {
                    return new LoginResponse("Login Failed", false, 0);
                }

            } else {
                return new LoginResponse("Password Wrong", false, 0);
            }


        }
        return new LoginResponse("Please check again", false, 0);
//        return new LoginResponse("User ID doesn't exist!" + password + " " + encodedPassword, false);
    }

}
