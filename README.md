# Project description
This repo contains the code that accompanies a series of blog posts you can read either on our [blog](https://www.blog.plint-sites.nl)
or on [Medium](https://medium.com/plint-sites).

It's a simple PWA created using the @vue/cli with the pwa plugin. It uses the
Notifications API to show a notification when you click the green button

## Part 2
In part 2 we include real push notifications. For that, we need a backend which we create using the Laravel
framework. The repo for the Laravel project is available [here](https://github.com/pimhooghiemstra/plint-pwa-api)

## Part 1
In part 1 we setup the project and create a page with a button. Clicking the button results in a
notification on your screen. No push notifications yet...

The code can be found in [release v0.1](https://github.com/pimhooghiemstra/plintpwa-vue-1/releases/tag/v0.1)

The corresponding blog is [here](https://www.blog.plint-sites.nl/progressive-web-app-using-vue-cli-3/)

![The app we'll build](https://www.blog.plint-sites.nl/wordpress/wp-content/uploads/2018/10/app-homepage.png)

## Demo
I have a demo of the code running on https://app.plint-demos.nl/. However, as I write more tutorials on this topic, the demo
will be more involved and I'll report which code the demo reflects. Currently, the demo reflects Part 1

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
