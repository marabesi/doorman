import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './login.html';

Template.Login.events({
  'click .login-with-google'(event) {
      Meteor.loginWithGoogle(['profile', 'email'], (error) => {
          if (error) {
              alert(error);
          } else {
              Router.go('/door');
          }
    });
  },
});
