package com.glowlink.marketplace.Service.Impl;

import com.glowlink.marketplace.Model.User;
import com.glowlink.marketplace.Repository.UserRepository;
import com.glowlink.marketplace.Service.UserService;
import com.glowlink.marketplace.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long id) throws UserException {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserException("User not found"));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long id) throws UserException {
        Optional<User>otp=userRepository.findById(id);
        if(otp.isEmpty()){
            throw new UserException("User Not Found with id"+id);
        }
        userRepository.deleteById(otp.get().getId());
    }

    @Override
    public User updateUser(Long id, User user) throws UserException {
        Optional<User> otp=userRepository.findById(id);
        if(otp.isEmpty()){
            throw new UserException("user not found with id"+id);
        }
        User existingUser=otp.get();
        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());
        existingUser.setRole(user.getRole());
        existingUser.setUsername(user.getUsername());
        return userRepository.save(existingUser);
    }
}
