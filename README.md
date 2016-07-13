# ionic-fb-share

Ionic-fb-share app is an example mobile application which showcases how to share content from an Ionic mobile app to facebook using two different methods.

This application uses Facebook's feed dialog to share the content to facebook which uses Facebook's graph api to post the story.

This application can also post to facebook directly using the micro-library openFB and the angularized ngOpenFB.

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

Posting directly on facebook using openFB, requires the developer to have administration privileges. In order to allow normal users to be able to share to facebook directly, the ionic application will need to be reviewed by facebook and also the developer would need to apply for permission on what items the application can access for a specific user.

In order to share to facebook directly using openFB, the user must be logged in.

# Testing

For the test cases, two libraries are being used:

 * Jasmine
 
 * Angular Mocks 
 
In order to run the test codes, change directory and go into **tests** folder and open the **test.html** file.

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
