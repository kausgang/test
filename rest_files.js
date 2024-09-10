const axios = require("axios");

// Repository details and commit SHA
const REPO_OWNER = "kausgang"; // Replace with your GitHub repository owner (username or organization)
const REPO_NAME = "test"; // Replace with your GitHub repository name
const COMMIT_SHA = process.env.GITHUB_SHA;
GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Function to get changed files in a commit
async function getChangedFiles(commitSha) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits/${COMMIT_SHA}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const files = response.data.files.map((file) => {
      return {
        filename: file.filename,
        status: file.status,
      };
    });
    // const files = response.data.files.map((file) => file.filename);
    return files;
  } catch (error) {
    console.error(
      "Error fetching commit details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function getSalesforceAccessToken() {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", process.env.SF_CLIENT_ID);
  params.append("client_secret", process.env.SF_CLIENT_SECRET);
  // params.append('username', process.env.SF_USER_NAME);
  // params.append('password', process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN);
  // params.append('redirect_uri', process.env.SF_CALLBACK_URL);

  try {
    const response = await axios.post(process.env.SF_TOKEN_URL, params);
    return response.data.access_token;
  } catch (error) {
    console.error("Error obtaining Salesforce access token:", error);
    throw error;
  }
}

async function createSalesforceRecord(accessToken, fileName, filePath) {
  const { file, status } = fileName;

  console.log("file =", file, " status= ", status);

  const record = {
    name__c: fileName,
    path__c: "/techdoc/q & a",
  };

  //   try {
  //     await axios.post(
  //       `${process.env.SF_DOMAIN}/services/data/v61.0/sobjects/techdoc__c`,
  //       record,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(`Record created for ${fileName}`);
  //   } catch (error) {
  //     console.error(`Error creating Salesforce record for ${fileName}:`, error);
  //   }
}

const main = async () => {
  // get the updated files
  const files = await getChangedFiles(COMMIT_SHA);

  //   //   get access token
  //   const accessToken = await getSalesforceAccessToken();

  //   console.log(accessToken);

  files.map(
    async (file) => await createSalesforceRecord(accessToken, file, "")
  );

  console.log(files);
};

main().catch((error) => {
  console.error("Error in Salesforce integration:", error);
  process.exit(1);
});
