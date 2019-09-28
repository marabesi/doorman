App.info({
  id: 'com.doorman',
  name: 'Doorman',
  description: 'An easy way to open the door :D',
});

// App.icons({
//   'iphone_2x': 'icons/icon-60@2x.png',
//   'iphone_3x': 'icons/icon-60@3x.png',
// });
//
// App.launchScreens({
//   'iphone_2x': 'splash/Default@2x~iphone.png',
//   'iphone5': 'splash/Default~iphone5.png',
// });

App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'portrait');

App.configurePlugin('cordova-plugin-googleplus', {
    CLIENT_ID: '',
  REVERSED_CLIENT_ID: ''
});

