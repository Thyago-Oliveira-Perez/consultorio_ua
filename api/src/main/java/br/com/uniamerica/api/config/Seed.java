package br.com.uniamerica.api.config;

import br.com.uniamerica.api.entity.User;
import br.com.uniamerica.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class Seed implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    protected UserRepository usersRepository;

    public void createDefaultUser(){

        if(this.usersRepository.count() <= 0){

            BCryptPasswordEncoder senha = new BCryptPasswordEncoder();

            User user = new User();

            user.setId(UUID.randomUUID());
            user.setName("root");
            user.setEmail("default@gmail.com");
            user.setPassword(senha.encode("root"));

            this.usersRepository.save(user);
        }
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        createDefaultUser();
    }
}
