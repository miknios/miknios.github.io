// A short fingerprint of the CSS and JS files, added to their URLs in the page (styles.css?v=...).
// It changes whenever a file changes, so browsers download the new version instead of using an old cached one.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const fingerprint = (file) => createHash("md5").update(readFileSync(file)).digest("hex").slice(0, 8);

export default function () {
    return {
        css: fingerprint("src/styles.css"),
        js: fingerprint("src/js/script.js"),
    };
}
