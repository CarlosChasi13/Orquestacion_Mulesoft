package com.mulesoft.mulesoft.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * 1) Cadena de filtros de seguridad: 
     *    - Deshabilita CSRF (no hay sesión ni cookies)
     *    - Habilita CORS (configuración abajo)
     *    - Permite TODOS los accesos a /api/** y /mock/**
     *    - Para cualquier otro endpoint, podrían requerir auth (si lo deseas)
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
          // deshabilita CSRF porque no vas a usar formularios ni cookies
          .csrf(csrf -> csrf.disable())
          // habilita CORS con la configuración definida más abajo
          .cors(Customizer.withDefaults())
          // configuración de acceso
          .authorizeHttpRequests(auth -> auth
              .requestMatchers(
                  "/api/**", 
                  "/mock/**",
                  "/mock/**/cancelar"   // incluye cancelaciones
              ).permitAll()
              .anyRequest().authenticated()
          )
          // deshabilita login por formulario y basic auth
          .httpBasic(basic -> basic.disable())
          .formLogin(form -> form.disable())
        ;
        return http.build();
    }

    /**
     * 2) Configuración global de CORS: 
     *    - Orígenes: *, Métodos: GET,POST,PUT,DELETE,OPTIONS, Headers: *
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(List.of("*"));
        cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        cfg.setAllowedHeaders(List.of("*"));
        cfg.setAllowCredentials(false); // no estamos usando cookies
        // Aplica a todas las rutas
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }
}
