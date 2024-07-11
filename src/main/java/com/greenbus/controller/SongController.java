package com.greenbus.controller;

import com.greenbus.service.SongService;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.greenbus.model.Song;
import com.greenbus.repository.SongRepository;

@RestController
@RequestMapping("/api/song")
public class SongController {
	
    @Autowired
    private SongService songService;

    @Value("${music.local.song}")
    private String SAVE_PATH; 
    @Value("${music.local.cover}")
    private String SAVE_PATH_COVER; 

    @PostMapping("/upload")
    public ResponseEntity<String> uploadSong(@RequestParam String artist,
									    	 @RequestParam String album,
									    	 @RequestParam String genre,
									    	 @RequestPart("cover") MultipartFile cover,
    										 @RequestPart("filename") MultipartFile file,
    										 HttpServletRequest request) {
        
    	String fileNameAndType = file.getOriginalFilename();
    	String coverFile = cover.getOriginalFilename();
    	
    	String path = SAVE_PATH + fileNameAndType;
    	String coverPath = SAVE_PATH_COVER + coverFile;
    	
    	File dest = new File(path);
    	if(!dest.exists()) {
    		dest.mkdir();
    	}
    	
    	File cover_dest = new File(coverPath);
    	if(!cover_dest.exists()) {
    		cover_dest.mkdir();
    	}
    	
    	try {
			file.transferTo(dest);
			cover.transferTo(cover_dest);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok("upload song failed.");
		}
    	String title = fileNameAndType.substring(0,fileNameAndType.lastIndexOf("."));
    	
    	SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	String uploadTime  = sf.format(new Date());
    	
    	if(songService.findSongByNameAndArtist(title, artist) == null) {
    		Song song = new Song(1, title, artist, album, genre, coverPath, path, uploadTime );
        	if(songService.insertSong(song)>0) {
        		return ResponseEntity.ok("upload song success.");
        	}else {
        		return ResponseEntity.ok("failed to save to Database");
        	}
    	}else {
    		return ResponseEntity.ok("song already uploaded.");
    	}
    }
    
    @PostMapping("/list/{userId}")
    public ResponseEntity<List<Song>> findSongsByUserId(@PathVariable Long userId){
    	List<Song> songs = songService.findSongsByUserId(userId);
    	
		return ResponseEntity.ok(songs);
    	
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        System.out.println("hhhh");
    	
        return ResponseEntity.ok("hhhh");
    }

   
}
