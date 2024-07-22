package com.greenbus.music.repository;

import com.greenbus.music.model.Song;
import com.greenbus.music.model.User;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SongRepository extends JpaRepository<Song, Long> {

    //Song getSongById(long id);  
	Song findByTitleAndArtist(String title, String artist);
	
	List<Song> findByUserId(long userid);
	
	List<Song> findByUserIdOrderByIdDesc(long userid);
	
	List<Song> findByUserIdOrderByUploadDateDesc(long userid);
	
	List<Song> findByUserIdOrderByTitleAsc(long userid);

	List<Song> findByUserIdOrderByAlbumAsc(long userId);

	List<Song> findByUserIdOrderByArtistAsc(long userId);

	List<Song> findByUserIdOrderByGenreAsc(long userId);
	

	List<Song> findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByIdDesc(
			long userId, String keyword, String keyword2, String keyword3, String keyword4);
	
	List<Song> findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByUploadDateDesc(
			long userId, String keyword, String keyword2, String keyword3, String keyword4);

	List<Song> findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByTitleAsc(
			long userId, String keyword, String keyword2, String keyword3, String keyword4);

	List<Song> findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByAlbumAsc(
			long userId, String keyword, String keyword2, String keyword3, String keyword4);

	List<Song> findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByArtistAsc(
			long userId, String keyword, String keyword2, String keyword3, String keyword4);

	List<Song> findByUserIdAndTitleContainingOrAlbumContainingOrArtistContainingOrGenreContainingOrderByGenreAsc(
			long userId, String keyword, String keyword2, String keyword3, String keyword4);
	
}
