Setup
=====

```
npm install -g browserify
npm install -g bower
npm install
browserify src/js/main.js -o static/bundle.js
bower install
npm install
python -m SimpleHTTPServer
```

Go to http://localhost:8000
