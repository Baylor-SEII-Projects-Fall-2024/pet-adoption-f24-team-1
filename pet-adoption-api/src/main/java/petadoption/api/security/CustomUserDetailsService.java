package petadoption.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdmin;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdminRepository;
import petadoption.api.user.User;
import petadoption.api.user.UserRepository;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;
    private AdoptionCenterAdminRepository adminRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository, AdoptionCenterAdminRepository adminRepository) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Using findByEmail since emails are used as usernames
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return new org.springframework.security.core.userdetails.User(user.get().getEmail(), user.get().getPassword(), Collections.singleton(new SimpleGrantedAuthority(user.get().getRole())));
        }

        Optional<AdoptionCenterAdmin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent()) {
            return new org.springframework.security.core.userdetails.User(admin.get().getEmail(), admin.get().getPassword(), Collections.singleton(new SimpleGrantedAuthority(admin.get().getRole())));
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
