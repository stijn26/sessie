const router = require('koa-router')()
let winston = require('winston');

require('winston-papertrail').Papertrail;

let winstonPapertrail = new winston.transports.Papertrail({
  host: 'logs3.papertrailapp.com',
  port: 22166
});

winstonPapertrail.on('error', function (err) {
  // Handle, report, or silently ignore connection errors and failures
  console.log('Connection error: ', err);
});

var logger = new winston.Logger({
  transports: [winstonPapertrail]
});

router.post('/batch', async (ctx, next) => {
  logger.info('Data from Spring Batch app: ', ctx.request.body);
  ctx.body = ctx.request.body;
})

module.exports = router
