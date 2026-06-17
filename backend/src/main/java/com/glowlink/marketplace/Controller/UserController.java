package com.glowlink.marketplace.Controller;

import com.glowlink.marketplace.Model.User;
import com.glowlink.marketplace.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // POST Request
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // GET Request (All Users)
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}