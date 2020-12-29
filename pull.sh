curl -s -o bookit.zip https://codeload.github.com/rambabusaravanan/bookit/zip/master
unzip bookit.zip
mv -v bookit-master/{*,.eleventy.js} .
rm -vr bookit.zip bookit-master
# npx @11ty/eleventy --pathprefix=docs --output public