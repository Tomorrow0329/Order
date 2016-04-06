module.exports = function () {
  return {
    serverConfig : {
      fallback: 'demo-route.html',
      livereload: true,
      open: true,
      host: '10.0.1.165',
      port: 10011
    },

    sassPath: 'sass/*.scss',
    cssPath: './css/',
    jsPath: [
      'scripts/app.js',
      'scripts/services/*.js',
      'scripts/controllers/*.js'
    ],
    viewsPath: [
      'index.html',
      'views/detail.html',
      'list.html'
    ]
  }
};