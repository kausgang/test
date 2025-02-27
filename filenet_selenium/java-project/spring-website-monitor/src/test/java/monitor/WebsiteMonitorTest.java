package monitor;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class WebsiteMonitorTest {

//    @Value("${spring.application.url}")
//    private String url;

//    @Autowired
//    private Environment environment;
//    private String url;



    @Test
    void testWebsiteReachability() {
//        assertTrue(WebsiteMonitor.checkWebsiteAvailability("https://tretmstfnet0.tmis.treas.state.nj.us/"));
//        assertEquals(true, new WebsiteMonitor().checkWebsiteAvailability(url));

    }

    @Test
    void testSSLCertificate() {
//        assertTrue(WebsiteMonitor.checkSSLCertificate());
//        assertTrue(new WebsiteMonitor().checkSSLCertificate());

    }

//    @Test
//    void testHTMLElementPresence() {
//        assertTrue(WebsiteMonitor.checkHTMLElementPresence());
//    }
}
