package com.greenbus.music.service;

import com.greenbus.music.model.Song;
import com.greenbus.music.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    
    /**
     * 
     * @param userId
     * @param order  1 - upload_date, 2 - title, 3 - album, 4 - artist, 5 - genre
     * @return
     */
    public List<Song> findSongsByUserId(long userId, int order) {
    	List<Song> songs = new ArrayList<Song>();
    	switch(order) {
    	case 1:
    		songs = songRepository.findByUserIdOrderByUploadDateDesc(userId);
    		break;
    	case 2:
    		songs = songRepository.findByUserIdOrderByTitleAsc(userId);
    		break;
    	case 3:
    		songs = songRepository.findByUserIdOrderByAlbumAsc(userId);
    		break;
    	case 4:
    		songs = songRepository.findByUserIdOrderByArtistAsc(userId);
    		break;
    	case 5:
    		songs = songRepository.findByUserIdOrderByGenreAsc(userId);
    		break;
    	}
    	if(songs.size()<=0) {
    		System.out.println("user didn't uploaded yet.");
    	}
    	return songs;
    }
    /**
     * 
     * @param userId
     * @param keyword
     * @param order  1 - upload_date, 2 - title, 3 - album, 4 - artist, 5 - genre
     * @return
     */
    public List<Song> findSongsByUserIdAndKeyword(long userId, String keyword, int order) {
    	List<Song> songs = new ArrayList<Song>();
    	
    	switch(order) {
    	case 1:
    		songs = songRepository.findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByUploadDateDesc(userId, keyword, keyword, keyword, keyword);
    		break;
    	case 2:
    		songs = songRepository.findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByTitleAsc(userId, keyword, keyword, keyword, keyword);
    		break;
    	case 3:
    		songs = songRepository.findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByAlbumAsc(userId, keyword, keyword, keyword, keyword);
    		break;
    	case 4:
    		songs = songRepository.findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByArtistAsc(userId, keyword, keyword, keyword, keyword);
    		break;
    	case 5:
    		songs = songRepository.findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByGenreAsc(userId, keyword, keyword, keyword, keyword);
    		break;
    	}
    	if(songs.size()<=0) {
    		System.out.println("songs didn't found.");
    	}
    	return songs;
    }
    
    public Optional<Song> findSongById(long Id) {
    	Optional<Song> song = songRepository.findById(Id);
    	if(song==null) {
    		System.out.println("didn't found the song.");
    	}
    	return song;
    }
    public Song insertSong(Song song) {
    	Song newsong = songRepository.save(song);
    	System.out.println("inserted song = "+ newsong.toString());
    	return newsong;
        // Save song to the database
    	//return songMapper.insertSong(song.getTitle(), song.getAlbum(), song.getAudioRef(), song.getAudioLink(), song.getArtRefString(), song.getUploadTime(),1);
    }
    
    public String deleteSong(long id) {
    	try {
	    	songRepository.deleteById(id);
	    	System.out.println("delete song id = "+ id);
    	}catch(Exception e) {
    		return "fail";
    	}
    	return "success";
    }
    
    public Boolean deleteSong(Song song) {
    	try {
	    	songRepository.delete(song);
	    	System.out.println("delete song  = "+ song);
    	}catch(Exception e) {
    		return false;
    	}
    	return true;
    }




}
