# ionic-fb-share

Ionic-fb-share app is an example mobile application which showcases how to share content from an Ionic mobile app to facebook using three different methods.

This application uses Facebook's feed dialog to share the content to facebook which uses Facebook's graph api to post the story.

This application can also post to facebook directly using a image url from the internet using the micro-library openFB and the angularized ngOpenFB.

This application also posts to facebook directly from the app with a message and a photo from the device's gallery or a picture taken with the device's camera using facebook's graph api.

# Installation

 * git clone https://github.com/tech-dojo/ionic-fb-share.git

 * cd ionic-fb-share

 * npm install -g ionic cordova
 
## For running in browser
 
 * ionic serve
 
## For running in device
 
 * ionic state restore

 * ionic platform add android

 * ionic run android

# Notice

In the **shareToFacebookUsingFeedDialog** function inside the controller, the variable **appId.id** needs to be replaced with the app id of your registered facebook app.

In **app.js** the variable **appId.id** in **ngFB.init** also needs to be replaced with the app id of your registered facebook app.

Posting directly on facebook using openFB, requires the developer to have administration privileges. In order to allow normal users to be able to share to facebook directly, the ionic application will need to be reviewed by facebook and also the developer would need to apply for permission on what items the application can access for a specific user.

In order to share to facebook directly using openFB, the user must be logged in.

In order to share to facebook directly using photo from the device, also requires the user to be logged in.

# Testing

For the test cases, two libraries are being used:

 * Jasmine
 
 * Angular Mocks 
 
In order to run the test codes, change directory and go into **tests** folder and open the **test.html** file.

# More Information

For more details, give this a read [Facebook Post from your Ionic app](http://www.tech-dojo.org/#!/articles/57853a04807641065c2f74ed)

# References

 * [Access Tokens](https://developers.facebook.com/docs/facebook-login/access-tokens/)
 * [Permissions](https://developers.facebook.com/docs/facebook-login/permissions/)
 * [Facebook Graph API](https://developers.facebook.com/docs/graph-api/reference/)
 * [In-app-browser-ionic tutorial](http://sourcefreeze.com/cordova-inappbrowser-plugin-example-using-ionic-framework/)
 * [ionic-facebook-integration](https://ccoenraets.github.io/ionic-tutorial/ionic-facebook-integration.html)
 * [Facebook's Feed Dialog](https://developers.facebook.com/docs/sharing/reference/feed-dialog)
 * [Facebook's photo-uploads](https://developers.facebook.com/docs/graph-api/photo-uploads)

## License

MIT License is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
