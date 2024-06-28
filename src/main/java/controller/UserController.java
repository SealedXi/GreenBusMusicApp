package controller;

import model.User;
import service.UserService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestParam String email, @RequestParam String password) {
        User user = userService.authenticateUser(email, password);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).build(); // Unauthorized
    }
    
    @GetMapping("/{id}")
    public String getUserProfile(@PathVariable Long id, Model model) {
        Optional<User> user = userService.findById(id);
        if (user.isPresent()) {
            model.addAttribute("username", user.get().getUsername());
            model.addAttribute("email", user.get().getEmail());
            return "profile"; // This will render profile.html template
        } else {
            return "error"; // Return an error page if user is not found
        }
    }
}
