package gov.njdpb.spring_website_monitor;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class WebsiteMonitorTest {

    @Value("${url}")
    private  String url;

    @Autowired
    private WebsiteMonitor websiteMonitor;



    @Test
    void testWebsiteReachability() {
//        assertTrue(WebsiteMonitor.checkWebsiteAvailability("https://tretmstfnet0.tmis.treas.state.nj.us/"));
        assertEquals(true, websiteMonitor.checkWebsiteAvailability(url));

    }

    @Test
    void testSSLCertificate() {
//        assertTrue(WebsiteMonitor.checkSSLCertificate());
//        assertTrue(new WebsiteMonitor().checkSSLCertificate());
        assertEquals(true,websiteMonitor.checkSSLCertificate(url));

    }

//    @Test
//    void testHTMLElementPresence() {
//        assertTrue(WebsiteMonitor.checkHTMLElementPresence());
//    }
}
