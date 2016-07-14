tslint -c tslint.json src/**.ts
csslint *.css
find . -path ./node_modules -prune -o -name "*.json" -exec echo {} \; -exec jsonlint {} -q \;
