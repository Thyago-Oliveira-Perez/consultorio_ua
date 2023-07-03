package br.com.uniamerica.api.config.security;

import br.com.uniamerica.api.entity.User;
import br.com.uniamerica.api.repository.UserRepository;
import br.com.uniamerica.api.service.UserService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthRequestFilter extends OncePerRequestFilter {
    private String requestHeader = "Authorization";
    private String AuthenticationType = "Bearer ";

    private UserService userService;

    private UserRepository usuarioRepository;

    public AuthRequestFilter(UserService tokenService, UserRepository usuarioRepository) {
        this.userService = tokenService;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = getTokenFromRequest(request);

        boolean isTokenValid = userService.isTokenValid(token);

        if (isTokenValid) {
            authUser(token);
        }

        filterChain.doFilter(request, response);
    }

    private void authUser(String token) {
        User user = usuarioRepository.findById(userService.getUserId(token)).get();
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private String getTokenFromRequest(HttpServletRequest request) {

        String token = request.getHeader(requestHeader);

        if(token == null || token.isEmpty() || !token.startsWith(AuthenticationType)){
            return null;
        }

        return token.substring(7, token.length());
    }
}
