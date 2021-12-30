const Jimp = require("jimp");
const fs = require("fs");
const { resolve } = require("path/posix");


const generateImage = () => {
    return new Promise((resolve, reject) => {
        const counterData = fs.readFileSync(".counter", "utf-8")
console.log(counterData);

try {
    var count = parseInt(counterData)
} catch {
    var count = 0 
}

const newCount = (count + 1)

const pad = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    console.log(num);
    return num;
}

fs.writeFileSync(".counter", newCount.toString() )

fs.copyFileSync("background.jpg", "background-copy.jpg")

const fileName = 'background-copy.jpg';
const imageCaption = 'Malcolmb has been booped';
let loadedImage;

const padded = pad(count, 3).toString()
console.log(padded);

Jimp.read(fileName)
    .then(function (image) {
        loadedImage = image;
        return Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    })
    .then(function (font) {
        loadedImage.print(font, 150, 200, imageCaption)
                   .write(fileName);
        loadedImage.print(font, 180, 220, "no. " + padded)
                   .write(fileName);
                   loadedImage.print(font, 180, 220, "no. " + padded)
                   .write(fileName);
                   loadedImage.print(font, 180, 220, "no. " + padded)
                   .write(fileName);
                   loadedImage.print(font, 180, 220, "no. " + padded)
                   .write(fileName);
                   loadedImage.print(font, 180, 220, "no. " + padded)
                   .write(fileName);
                   loadedImage.print(font, 180, 220, "no. " + padded)
                   .write(fileName);
    }).then(() => {
        resolve()
    })
    .catch(function (err) {
        console.error(err);
    });
    })
    
}

module.exports = { generateImage }