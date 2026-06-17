package com.glowlink.marketplace.Repository;

import com.glowlink.marketplace.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
