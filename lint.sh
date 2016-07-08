tslint -c tslint.json src/*
csslint *.css
find . -name "*.json" -exec echo {} \; -exec jsonlint {} -q \;
