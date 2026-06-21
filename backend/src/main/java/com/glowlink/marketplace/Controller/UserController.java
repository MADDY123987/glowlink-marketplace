package com.glowlink.marketplace.Controller;

import com.glowlink.marketplace.Model.User;
import com.glowlink.marketplace.Service.UserService;
import com.glowlink.marketplace.exception.UserException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // POST Request
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
        User createdUser=userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    // GET Request (All Users)
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users=userService.getAllUsers();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }

    @GetMapping("/id/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) throws UserException {
        User user=userService.getUserById(userId);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @PutMapping("/id/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user,
                           @PathVariable Long id) throws UserException{
        User updatedUser=userService.updateUser(id, user);
        return new ResponseEntity<>(updatedUser,HttpStatus.OK);
    }
    @DeleteMapping("/id/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id)throws UserException{
        userService.deleteUser(id);
        return new ResponseEntity<>("User Deleted",HttpStatus.ACCEPTED);
    }
}