# Techmap Starter

## Installation
The tech map starter kit uses [Harp](https://harpjs.com/) for local development, and [Grunt](http://gruntjs.com/) for compilation, so first we'll need to make sure we have Harp & Grunt installed.

```sh
npm install -g harp
npm install -g grunt-cli
```

Once we have Harp installed, you can initialize a new Harp project using the `--boilerplate` option.

```sh
harp init myproject --boilerplate rootinc/techmap-starter
```

And that's it, we're ready to start development on your next tech map project! :tada:


## Development

To run the local server:

```sh
harp server _harp
```

Here's some info about the app structure.

### `_harp`
This is where the Harp source files exists. All our templates, styles, javascripts, and images live here.

### `config.xml`
This is the main PhoneGap config file.

### `res`
This directory contains all the app icon and splash screen images.

### `www`
This directory is where the source is compiled to. PhoneGap then creates the app files from here.

There are additional directories and files, but for the most part, we don't need to worry about them.

## Compiling & PhoneGap Build

### Compiling

Once we have the app to spot where you want to deploy it to an Android device, we need to compile it to a PhoneGap ready package. We use grunt for this. First, make sure all our dependencies are installed for this.

```sh
# Note: For now it's best to be using v0.10 of Node for this.
npm install
```

Once our dependencies are installed, we can run the Grunt task to compile.
```
grunt
```

This will compile your `_harp` files into a `www` directory that PhoneGap uses to build the .apk package. 

**Note:** At this point, be sure to push your latest code to Github.

### PhoneGap Build

To create our Android .apk file, we use [PhoneGap Build](https://build.phonegap.com/). You can log in using your Root Adobe Creative ID.

The first thing we'll need to do is create a new app. It's easiest to copy the `.git` url of the our github repo and copy/paste it in the proper field, and pull the code from that repo.

PhoneGap Build will then use that code to create an .apk file that will be available for download. This is a private download link, so before sharing we need to download the file from the web and then pass it along with whatever method suits our need.