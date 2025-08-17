const SoundCloud = require("soundcloud-scraper");
const client = new SoundCloud.Client();
const fs = require("fs");

client.getSongInfo("https://soundcloud.com/dogesounds/alan-walker-feat-k-391-ignite")
    .then(async song => {
        const stream = await song.downloadProgressive();
        const writer = stream.pipe(fs.createWriteStream(`./${song.title}.mp3`));
        writer.on("finish", () => {
            console.log("Finished writing song!")
            process.exit(1);
        });
    })
    .catch(console.error);