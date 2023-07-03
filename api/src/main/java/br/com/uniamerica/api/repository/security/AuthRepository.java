package br.com.uniamerica.api.repository.security;

import br.com.uniamerica.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AuthRepository extends JpaRepository<User, UUID> {
    @Query("FROM User usuario WHERE usuario.email = :input OR usuario.name = :input")
    Optional<User> findByLoginOrEmail(@Param("input")String input);

}
