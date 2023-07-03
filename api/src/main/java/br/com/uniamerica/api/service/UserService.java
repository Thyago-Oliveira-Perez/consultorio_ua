package br.com.uniamerica.api.service;

import br.com.uniamerica.api.entity.User;
import br.com.uniamerica.api.repository.security.AuthRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private AuthRepository authRepository;

    @Value("${passwordManager.jwt.expiration}")
    private String expirationDate;

    @Value("${passwordManager.jwt.secret}")
    private String secret;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> usuario = this.authRepository.findByLoginOrEmail(username);

        if(usuario.isPresent() && usuario.get().isAccountNonExpired()){
            return usuario.get();
        }else{
            return null;
        }
    }

    public String createToken(Authentication authentication){

        User user = (User)authentication.getPrincipal();
        Date validFrom = new Date();
        Date validUntil = new Date(validFrom.getTime() + Long.parseLong(expirationDate));

        return Jwts.builder()
                .setIssuer("API PasswordManager")
                .setSubject(user.getId().toString())
                .setIssuedAt(validFrom)
                .setExpiration(validUntil)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public boolean isTokenValid(String token){

        try{
            Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    public UUID getUserId(String token){
        Claims claim =  Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token).getBody();

        return UUID.fromString(claim.getSubject());
    }

    public String getUserName(Authentication authentication){
        User user = (User)authentication.getPrincipal();
        return user.getName();
    }
}
