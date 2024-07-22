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
     * @param order id, title, album, artist, genre, upload_date
     * @return
     */
    public List<Song> findSongsByUserId(long userId, String order) {
    	List<Song> songs = new ArrayList<Song>();
    	switch(order) {
    	case "upload_date":
    		songs = songRepository.findByUserIdOrderByUploadDateDesc(userId);
    		break;
    	case "title":
    		songs = songRepository.findByUserIdOrderByTitleAsc(userId);
    		break;
    	case "album":
    		songs = songRepository.findByUserIdOrderByAlbumAsc(userId);
    		break;
    	case "artist":
    		songs = songRepository.findByUserIdOrderByArtistAsc(userId);
    		break;
    	case "genre":
    		songs = songRepository.findByUserIdOrderByGenreAsc(userId);
    		break;
		default:
			songs = songRepository.findByUserIdOrderByIdDesc(userId);
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
     * @param order  id, title, album, artist, genre, upload_date
     * @return
     */
    public List<Song> findSongsByUserIdAndKeyword(long userId, String keyword, String order) {
    	List<Song> songs = new ArrayList<Song>();
    	
    	switch(order) {
    	case "upload_date":
    		songs = songRepository.findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByUploadDateDesc(userId, keyword, keyword, keyword, keyword);
    		break;
    	case "title":
    		songs = songRepository.findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByTitleAsc(userId, keyword, keyword, keyword, keyword);
    		break;
    	case "album":
    		songs = songRepository.findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByAlbumAsc(userId, keyword, keyword, keyword, keyword);
    		break;
    	case "artist":
    		songs = songRepository.findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByArtistAsc(userId, keyword, keyword, keyword, keyword);
    		break;
    	case "genre":
    		songs = songRepository.findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByGenreAsc(userId, keyword, keyword, keyword, keyword);
    		break;
    	default:
    		songs = songRepository.findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByIdDesc(userId, keyword, keyword, keyword, keyword);
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
