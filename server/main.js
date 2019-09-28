import { Meteor } from 'meteor/meteor';

const host = Meteor.settings.mqtt.host;
const port = Meteor.settings.mqtt.port;
const user = Meteor.settings.mqtt.user;
const password = Meteor.settings.mqtt.password;

mqtt = require('mqtt');
client  = mqtt.connect('mqtt://' + user + ':' + password + '@'  + host + ':' + port);

client.on('connect', function () {
    client.subscribe('/doorman');
});

Meteor.startup(() => {
    ServiceConfiguration.configurations.upsert({
        service: 'google'
    }, {
        $set: {
            loginStyle: 'popup',
            clientId: Meteor.settings.google.clientId,
            secret: Meteor.settings.google.clientSecret,
        }
    });
});

Accounts.config({
    loginExpirationInDays: 0
});

