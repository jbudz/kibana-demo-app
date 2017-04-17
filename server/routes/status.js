import _ from 'lodash';
import Boom from 'boom';

export default function (server) {
  const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');
  server.route({
    path: '/api/sites/status',
    method: 'GET',
    handler(req, reply) {
      callWithRequest(req, 'search',{
        index: 'heartbeat-*',
        body: {
          size: 0,
          aggs: {
            sites: {
              terms: {
                field: 'monitor'
              },
              aggs: {
                latest_status: {
                  top_hits: {
                    sort: [
                      {
                        '@timestamp': {
                          'order': 'desc'
                        }
                      }
                    ],
                    size : 1,
                    _source: ['up', 'url', 'http_rtt']
                  }
                }
              }
            }
          }
        }
      })
      .then(resp => {
        const buckets = _.get(resp, 'aggregations.sites.buckets');
        if (!buckets || !buckets.length) return reply([]);
        const statuses = buckets.map(bucket => {
          const source = _.get(bucket, 'latest_status.hits.hits.0._source');
          const status = _.pick(source, 'up', 'url');

          const httpRTTInMicroseconds = _.get(source, 'http_rtt.us');
          status.latency_in_millis = httpRTTInMicroseconds / 1000;

          return status;
        });
        reply(statuses);
      })
      .catch(e => {
        reply(Boom.badImplementation());
      });

    }
  });

}
