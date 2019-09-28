import { Meteor } from 'meteor/meteor';
const mqtt = require('mqtt');

const host = Meteor.settings.mqtt.host;
const port= Meteor.settings.mqtt.port;

const client = mqtt.connect('mqtt://' + host);
const topic = 'doorman';

client.on('connect', () => {
  console.debug('connected to', host, 'on port ', port);
  client.subscribe(topic);
});

client.on('message', (topic, message) => {
    console.log(message.toString())
    client.end()
})
