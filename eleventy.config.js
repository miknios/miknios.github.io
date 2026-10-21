const byOrder = (a, b) => (a.data.order ?? 0) - (b.data.order ?? 0);

export default function (eleventyConfig) {
    // Files copied to the site as they are
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/video");
    eleventyConfig.addPassthroughCopy("src/pdf");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/styles.css");
    eleventyConfig.addPassthroughCopy("src/CNAME");

    // One Markdown file per project, sorted by their `order` value
    eleventyConfig.addCollection("works", (api) =>
        api.getFilteredByGlob("src/works/*.md").sort(byOrder));
    eleventyConfig.addCollection("sideProjects", (api) =>
        api.getFilteredByGlob("src/side-projects/*.md").sort(byOrder));

    // Open links to other websites in a new tab
    eleventyConfig.amendLibrary("md", (md) => {
        const defaultRender = md.renderer.rules.link_open
            || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

        md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
            if (/^https?:\/\//.test(tokens[idx].attrGet("href"))) {
                tokens[idx].attrSet("target", "_blank");
            }
            return defaultRender(tokens, idx, options, env, self);
        };
    });
}

export const config = {
    dir: {
        input: "src",
    },
};
