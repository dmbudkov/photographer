const isProd = process.env.NODE_ENV === 'production';
let proxy = {
        '/api': { target: 'https://nachinka.me/' },
        '/media': { target: 'https://nachinka.me/' },
        '/broadcasting': { target: 'https://nachinka.me/' }

    };
let axiosConfig = {};
let debug = true;
if(isProd) {
    proxy = {};
    debug = false;
    axiosConfig = {
        baseURL: 'https://nachinka.me'
    }
}
module.exports = {
    generate: {
        minify: {
            collapseWhitespace: false
        }

    },
    debug: false,
  /*
  ** Headers of the page
  */
    head: {
        title: 'nachinka',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'},
            {hid: 'description', name: 'description', content: 'nachinka.me — это online-сервис для быстрого и удобного поиска подходящего: Ведущего, Фотографа, Видеооператора, Артиста, Ресторана или места для вашего события'},
            {name: 'yandex-verification', content: "8a930e46b51a079e"},
            {name: 'msapplication-TileColor', content: '#02cfb6'},
            {name: 'theme-color', content: '#02cfb6'}
        ],
        __dangerouslyDisableSanitizers: ['script', 'noscript'],
        link: [
            {
                rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'
            },
            {
                rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png'
            },
            {
                rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png'
            },
            {
                rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png'
            },
            {
                rel: 'manifest', href: '/favicon/site.webmanifest'
            },
            {
                rel: 'mask-icon', color: '#02cfb6', href: '/favicon//safari-pinned-tab.svg'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Rubik:100,200,300,400,500,700,900&amp;subset=cyrillic,latin-ext'
            },
            {rel: 'stylesheet', href: '/normalize.css'}

        ],
        script: [
            {
                src: '//script.marquiz.ru/v1.js',
                type: 'application/javascript',
            },
            {
                innerHTML: 'document.addEventListener("DOMContentLoaded", function() {\n' +
                '                    Marquiz.init({\n' +
                '                        id: \'5c98bbc6256e560044ae5f57\',\n' +
                '                        autoOpen: false,\n' +
                '                        autoOpenFreq: \'always\',\n' +
                '                        openOnExit: true\n' +
                '                    });\n' +
                '                });',
                type: 'text/javascript',
                charset: 'utf-8'
            },
            {
                innerHTML: 'document.addEventListener("DOMContentLoaded", function() {\n' +
                '                    Marquiz.init({\n' +
                '                        id: \'5c8b8a1f2c49700044bc45a6\',\n' +
                '                        autoOpen: false,\n' +
                '                        autoOpenFreq: \'always\',\n' +
                '                        openOnExit: true\n' +
                '                    });\n' +
                '                });',
                type: 'text/javascript',
                charset: 'utf-8'
            },
            {
                innerHTML: '!function(){var t=document.createElement(\"script\");t.type=\"text/javascript\",t.async=!0,t.src=\"https://vk.com/js/api/openapi.js?159\",t.onload=function(){VK.Retargeting.Init(\"VK-RTRG-282194-eUruW\"),VK.Retargeting.Hit()},document.head.appendChild(t)}();',
                type: 'text/javascript',
                charset: 'utf-8'
            },
            {
                innerHTML:
                '  window.fbAsyncInit = function() {\n' +
                '    FB.init({\n' +
                '      appId      : \'{ 174996990114583 }\',\n' +
                '      cookie     : true,\n' +
                '      xfbml      : true,\n' +
                '      version    : \'{ 1.0 }\'\n' +
                '    });\n' +
                '      \n' +
                '    FB.AppEvents.logPageView();   \n' +
                '      \n' +
                '  };\n' +
                '\n' +
                '  (function(d, s, id){\n' +
                '     var js, fjs = d.getElementsByTagName(s)[0];\n' +
                '     if (d.getElementById(id)) {return;}\n' +
                '     js = d.createElement(s); js.id = id;\n' +
                '     js.src = "https://connect.facebook.net/en_US/sdk.js";\n' +
                '     fjs.parentNode.insertBefore(js, fjs);\n' +
                '   }(document, \'script\', \'facebook-jssdk\'));\n',
                type: 'text/javascript',
                charset: 'utf-8'
            },
        ],
        noscript: [
            {
                innerHTML: '<img src="https://vk.com/rtrg?p=VK-RTRG-282194-eUruW" style="position:fixed; left:-999px;" alt=""/>',
            }
            ],
    },
  // uncomment for production


  axios: axiosConfig,

    // loading: 'components/Loading.vue',
  css: [
    '~assets/less/style.less',
    'swiper/dist/css/swiper.css'
  ],
  modules: [

      ['@netsells/nuxt-hotjar', {
          id: '1357891',
          sv: '6',
      }],
    // '@nuxtjs/localtunnel',
      [
          '@nuxtjs/yandex-metrika',
          {
              id: '48643421',
              clickmap:true,
              trackHash:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true,
              triggerEvent: true
          }
      ],
      ['nuxt-facebook-pixel-module', {
          /* module options */
          track: 'PageView',
          pixelId: '2967509876607845',
          disabled: false
      }],
      ['@nuxtjs/google-analytics', {
          id: 'UA-129772303-1'
      }],
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  auth: {

        resetOnError: true,
        rewriteRedirects: true,
        redirect: {
            login: false,
            home: '/',
            user: '/cabinet/'
        },
        // token: {
        //   type: 'Bearer',
        //   name: 'access_token'
        // },
        token: {
            name: 'token'
        },
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: "/api/login",
                        method: "post",
                        propertyName: "access_token"
                    },
                    user: {
                        url: "/api/me",
                        method: "get",
                        propertyName: "user"
                    },
                    logout: false
                },
            },

        }

    },
  proxy: proxy,
  vendor: ['vue-select'],
    plugins: [
        // '~plugins/vue-select.js', '~plugins/vue-slider-component.js'],
        {
            src: '~plugins/vue-slider-component.js',
            ssr: false
        },
        {
            src: '~plugins/chatSocket.js',
            ssr: false
        },
        {
            src: '~plugins/vue-select.js',
            ssr: false
        },
        {
            src: '~plugins/drop-zone.js',
            ssr: false
        },
        {
            src: '~/plugins/swiper-slider.js',
            ssr: false
        },
        {
            src: '~/plugins/desktop.js',
            ssr: false
        },
        {
            src: '~/plugins/auth.js',
            ssr: false
        },
        {
            src: '~/plugins/nuxt-client-init.js',
            ssr: false
        },


    ],
  router: {
      scrollBehavior(to, from, savedPosition) {
          if ((to.name === 'catalog-vendor-id' && from.name !== 'catalog-vendor-id') || (to.name === 'catalog-vendorType-filter' && (from.name !== 'catalog-vendorType-filter' && from.name !== 'catalog-vendor-id')) || (to.name === 'login')) {

              return { x: 0, y: 0 }
          } else {
              return false;
          }
      }
  },

  /*nachinka
  ** Customize the progress bar color
  */
  loading: { color: '#889FBC' },
  /*
  ** Build configuration
  */

  build: {
    /*
    ** Run ESLint on save
    */
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  },
}
