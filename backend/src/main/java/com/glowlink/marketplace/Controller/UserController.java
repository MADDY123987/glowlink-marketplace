package com.glowlink.marketplace.Controller;

import com.glowlink.marketplace.Model.User;
import com.glowlink.marketplace.Repository.UserRepository;
import com.glowlink.marketplace.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    // POST Request
    @PostMapping
    public User createUser(@RequestBody @Valid User user) {
        return userService.createUser(user);
    }

    // GET Request (All Users)
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/id/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    @GetMapping("/test/{userId}")
    public String test(@PathVariable Long userId) {
        return "ID = " + userId;
    }
    @PutMapping("/id/{id}")
    public User updateUser(@RequestBody User user,
                           @PathVariable Long id) throws Exception{
        Optional<User> otp=userRepository.findById(id);
        if(otp.isEmpty()){
            throw new Exception("user not found with id"+id);
        }
        User existingUser=otp.get();
        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());
        existingUser.setRole(user.getRole());
        return userRepository.save(existingUser);
    }
    @DeleteMapping("/id/{id}")
    public String deleteUserById(@PathVariable Long id)throws Exception{
        Optional<User>otp=userRepository.findById(id);
        if(otp.isEmpty()){
            throw new Exception("User Not Found with id"+id);
        }
        userRepository.deleteById(otp.get().getId());
        return "User Deleted";
    }
}