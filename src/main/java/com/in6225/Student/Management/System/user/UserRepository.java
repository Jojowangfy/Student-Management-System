package com.in6225.Student.Management.System.user;

import com.in6225.Student.Management.System.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findUserByUserName(String userName);

    User findUserByUserNameAndPassword(String userName, String password);

    Boolean existsByUserName(String userName);

}
