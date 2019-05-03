module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // seta na variavel disponivel para todas as views do nunjuks
    res.locals.user = req.session.user
    return next()
  }

  return res.redirect('/')
}
