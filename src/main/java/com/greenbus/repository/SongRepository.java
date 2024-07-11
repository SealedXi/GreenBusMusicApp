package com.greenbus.repository;

import com.greenbus.model.Song;
import com.greenbus.model.User;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SongRepository extends JpaRepository<Song, Long> {

    //Song getSongById(long id);  
	Song findByTitleAndArtist(String title, String artist);
	
	List<Song> findByUserId(long userid);
}
