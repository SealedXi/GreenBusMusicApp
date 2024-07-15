package com.greenbus.music.service;

import com.greenbus.music.model.Song;
import com.greenbus.music.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService {
    @Autowired
    private SongRepository songRepository;

    public Song uploadSong(Song song) {
        return songRepository.save(song);
    }

    public List<Song> findByUserId(Long userId) {
        return songRepository.findByUserId(userId);
    }
    
    public boolean deleteSong(Long songId) {
        if (songRepository.existsById(songId)) {
            songRepository.deleteById(songId);
            return true;
        }
        return false;
    }
}
