package com.greenbus.service;

import com.greenbus.model.User;
import com.greenbus.model.Song;
import com.greenbus.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SongService {

    @Autowired
    private SongRepository songRepository;
    
    public Song findSongByNameAndArtist(String title, String artist) {
    	Song song = songRepository.findByTitleAndArtist(title, artist);
    	if(song!=null) {
    		System.out.println("find song = "+ song.toString());
    	}
    	return song;
    }
    
    public List<Song> findSongsByUserId(long userId) {
    	List<Song> songs = songRepository.findByUserId(userId);
    	if(songs.size()<=0) {
    		System.out.println("user didn't uploaded yet.");
    	}
    	return songs;
    }
 
    public long insertSong(Song song) {
    	Song newsong = songRepository.save(song);
    	System.out.println("inserted song = "+ newsong.toString());
    	return newsong.getId();
        // Save song to the database
    	//return songMapper.insertSong(song.getTitle(), song.getAlbum(), song.getAudioRef(), song.getAudioLink(), song.getArtRefString(), song.getUploadTime(),1);
    }

}
