# alec_edu_admin

## Build Setup

```bash
Node version: 16.18.0 / 14.16.1
B1: 
cp .env.sample .env
Điền các thông tin cần thiết vào file .env

B2:
# install dependencies
$ npm install

B3:
# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Cấu trúc project
![Clean Architecture](https://images.viblo.asia/b874c030-e6c7-4ba8-ae02-ccb63fdffa61.png)

| Layer | Nội dung    | 
| :---:   | :---: |
| Domain | Chứa các Business logic. Là lớp quan trọng nhất, nơi thực hiện giải quyết các vấn đề - mục đích khi xây dựng app . Chưa các rule về apploaction-specific. Nó đóng gói và triển khai tất cả các ca sử dụng trong hệ thống. Các ca sử dụng cấu trúc các luồng dữ liệu tới và đi từ entites, và hướng các entities đó tới các Critical Business Rules -> mục đích của các ca sử dụng |
|Data | Phản hồi cho dữ liệu điều phối từ những Data Store. Data Store có thể online hoặc offline. Lớp Data chỉ phụ thuộc vào lớp Domain|
|Presentation | Cung cấp giao diện người dùng cho ứng dụng. Layer này không chứa bất kì một business logic nào. Ở tầng này có thể triển khai theo nhiều mô hình khác nhau : MVC , MVP , MVVM,… |
#

## Tài liệu tham khảo
[Clean Architecture](https://aithietke.com/mo-hinh-clean-architecture-dagger-2-trong-android/#3_Presentation_layer)


For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
