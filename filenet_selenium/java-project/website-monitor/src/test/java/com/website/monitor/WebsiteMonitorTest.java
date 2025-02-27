package com.website.monitor;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class WebsiteMonitorTest {
    @Test
    void testWebsiteReachability() {
        assertTrue(WebsiteMonitor.checkWebsiteAvailability("https://tretmstfnet0.tmis.treas.state.nj.us/"));
    }

    @Test
    void testSSLCertificate() {
        assertTrue(WebsiteMonitor.checkSSLCertificate());
    }

//    @Test
//    void testHTMLElementPresence() {
//        assertTrue(WebsiteMonitor.checkHTMLElementPresence());
//    }
}
