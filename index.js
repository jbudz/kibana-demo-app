import { resolve } from 'path';
import status from './server/routes/status';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    uiExports: {
      app: {
        title: 'My Plugin',
        description: 'An awesome Kibana plugin',
        main: 'plugins/my_plugin/app'
      }
    },
    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },
    init(server, options) {
      status(server);
    }
  });
};
