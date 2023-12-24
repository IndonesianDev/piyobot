const fs = require("fs-extra");
const { apikey } = JSON.parse(fs.readFileSync("./settings/setting.json"));
const api = require("caliph-api");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { fetchJson, getBuffer } = require("../lib/fetcher");
const ffmpeg = require("fluent-ffmpeg");

const chord = (query) =>
  new Promise(async (resolve, reject) => {
    await api.search
      .chordlagu(query)
      .then((data) => {
        resolve(data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });

const artinama = (query) =>
  new Promise(async (resolve, reject) => {
    await api.search
      .artinama(query)
      .then((data) => {
        resolve(data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = {
    chord,
    artinama
}