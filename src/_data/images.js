// Every picture in src/img, resized and converted to WebP when the site is built, so visitors download much smaller
// files. Templates look pictures up by their original path, e.g. images["/img/uragun.jpg"].src
import Image from "@11ty/eleventy-img";
import { readdirSync } from "node:fs";

const options = {
    widths: [400, 800, 1600], // sizes larger than the original are skipped
    formats: ["webp"],
    outputDir: "_site/img/opt/",
    urlPath: "/img/opt/",
};

async function optimize(file) {
    const versions = (await Image(`src/img/${file}`, options)).webp;
    const largest = versions.at(-1);
    return {
        src: largest.url,
        srcset: versions.map((version) => version.srcset).join(", "),
        width: largest.width,
        height: largest.height,
    };
}

// The picture shown when the site is shared on LinkedIn, Discord etc. JPEG works everywhere, and the transparent
// corners of the photo are filled with the info page's background colour
async function shareImage() {
    const [jpeg] = (await Image("src/img/photo.png", {
        ...options,
        widths: [600],
        formats: ["jpeg"],
        transform: (sharp) => sharp.flatten({ background: "#FBEBEB" }),
    })).jpeg;
    return { src: jpeg.url, width: jpeg.width, height: jpeg.height };
}

export default async function () {
    const files = readdirSync("src/img").filter((file) => /\.(png|jpe?g|webp)$/i.test(file));
    const entries = await Promise.all(files.map(async (file) => [`/img/${file}`, await optimize(file)]));
    return { ...Object.fromEntries(entries), share: await shareImage() };
}
