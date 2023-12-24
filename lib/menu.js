const fs = require('fs-extra')
const {prefix} = JSON.parse(fs.readFileSync('./settings/setting.json'))

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.
Created By : https://github.com/AlvioAdjiJanuar
Created By : https://github.com/AlvioAdjiJanuar
*/

exports.textTnC = () => {
    return `
Whatsapp : wa.me/62895336148600
Author? : Alvio Adji Januar
Instagram: https://instagram.com/alvio151
Github: https://github.com/AlvioAdjiJanuar

Best regards, Alvio.`
}

exports.tutor = () => {
  return `
Info Penggunaanya :
/command
example : /ptl
atau jika ada yang harus pake kata kedua
/command teksnya
example : /igstalk usernamenya
  `
}

exports.menusystem = (pushname) => {
  return `
  ◪ *MENU SYSTEM*
  ❏ Hai Kak : ${pushname}
  ❏ Prefix: 「  ${prefix}  」

  ◪ 𝗦𝗬𝗦𝗧𝗘𝗠
  │
  ├─ ❏ ${prefix}ownerbot
  └─ ❏ ${prefix}ping
  `
}

exports.menumedia = (pushname) => {
  return `
  ◪ *MENU 𝗠𝗘𝗗𝗜𝗔*
  ❏ Hai Kak : ${pushname}
  ❏ Prefix: 「  ${prefix}  」

  ◪ 𝗠𝗘𝗗𝗜𝗔
  │
  ├─ ❏ ${prefix}igstalk
  ├─ ❏ ${prefix}tomp3
  ├─ ❏ ${prefix}toimg
  ├─ ❏ ${prefix}tomp4
  └─ ❏ ${prefix}bass
  `
}

exports.menutools = (pushname) => {
  return `
  ◪ *MENU TOOLS*
  ❏ Hai Kak : ${pushname}
  ❏ Prefix: 「  ${prefix}  」
  
  ◪ *TOOLS*
  │
  ├─ ❏ ${prefix}chord
  ├─ ❏ ${prefix}lirik
  └─ ❏ ${prefix}artinama
    `
}
exports.menuanime = (pushname) => {
  return `
  ◪ *MENU ANIME*
  ❏ Hai Kak : ${pushname}
  ❏ Prefix: 「  ${prefix}  」
  
  ◪ *ANIME*
  │
  ├─ ❏ ${prefix}loli
  ├─ ❏ ${prefix}lolivid
  ├─ ❏ ${prefix}wallnime
  ├─ ❏ ${prefix}husbu
  ├─ ❏ ${prefix}waifu
  ├─ ❏ ${prefix}neko
  ├─ ❏ ${prefix}anime
  ├─ ❏ ${prefix}shota
  ├─ ❏ ${prefix}manga
  ├─ ❏ ${prefix}megumin
  ├─ ❏ ${prefix}sagiri
  ├─ ❏ ${prefix}shinobu
  └─ ❏ ${prefix}nhentaipdf
`
}

exports.menueto = (pushname) => {
  return `
  ◪ *MENU ETO*
  ❏ Hai Kak : ${pushname}
  ❏ Prefix: 「  ${prefix}  」

  ◪ *EDUKASI* + *TOBAT*
  │
  ├─ ❏ ${prefix}nuliskiri
  ├─ ❏ ${prefix}nuliskanan
  ├─ ❏ ${prefix}jadwalshalat
  ├─ ❏ ${prefix}aLaudio
  ├─ ❏ ${prefix}kisahnabi
  ├─ ❏ ${prefix}asmaulhusna
  ├─ ❏ ${prefix}listsurah
  ├─ ❏ ${prefix}alquran
  ├─ ❏ ${prefix}wikipedia
  └─ ❏ ${prefix}brainly <query>`
}
exports.menusticker = (pushname) => {
  return `
  ◪ *MENU STICKER*
  ❏ Hai Kak : ${pushname}
  ❏ Prefix: 「  ${prefix}  」
  
  ◪ *STICKER*
  │
  ├─ ❏ ${prefix}sticker
  ├─ ❏ ${prefix}ttp
  ├─ ❏ ${prefix}ttp2
  ├─ ❏ ${prefix}ttp3
  ├─ ❏ ${prefix}ttp4
  ├─ ❏ ${prefix}attp
  ├─ ❏ ${prefix}findsticker
  ├─ ❏ ${prefix}telesticker
  └─ ❏ ${prefix}smoji
  `
}

exports.menudownloader = (pushname) => {
  return `
  ◪ *MENU DOWNLOADER*
  ❏ Hai Kak : ${pushname}
  ❏ Prefix: 「  ${prefix}  」
  
  ◪ 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥
  │
  ├─ ❏ ${prefix}youtube
  ├─ ❏ ${prefix}tiktok
  ├─ ❏ ${prefix}igdl
  ├─ ❏ ${prefix}igdl2
  ├─ ❏ ${prefix}twtdl
  ├─ ❏ ${prefix}fbdl
  └─ ❏ ${prefix}joox`
}

exports.menulogo = (pushname) => {
  return `
  ◪ *MENU LOGO*
  ❏ Hai Kak : ${pushname}
  ❏ Prefix: 「  ${prefix}  」
  
  ◪ 𝗟𝗢𝗚𝗢
  │
  ├─ ❏ ${prefix}blackpink
  ├─ ❏ ${prefix}neon
  ├─ ❏ ${prefix}greenneon
  ├─ ❏ ${prefix}advanceglow
  ├─ ❏ ${prefix}futureneon
  ├─ ❏ ${prefix}sandwriting
  ├─ ❏ ${prefix}sandsummer
  ├─ ❏ ${prefix}sandengraved
  ├─ ❏ ${prefix}metaldark
  ├─ ❏ ${prefix}neonlight
  ├─ ❏ ${prefix}text1917
  ├─ ❏ ${prefix}minion
  ├─ ❏ ${prefix}deluxesilver
  ├─ ❏ ${prefix}newyearcard
  ├─ ❏ ${prefix}bloodfrosted
  ├─ ❏ ${prefix}halloween
  ├─ ❏ ${prefix}jokerlogo
  ├─ ❏ ${prefix}fireworksparkle
  ├─ ❏ ${prefix}natureleaves
  ├─ ❏ ${prefix}bokeh
  ├─ ❏ ${prefix}toxic
  ├─ ❏ ${prefix}strawberry
  ├─ ❏ ${prefix}box3d
  ├─ ❏ ${prefix}roadwarning
  ├─ ❏ ${prefix}breakwall
  ├─ ❏ ${prefix}icecold
  ├─ ❏ ${prefix}luxury
  ├─ ❏ ${prefix}cloud
  ├─ ❏ ${prefix}summersand
  ├─ ❏ ${prefix}horrorblood
  ├─ ❏ ${prefix}thunder
  ├─ ❏ ${prefix}glitch
  ├─ ❏ ${prefix}avenger
  ├─ ❏ ${prefix}space
  ├─ ❏ ${prefix}ninjalogo
  ├─ ❏ ${prefix}marvelstudio
  ├─ ❏ ${prefix}lionlogo
  ├─ ❏ ${prefix}wolflogo
  ├─ ❏ ${prefix}steel3d
  ├─ ❏ ${prefix}wallgravity
  ├─ ❏ ${prefix}shadow
  ├─ ❏ ${prefix}cup
  ├─ ❏ ${prefix}cup1
  ├─ ❏ ${prefix}romance
  ├─ ❏ ${prefix}smoke
  ├─ ❏ ${prefix}burnpaper
  ├─ ❏ ${prefix}lovemessage
  ├─ ❏ ${prefix}undergrass
  ├─ ❏ ${prefix}love
  ├─ ❏ ${prefix}coffe
  ├─ ❏ ${prefix}woodheart
  ├─ ❏ ${prefix}woodenboard
  ├─ ❏ ${prefix}summer3d
  ├─ ❏ ${prefix}wolfmetal
  ├─ ❏ ${prefix}nature3d
  ├─ ❏ ${prefix}underwater
  ├─ ❏ ${prefix}golderrose
  ├─ ❏ ${prefix}summernature
  ├─ ❏ ${prefix}letterleaves
  ├─ ❏ ${prefix}glowingneon
  ├─ ❏ ${prefix}fallleaves
  ├─ ❏ ${prefix}flamming
  ├─ ❏ ${prefix}harrypotter
  ├─ ❏ ${prefix}carvedwood
  ├─ ❏ ${prefix}tiktok
  ├─ ❏ ${prefix}arcade8bit
  ├─ ❏ ${prefix}battlefield4
  ├─ ❏ ${prefix}pubg
  ├─ ❏ ${prefix}wetglass
  ├─ ❏ ${prefix}multicolor3d
  ├─ ❏ ${prefix}watercolor
  ├─ ❏ ${prefix}luxurygold
  ├─ ❏ ${prefix}galaxywallpaper
  ├─ ❏ ${prefix}lighttext
  ├─ ❏ ${prefix}beautifulflower
  ├─ ❏ ${prefix}puppycute
  ├─ ❏ ${prefix}royaltext
  ├─ ❏ ${prefix}heartshaped
  ├─ ❏ ${prefix}birthdaycake
  ├─ ❏ ${prefix}galaxystyle
  ├─ ❏ ${prefix}hologram3d
  ├─ ❏ ${prefix}greenneon
  ├─ ❏ ${prefix}glossychrome
  ├─ ❏ ${prefix}greenbush
  ├─ ❏ ${prefix}metallogo
  ├─ ❏ ${prefix}noeltext
  ├─ ❏ ${prefix}glittergold
  ├─ ❏ ${prefix}textcake
  ├─ ❏ ${prefix}starsnight
  ├─ ❏ ${prefix}wooden3d
  ├─ ❏ ${prefix}textbyname
  ├─ ❏ ${prefix}writegalacy
  ├─ ❏ ${prefix}galaxybat
  ├─ ❏ ${prefix}snow3d
  ├─ ❏ ${prefix}birthdayday
  ├─ ❏ ${prefix}freefire
  └─ ❏ ${prefix}ktpmaker
    `
}
exports.menugame = (pushname) => {
  return `
  ◪ *MENU GAME*
  ❏ Hai Kak : ${pushname}
  ❏ Prefix: 「  ${prefix}  」

  ◪ *GAME*
  │
  ├─ ❏ ${prefix}simi
  ├─ ❏ ${prefix}kuismtk
  ├─ ❏ ${prefix}tekateki
  └─ ❏ ${prefix}tebakgambar`
}

exports.menugrup = (pushname) => {
  return `
  ◪ *MENU GRUP*
  ❏ Hai Kak : ${pushname}
  ❏ Prefix: 「  ${prefix}  」
  
  ◪ 𝗚𝗥𝗢𝗨𝗣
  │
  ├─ ❏ ${prefix}mutegrup on|off
  ├─ ❏ ${prefix}promote
  ├─ ❏ ${prefix}demote
  ├─ ❏ ${prefix}profile
  ├─ ❏ ${prefix}kick
  ├─ ❏ ${prefix}del
  ├─ ❏ ${prefix}tagall
  ├─ ❏ ${prefix}apakah
  └─ ❏ ${prefix}bokep <premium>
   `
}

exports.listmenu = (pushname) => {
    return `
◪ 𝗜𝗡𝗙𝗢
❏ Hai Kak : ${pushname}
❏ Versi : 2.0.0
❏ Liberary : Baileys
❏ Creator: Alvio Adji Januar
❏ wa.me/6281414046576
❏ Donasi Yuk
❏ https://nyawer.co/piyobot
    
*LIST MENU Piyo*
[1]Menu System
[2]Menu Media
[3]Menu Tools
[4]Menu Anime
[5]Menu Eto
[6]Menu Sticker
[7]Menu Downloader
[8]Menu Logo
[9]Menu Game
[10]Menu Group

note : ketik angkanya sajaaa okeey sesuai dengan keinginan menunya
example : ${prefix}menu 1

◩ Piyo Whatsapp Bot ❤️ ◩`
}