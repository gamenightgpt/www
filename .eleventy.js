const pluginRss = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");
const path = require("path");

async function imageShortcode(src, alt, widths, sizes, classes = "", loading = "lazy") {
  let inputPath = src.startsWith("/") ? path.join("src", src) : src;

  let metadata = await Image(inputPath, {
    widths: widths,
    formats: ["webp", "png"],
    outputDir: "./_site/img/",
    urlPath: "/img/",
    filenameFormat: (id, src, width, format) => {
      const name = path.basename(src, path.extname(src));
      return `${name}-${width}w.${format}`;
    }
  });

  return Image.generateHTML(metadata, {
    alt, sizes, loading, decoding: "async", class: classes
  });
}

module.exports = function(eleventyConfig) {
  // Add RSS plugin for filters only
  eleventyConfig.addPlugin(pluginRss);

  // Add image shortcode
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  // Blog post collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/posts/**/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Pass through copy for static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images/*.svg");
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "src/favicon-16x16.ico": "favicon-16x16.ico" });
  eleventyConfig.addPassthroughCopy({ "src/favicon-48x48.ico": "favicon-48x48.ico" });
  eleventyConfig.addPassthroughCopy({ "src/favicon-32x32.png": "favicon-32x32.png" });
  eleventyConfig.addPassthroughCopy({ "src/favicon-64x64.png": "favicon-64x64.png" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/css/");

  // Absolute URL filter for RSS feeds
  eleventyConfig.addFilter("absoluteUrl", (url, base) => {
    try {
      return new URL(url, base).toString();
    } catch(e) {
      return url;
    }
  });

  // Date formatting filter
  eleventyConfig.addFilter("dateToRfc3339", pluginRss.dateToRfc3339);
  eleventyConfig.addFilter("dateToRfc822", pluginRss.dateToRfc822);
  eleventyConfig.addFilter("dateToGMT", (dateObj) => {
    // Force UTC/GMT for RSS feeds
    const date = new Date(dateObj);
    return date.toUTCString();
  });
  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};