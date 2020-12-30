const SITE_HOME = 'Home'

function toTitle(value) {
  if (value === '/') return SITE_HOME;

  let splits = value.replace(/[-_]/g, ' ').replace(/^\//g, '').replace(/(\/|\/index\.html)$/, '').split('/')

  if (splits.length === 1) return splits[0];
  return splits.join(' » ')
}

function toNavTree (list) {
  let output = [], map = {};

  list.forEach(it => {
    let splits = it.replace(/^\//, '').replace(/(\/|\/index\.html)$/, '').split('/');

    splits.reduce(function(prevLink, s, i) {
      let currLink = prevLink ? `${prevLink}/${s}` : s;
      if (!map[currLink]) {
        map[currLink] = { text: it === '/' ? SITE_HOME : s.replace(/[-_]/g, ' ') }

        // if root, add to output; else, add to map
        if (!prevLink) {
          output.push(map[currLink])
        } else if (prevLink && map[prevLink]) {
          if (!map[prevLink].child) map[prevLink].child = []
          map[prevLink].child.push(map[currLink]);
        } 
      }

      // if last, add 'link'
      if (i === splits.length - 1)
        map[currLink].link = it;
      
      // return for next accumulator
      return currLink
    }, '')
  })
  return output;
}

module.exports = function (eleventyConfig) {
  // Values can be static:
  // eleventyConfig.addGlobalData("static", "static");

  eleventyConfig.addFilter("toTitle", toTitle);

  eleventyConfig.addCollection("navTree", function (collectionApi) {
    const urlList = collectionApi.getAll().map(it => it.url).sort()
    return toNavTree(urlList);
  });

  eleventyConfig.addPassthroughCopy("assets/style.css");
};