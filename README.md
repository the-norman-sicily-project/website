# The Norman Sicily Project Website

The website for the Norman Sicily Project

## Building the site

To build the website you need to have the following tools installed:

* [Node.js](https://nodejs.org/en/) (version 10+)
* [Yarn](https://yarnpkg.com/) 
* [Hugo](https://gohugo.io/)

The site uses the [Hamburg theme](https://themes.gohugo.io/hugo-theme-hamburg/).

The site uses [Mapbox](https://mapbox.com/) for the map tiles. To specify a Mapbox API Key set the `MAPBOX_APIKEY` environment variable before running the build script.

To build the site run `build.sh` from the repository root:

```bash
$ ./scripts/build.sh
```

The script will clean directories, install the theme, clone subprojects and build them. The result can be found in the `dist` directory.

By default, the site will build in "production" mode with a base URL of `http://www.normansicily.org/`. To build in "development" mode with a base URL of `http://localhost:8080/`, pass `development` as a command line argument:

```bash
$ ./scripts/build.sh development
```

### Running the development site

After building in development mode, run a static web server from the `dist` directory. For example, you can use python's SimpleHTTPServer.

```bash
$ python -m SimpleHTTPServer 8080
```

## Deploying the site

After building the site, deploy the contents of the `dist` directory.