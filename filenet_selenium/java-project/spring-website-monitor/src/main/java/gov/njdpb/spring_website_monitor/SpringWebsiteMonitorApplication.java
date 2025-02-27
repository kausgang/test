package gov.njdpb.spring_website_monitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

//import static monitor.WebsiteMonitor.checkWebsiteStatus;

@SpringBootApplication
//@ComponentScan(basePackages = "gov.service")
public class SpringWebsiteMonitorApplication {

//	@Autowired
//	private static WebsiteMonitor websiteMonitor;

	public static void main(String[] args) {

		ConfigurableApplicationContext context = SpringApplication.run(SpringWebsiteMonitorApplication.class, args);
		WebsiteMonitor websiteMonitor = context.getBean(WebsiteMonitor.class);
		websiteMonitor.checkWebsiteStatus();
	}

//	@Override
//	public void run(String... args) throws Exception {
//		// This will invoke the static method checkWebsiteStatus() from WebsiteMonitor
//		WebsiteMonitor.checkWebsiteStatus();
//	}
}
