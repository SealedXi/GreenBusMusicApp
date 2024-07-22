package com.greenbus.music.model;



import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

import jakarta.persistence.*;

@Entity
@Table(name = "song")
public class Song {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false, length = 11)
    private long userId;
	
	@Column(nullable = false, length = 50)
    private String title;
	
	@Column(nullable = true, length = 50)
    private String artist;
	
	@Column(nullable = true, length = 50)
    private String album;
	
	@Column(nullable = true, length = 50)
    private String genre;
	
	@Column(nullable = true, length = 1000)
    private String cover;
	
	@Column(nullable = true, length = 1000)
    private String filePath;
	
	@Column(nullable = false, length = 30)
    private String uploadDate;
	
    public static String sortType;

    public Song(){}

    public Song(long userId, String title, String artist, String album, String genre, String cover, String filePath, String uploadDate ) {
        this.userId = userId;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.genre = genre;
        this.cover = cover; 
        this.filePath = filePath;
        this.uploadDate = uploadDate;
    }

    	

    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(String uploadDate) {
		this.uploadDate = uploadDate;
	}

	@Override
	public String toString() {
		return "Song [id=" + id + ", userId=" + userId + ", title=" + title + ", artist=" + artist + ", album=" + album
				+ ", genre=" + genre + ", cover=" + cover + ", filePath=" + filePath + ", uploadDate=" + uploadDate
				+ "]";
	}
    
	

}
