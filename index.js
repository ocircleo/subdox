#!/usr/bin/env node
const axios = require("axios");
const { Command } = require("commander");
const {
  FindByNames,
  getStDomains,
  addApiKey,
  removeApiKey,
  resetApiKey,
  allApiKeys,
} = require("./Functions");

const program = new Command();

program.name("subdox").description("A simple CLI tool to find subdomains").version("1.0.2");

program
  .command("test")
  .description("Test for cli")
  .action(() => {
    console.log(`Hello from subdox !`);
  });

program
  .command("find <domain>")
  .description("Find domain using  name file")
  .action((domain) => {
    console.log("Searching for ", domain);
    FindByNames(domain);
  });

program
  .command("find-st <domain>")
  .description("Find domain using securitytrails")
  .action((domain) => {
    getStDomains(domain);
  });

program
  .command("add-api-key <key>")
  .description("Add an api key (you can have multiple key)")
  .action((key) => {
    addApiKey(key);
  });
program
  .command("remove-api-key <key>")
  .description("Remove an api key")
  .action((key) => {
    removeApiKey(key);
  });
program
  .command("reset-api-key")
  .description("Reset all your api key")
  .action(() => {
    resetApiKey();
  });
program
  .command("all-api-key")
  .description("Show all api key")
  .action(() => {
    allApiKeys();
  });

program.parse(process.argv);
