const { default: axios } = require("axios");
const fs = require("fs");
const path = require("path");
const apiKey = "dq8tYKFdG7w9rO77nfhMiQcOhuSR79bs";
async function fetchSite(domain) {
  try {
    let response = await axios.get(`https://${domain}`);
    if (response.data) {
      console.log(domain);
    }
  } catch (error) {
  } finally {
    return console.log("ended function");
  }
}
function sortDomains(domains, rootDomain) {
  for (let i = 0; i < domains.subdomains.length; i++) {
    console.log(domains.subdomains[i] + "." + rootDomain);
  }
  console.log("-=== finished Searching ====-");
}
async function getSubDomainData(domain, keys, index) {
  if (index == keys.length)
    return console.log("Failed to load data \n Try with new Api Keys ");
  axios
    .get(`https://api.securitytrails.com/v1/domain/${domain}/subdomains`, {
      headers: {
        APIKEY: keys[index],
      },
    })
    .then((response) => {
      const subdomains = response.data;
      return sortDomains(subdomains, domain);
    })
    .catch(async (error) => {
      console.log("Error happened");
      return await getSubDomainData(domain, keys, index++);
    });
}
async function ReadFile() {
  try {
    let data = fs.readFileSync(__dirname + "/names.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function FindByNames(domain) {
  let data = await ReadFile();
  for (let i = 0; i < data.length; i++) {
    let newDomain = data[i] + "." + domain;
    await fetchSite(newDomain);
  }
  console.log("finished searching");
}

async function getStDomains(domain) {
  let apiKeys, keys;
  try {
    apiKeys = fs.readFileSync(__dirname + "/apikeys.json", "utf-8");
    apiKeys = JSON.parse(apiKeys);
    keys = apiKeys.keys;
  } catch (error) {
    console.log(error);
  }

  console.log("Searching subdomains...");
  getSubDomainData(domain, keys, 0);
}

function addApiKey(key) {
  let apiKeys;
  try {
    apiKeys = fs.readFileSync(__dirname + "/apikeys.json", "utf-8");
    apiKeys = JSON.parse(apiKeys);
  } catch (error) {
    console.log(error);
  }
  if (apiKeys) {
    if (apiKeys.keys.includes(key))
      return console.log("Api key already exists");
    apiKeys.keys.push(key);
    try {
      fs.writeFileSync(
        __dirname + "/apikeys.json",
        JSON.stringify(apiKeys),
        "utf-8"
      );
      console.log("Api key added");
    } catch (error) {
      console.log("error: ", error);
    }
  }
}

function removeApiKey(key) {
  let apiKeys;
  try {
    apiKeys = fs.readFileSync(__dirname + "/apikeys.json", "utf-8");
    apiKeys = JSON.parse(apiKeys);
  } catch (error) {
    console.log(error);
  }
  if (apiKeys) {
    if (!apiKeys.keys.includes(key))
      return console.log("Api key does not exists");
    let filteredArray = apiKeys.keys.filter((ele) => ele != key);
    apiKeys.keys = filteredArray;
    try {
      fs.writeFileSync(
        __dirname + "/apikeys.json",
        JSON.stringify(apiKeys),
        "utf-8"
      );
      console.log("Api key Removed");
    } catch (error) {
      console.log("error: ", error);
    }
  }
}

function resetApiKey() {
  let apiKeys = { keys: [] };
  try {
    fs.writeFileSync(
      __dirname + "/apikeys.json",
      JSON.stringify(apiKeys),
      "utf-8"
    );
    console.log("Successfully  reset api keys");
  } catch (error) {
    console.log("error: ", error);
  }
}

function allApiKeys() {
  let apiKeys;
  try {
    apiKeys = fs.readFileSync(__dirname + "/apikeys.json", "utf-8");
    console.log(apiKeys);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getStDomains,
  FindByNames,
  addApiKey,
  removeApiKey,
  resetApiKey,
  allApiKeys,
};
