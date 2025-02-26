selenium IDE -
https://www.selenium.dev/selenium-ide/docs/en/introduction/getting-started

### Steps

- install selenium IDE for chrome
- create a project and record actions
- export the project as a java file
- setup Java IDE to work with the project & debug/enhance
  - Spring initializer to initialize the repo
  - go to [maven repository](https://mvnrepository.com/) to find selenium

**Selenium IDE used junit4 to generate the testcase. I found that JUnit5 has major changes. I had to use JUnit5 and modify the selenium code to get it to work. Here is the [conversation](./RESOURCE/junit%204vs5.md)**

Even after fixing junit4 problem, I was still having issue. Later I gave my pom.xml and java test file to chatgpt to fix this.

One interesting conversation about maintaining the chrome webdriver took place - [see it here](./RESOURCE/maintain%20webdriver.md)
