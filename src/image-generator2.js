const sharp = require("sharp")
const fs = require("fs")
const images = fs.readdirSync('./images').filter(file => file.endsWith('.jpg'));

const addText = () => {
    return new Promise((resolve, reject) => {
        try{
            originalFile = images[Math.floor(Math.random() * images.length)]
            originalImage = sharp(originalFile)

            originalImage
                .metadata()
                .then(metadata => {
                    console.log(metadata)
                    width = metadata.width;
                    height = metadata.height;

                    svgImage = `
 <svg width="${width}" height="${height}">
  <text x="8%" y="79%" font-family="Arial" text-anchor="left" font-size="${8*width/200}" class="txt" fill="white">
    <tspan font-weight="bold" x="8%" font-size="${10*width/200}">Malcolmb has been booped</tspan>
    <tspan font-weight="bold" x="9%" dy="1.5em">10</tspan><tspan font-weight="normal"> times total</tspan>
    <tspan font-weight="bold" x="9%" dy="1.5em">5</tspan><tspan font-weight="normal"> times by you</tspan>
  </text>
</svg>`
                svgBuffer = Buffer.from(svgImage)
                image = originalImage
                    .composite([
                        {
                            input: svgBuffer,
                            top: 0,
                            left: 0,
                        },
                    ])
                    .toFile("image.jpg")    
                })
                .catch(err => {
                    console.log(err)
                })
        }
        catch(err){
            console.log(err.stack)
            console.log(err);
            return err;
        }
    })
}

// addText()
// .then(image => {console.log(image)})
// .catch(err => {
//     console.log(err.stack);
//     console.log(err)
// })

originalFile = images[0]
originalImage = sharp(originalFile)
console.log(originalImage)
originalImage
    .metadata()
    .then(metadata => {
        
    })