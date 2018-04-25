const router = require('koa-router')()
const winston = require('winston');

require('winston-papertrail').Papertrail;
const winstonPapertrail = new winston.transports.Papertrail({
  host: 'logs3.papertrailapp.com',
  port: 22166
});

winstonPapertrail.on('error', function (err) {
  // Handle, report, or silently ignore connection errors and failures
  console.log('Connection error: ', err);
});

const logger = new winston.Logger({
  transports: [winstonPapertrail]
});

router.prefix('/users')

router.get('/', function (ctx, next) {
  logger.info('Users route has been called.');
  ctx.body = [
    { name: 'Stijn' },
    { name: 'Jonas' },
    { name: 'Dieter' }
  ]
})

module.exports = router
