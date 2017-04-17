A small demo application that uses heartbeat data to show whether a site is up or down.

![example](/example.png)

## Development
### start kibana
1) install https://nodejs.org/en/
1) git clone https://github.com/elastic/kibana.git
1) cd kibana && npm install
1) cd .. && git clone https://github.com/jbudz/kibana-demo-app && cd kibana-demo-app
1) npm install
1) npm start -- --no-ssl --no-base-path
1) http://localhost:5601/app/my_plugin

### start elasticsearch
1) from the kibana directory, npm run elasticsearch

### start heartbeat
1) https://www.elastic.co/downloads/beats/heartbeat
1) tar -xvf heartbeat.tar.gz && cd heartbeat
1) ./heartbeat -e -c heartbeat.yml
