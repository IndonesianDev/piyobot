const fs = require("fs-extra");
const { apikey } = JSON.parse(fs.readFileSync("./settings/setting.json"));
const api = require("caliph-api");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { fetchJson, getBuffer } = require("../lib/fetcher");
const ffmpeg = require("fluent-ffmpeg");

function getRandomFile(extension) {
  const randomString = Math.random().toString(36).substring(7);
  return `${randomString}.${extension}`;
}

const igStalk = (user) =>
  new Promise((resolve, reject) => {
    fetchJson("https://skizo.tech/api/igstalk?user=" + user + "&apikey=piyo")
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });

const pinterest = (query) =>
  new Promise((resolve, reject) => {
    fetchJson(
      "https://skizo.tech/api/pinterest?search=" + query + "&apikey=piyo"
    )
      .then((result) => resolve(result[0]))
      .catch((err) => reject(err));
  });

const toAudio = (filePath, outputFileName) =>
  new Promise((resolve, reject) => {
    try {
      exec(
        `ffmpeg -i ${filePath} -vn -ar 44100 -ac 2 -ab 192K -f mp3 ${outputFileName}`,
        async (error, stdout, stderr) => {
          if (error) {
            fs.unlinkSync(filePath);
            fs.unlinkSync(outputFileName);
            return reject("*☒* Gagal membaca file MP3");
          }
          const data = fs.readFileSync(outputFileName);
          await resolve(data);
          fs.unlinkSync(filePath);
          fs.unlinkSync(outputFileName);
        }
      );
    } catch (error) {
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputFileName);
      return reject("*☒* Gagal membaca file MP3");
    }
  });

const toImage = (filePath, outputFileName) =>
  new Promise(async (resolve, reject) => {
    try {
      exec(
        `ffmpeg -i ${filePath} ${outputFileName}`,
        async (error, stdout, stderr) => {
          if (error) {
            fs.unlinkSync(filePath);
            fs.unlinkSync(outputFileName);
            return reject("*☒* Gagal membaca file WEBP");
          }
          const data = fs.readFileSync(outputFileName);
          await resolve(data);
          fs.unlinkSync(filePath);
          fs.unlink(outputFileName);
        }
      );
    } catch (error) {
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputFileName);
      return reject("*☒* Gagal membaca file WEBP");
    }
  });

const bassAudio = (filePath, outputFileName) =>
  new Promise(async (resolve, reject) => {
    try {
      exec(
        `ffmpeg -i ${filePath} -af equalizer=f=94:width_type=o:width=2:g=30 ${outputFileName}`,
        async (error, stdout, stderr) => {
          if (error) {
            fs.unlinkSync(filePath);
            fs.unlinkSync(outputFileName);
            return reject("*☒* Gagal membaca file Audio");
          }
          const data = fs.readFileSync(outputFileName);
          await resolve(data);
          fs.unlinkSync(filePath);
          fs.unlink(outputFileName);
        }
      );
    } catch (error) {
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputFileName);
      return reject("*☒* Gagal membaca file Audio");
    }
  });

module.exports = {
  igStalk,
  toAudio,
  toImage,
  bassAudio,
};
