const fs = require("fs-extra");
const { apikey } = JSON.parse(fs.readFileSync("./settings/setting.json"));
const api = require("caliph-api");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { fetchJson, getBuffer } = require("../lib/fetcher");
const ffmpeg = require("fluent-ffmpeg");

const youtube = (url, tipe) =>
  new Promise((resolve, reject) => {
    fetchJson("https://skizo.tech/api/y2mate?url=" + url + "&apikey=piyo")
      .then((result) => resolve(tipe === 'audio' ? result.audio[0] : result.video[0]))
      .catch((err) => reject(err));
  });

const tiktok = (url) => 
  new Promise((resolve, reject) => {
    fetchJson("https://skizo.tech/api/tiktok?url=" + url + "&apikey=piyo")
    .then((result) => resolve(tipe === 'audio' ? result.data.music : result.data.hdplay))
    .catch((err) => reject(err));
  })

const instagram = (url) =>
  new Promise(async (resolve , reject) => {
    fetchJson("https://skizo.tech/api/igdl?url=" + url + "&apikey=piyo")
    .then((result) => resolve(result))
    .catch((err) => reject(err));
  })

const twitter = (url) =>
  new Promise(async (resolve, reject) => {
    fetchJson("https://skizo.tech/api/twitterdl?url=" + url + "&apikey=piyo")
    .then((result) => resolve(result))
    .catch((err) => reject(err))
  })

  const facebook = (url) =>
  new Promise(async (resolve, reject) => {
    fetchJson("https://skizo.tech/api/facebook?url=" + url + "&apikey=piyo")
    .then((result) => resolve(result))
    .catch((err) => reject(err))
  })

module.exports = {
    youtube,
    tiktok,
    facebook,
    instagram,
    twitter
}