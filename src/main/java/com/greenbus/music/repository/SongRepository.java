package com.greenbus.music.repository;

import com.greenbus.music.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findByUserId(Long userId);
}
