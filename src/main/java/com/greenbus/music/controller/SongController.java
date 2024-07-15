package com.greenbus.music.controller;

import com.greenbus.music.model.Song;
import com.greenbus.music.model.User;
import com.greenbus.music.service.SongService;
import com.greenbus.music.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/songs")
public class SongController {

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private SongService songService;

    @Autowired
    private UserService userService;

    @PostMapping("/upload")
    public ResponseEntity<Song> uploadSong(
            @RequestParam("title") String title,
            @RequestParam("album") String album,
            @RequestParam("file") MultipartFile file,
            @RequestParam("coverImage") MultipartFile coverImage,
            @RequestParam("userId") Long userId) {

        try {
            // Save song file
            String filePath = saveFile(file);

            // Save cover image
            String coverImagePath = saveFile(coverImage);

            User user = userService.findById(userId);
            if (user == null) {
                return ResponseEntity.status(400).body(null); // User not found
            }

            Song song = new Song();
            song.setTitle(title);
            song.setAlbum(album);
            song.setFilePath(filePath);
            song.setCoverImagePath(coverImagePath);
            song.setUser(user);

            return ResponseEntity.ok(songService.uploadSong(song));
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Song>> getSongsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(songService.findByUserId(userId));
    }
    
    @DeleteMapping("/{songId}")
    public ResponseEntity<Void> deleteSong(@PathVariable Long songId) {
        boolean deleted = songService.deleteSong(songId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (!Files.exists(Paths.get(UPLOAD_DIR))) {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
        }
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR, fileName);
        Files.copy(file.getInputStream(), filePath);
        return filePath.toString();
    }
}
