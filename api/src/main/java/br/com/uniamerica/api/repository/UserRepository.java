package br.com.uniamerica.api.repository;

import br.com.uniamerica.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    @Query("FROM User  users WHERE users.id =: userId")
    public String getNameById(@Param("userId") UUID userId);
}
