const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.view()
    this.routes()
  }

  middlewares () {
    // configuracao do express para lidar com formularios
    this.express.use(express.urlencoded({ extended: true }))
  }

  view () {
    // utiliza o path para evitar conflitos de caminhos entre sistemas
    // navega ate a pasta onde estao as views
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })
    // referencia a pasta public como statica para acesso externo
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    // seta a extensao dos arquivos como njk
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}
// exporta somente o express da instancia
module.exports = new App().express
