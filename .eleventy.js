const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  // Add RSS plugin
  eleventyConfig.addPlugin(pluginRss);

  // RSS feed configuration
  eleventyConfig.addPlugin(pluginRss.feedPlugin, {
    type: "rss",
    outputPath: "/rss.xml",
    collection: {
      name: "posts",
      limit: 0
    },
    metadata: {
      language: "en",
      title: "Blog",
      subtitle: "Get Answers Fast — Keep Gaming",
      base: "https://gamenightgpt.com/",
      author: {
        name: "GameNightGPT",
        email: "dallan@gamenightgpt.com"
      }
    }
  });

  // Blog post collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/posts/**/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Pass through copy for static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
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