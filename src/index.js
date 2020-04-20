/* eslint-disable no-console */
import Koa from 'koa'

const handleError = (err, ctx) => {
  console.log('server error: ', err, ctx)
}

const XResponseTime = async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
}

const startServer = port => {
  const app = new Koa({proxy: true})

  app.use(XResponseTime)

  app.use(async ctx => {
    ctx.body = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
        </head>
        <body>
          hello world
        </body>
      </html>
    `
  })

  app.use(handleError)

  app.listen(port, () => {
    console.log(`Koa server start at port ${port}`)
  })
}

startServer(9800)
