package com.greenbus.music.controller;

import com.greenbus.music.model.Song;
import com.greenbus.music.model.User;
import com.greenbus.music.service.SongService;
import com.greenbus.music.service.UserService;
import com.greenbus.music.repository.SongRepository;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

	@Value("${music.local.root}")
    private String SAVE_PATH_ROOT; 
	@Value("${music.local.song}")
    private String SAVE_PATH; 
    @Value("${music.local.cover}")
    private String SAVE_PATH_COVER; 
	
    @Autowired
    private SongService songService;

    @Autowired
    private UserService userService;

    @PostMapping("/upload")
    public ResponseEntity<Song> uploadSong(
            @RequestParam("title") String title,
            @RequestParam("artist") String artist,
            @RequestParam("album") String album,
			@RequestParam("genre") String genre, 	 	
            @RequestParam("file") MultipartFile file,
            @RequestParam("coverImage") MultipartFile coverImage,
            @RequestParam("userId") Long userId) {
    	
    	String fileNameAndType = file.getOriginalFilename();
    	String coverFile = coverImage.getOriginalFilename();
    	
    	String localPath = SAVE_PATH_ROOT+ SAVE_PATH + fileNameAndType;
    	String localCoverPath = SAVE_PATH_ROOT + SAVE_PATH_COVER + coverFile;
    	
    	String path =  fileNameAndType;
    	String coverPath = coverFile;
    	
        try {
            File dest = new File(localPath);
	    	if(!dest.exists()) {
	    		dest.mkdir();
	    	}
    	
	    	File cover_dest = new File(localCoverPath);
	    	if(!cover_dest.exists()) {
	    		cover_dest.mkdir();
	    	}
			
			file.transferTo(dest);
			coverImage.transferTo(cover_dest);

            User user = userService.findById(userId);
//            if (user == null) {
//                return ResponseEntity.status(400).body(null); // User not found
//            }
			
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    	String uploadTime  = sf.format(new Date());

			if(songService.findSongByNameAndArtist(title, artist) == null) {
				
				Song song = new Song(userId, title, artist, album, genre, coverPath, path, uploadTime);
				        		
				return ResponseEntity.ok(songService.insertSong(song));
	        	
			} else {
			    return ResponseEntity.ok(null);
			}
            
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
		}
    }
	
	/**
     * 
     * @param order id, title, album, artist, genre, upload_date
     * @param keyword
     * @return
     */
    @PostMapping("/list")
    public ResponseEntity<List<Song>> findSongs(@RequestParam("userId") long userId,
    											@RequestParam("order") String order,
    											@RequestParam("keyword") String keyword){
    	
    	List<Song> songs = new ArrayList<Song>();
    	
    	if(keyword == null || "".equals(keyword)) {
    		songs = songService.findSongsByUserId(userId,order);
    	}else {
    		songs = songService.findSongsByUserIdAndKeyword(userId, keyword, order);
    	}
    	
		return ResponseEntity.ok(songs);
    	
    }

    
    @DeleteMapping("/{songId}")
    public ResponseEntity<Void> deleteSong(@PathVariable Long songId) {
    	Optional<Song> song = songService.findSongById(songId);
    	boolean deleted = false;
    	if(song.isPresent()) {
    		deleted = songService.deleteSong(song.get());
    	}
     
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        System.out.println("hhhh");
    	
        return ResponseEntity.ok("hhhh");
    }
}
