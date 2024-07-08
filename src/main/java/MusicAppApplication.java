import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication  // This annotation enables component scanning in its package and sub-packages
public class MusicAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(MusicAppApplication.class, args);
    }
}
