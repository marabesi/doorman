import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'door.getSvgContent': function(files) {
        const icons = [];

        for (index in files) {
            icons.push(Assets.getText(files[index]));
        }

        return icons;
    },
    'door.open': function() {
        const loggedUser = Meteor.user();
        const data = {
            user: loggedUser.profile.name,
            open: true
        };

        const jsonData = JSON.stringify(data);
        console.log('published', jsonData);

        client.publish('/doorman', jsonData);

        return data;
    }
});
