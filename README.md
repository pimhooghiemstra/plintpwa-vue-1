# Project description
This repo contains the code that accompanies a series of blog posts you can read either on our [blog](https://www.blog.plint-sites.nl)
or on [Medium](https://medium.com/plint-sites).

It's a simple PWA created using the @vue/cli with the pwa plugin. It uses the
Notifications API to show a notification once you enabled them. With notifications enabled
you are able to send a push notification to yourself with custom text.

With Workbox it is ensured that the app works as a true PWA: with precaching, runtime caching and offline mode.

## Update February 2021
The original code was developed at the end of 2018. In the meantime, several packages received updates. The current version works woth VueCLI v4.5.0 and is up to date. This is v1.0.
## Part 3
In part3, we include Workbox to implement precaching, runtime caching and offline mode. Moreover, the user
decides when a new service worker is activated by clicking a button that pops up when an update is available.

This release is tagged v0.3, checkout the [release notes](https://github.com/pimhooghiemstra/plintpwa-vue-1/releases/tag/v0.3).
The API has not changed in this release and still refers to v0.2.

You can read the corresponding blogpost on our [blog](https://www.blog.plint-sites.nl/adding-workbox-to-a-vue-cli-pwa/).

## Part 2
In part 2 we include push notifications. For that, we need a backend which we create using the Laravel
framework. The repo for the Laravel project is available [here](https://github.com/pimhooghiemstra/plint-pwa-api). The frontend code is available in [this release](https://github.com/pimhooghiemstra/plintpwa-vue-1/releases/tag/v0.2). You can read the corresponding blogpost on our [blog](https://www.blog.plint-sites.nl/how-to-add-push-notifications-to-a-progressive-web-app/).

![Our app v0.2](https://www.blog.plint-sites.nl/wordpress/wp-content/uploads/2018/11/notify-with-push.png)

## Part 1
In part 1 we setup the project and create a page with a button. Clicking the button results in a
notification on your screen. No push notifications yet...

![The app we'll build](https://www.blog.plint-sites.nl/wordpress/wp-content/uploads/2018/10/app-homepage.png)

The code can be found in [release v0.1](https://github.com/pimhooghiemstra/plintpwa-vue-1/releases/tag/v0.1) and
the corresponding blog post is [here](https://www.blog.plint-sites.nl/progressive-web-app-using-vue-cli-3/).

## Demo
I have a demo of the code running on https://app.plint-demos.nl/. However, as I write more tutorials on this topic, the demo
will be more involved and I'll report which code the demo reflects. Currently, the demo reflects Part 2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production => only with production code this will work!
```
npm run build
```
