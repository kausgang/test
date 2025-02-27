package gov.njdpb.spring_website_monitor;


//import com.sun.org.apache.xpath.internal.operations.String;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Component;

import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;

//@Service
@Component
public class WebsiteMonitor {

    @Value("${url}")
    private  String url;


    @Value("${url}")
public  void checkWebsiteStatus() {


        System.out.println("URL is - " + url);
        checkWebsiteAvailability(url);
        checkSSLCertificate(url);
    }

//    public static boolean checkWebsiteAvailability(String url) {
public boolean checkWebsiteAvailability(String url) {

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {



            HttpGet request = new HttpGet(url);

            try (CloseableHttpResponse response = httpClient.execute(request)) {
                int statusCode = response.getStatusLine().getStatusCode();
                System.out.println("HTTP Status Code: " + statusCode);

                HttpEntity entity = response.getEntity();
                if (entity != null) {
                    String responseBody = EntityUtils.toString(entity);
                    System.out.println("Response Body: " + responseBody.substring(0, Math.min(responseBody.length(), 200)) + "..."); // Print only first 200 chars
                }
                return true;
            }
        } catch (Exception e) {
            System.err.println("Error checking website: " + e.getMessage());
            return false;
        }
    }

//    public static boolean checkSSLCertificate() {
public boolean checkSSLCertificate(String url) {

        try {
            String hostname = url.replace("https://", "").replace("http://", "").split("/")[0];
            SSLSocketFactory factory = (SSLSocketFactory) SSLSocketFactory.getDefault();
            try (SSLSocket socket = (SSLSocket) factory.createSocket(hostname, 443)) {
                socket.startHandshake();
                SSLSession session = socket.getSession();
//                Date expiryDate = session.getPeerCertificateChain()[0].getNotAfter();

//                MY CODE
//                Certificate c = session.getPeerCertificates()[0];
                Certificate c = session.getPeerCertificates()[0];
                X509Certificate xc = (X509Certificate)c; // we should really check the type beore doing this typecast..
                String dn = xc.getSubjectDN().getName();
                System.out.println(xc.getNotAfter());
                Date expiresOn= xc.getNotAfter();
                Date now = new Date();
                System.out.println((expiresOn.getTime()-now.getTime()) /(1000*60*60*24));
                Long days_left = (expiresOn.getTime()-now.getTime()) /(1000*60*60*24);


                if (days_left>0) {
                    System.out.println("✅ SSL certificate is valid until " + expiresOn);
                    return true;
                } else {
                    System.out.println("❌ SSL certificate has expired on " + expiresOn);
                    return false;
                }
            }
        } catch (Exception e) {
            System.out.println("⚠️ Could not check SSL certificate: " + e.getMessage());
            return false;
        }
    }

}
