angular.module('starter.controllers', [])

.controller('facebookPostSharingCtrl', function($scope, $state) {
  $scope.image = 'http://1.bp.blogspot.com/-whONj2eVaPM/TkLEIoj1hxI/AAAAAAAAEQo/ZyE2gApEe3k/s1600/gmc.png';
  $scope.postName = 'This is an example post name';
  $scope.caption = 'This is an example caption';
  $scope.description = 'This is an example description';


  console.log(appId.id);
  $scope.shareToFacebookUsingFeedDialog = function(image, postName, caption, description) {

    console.log('Inside shareToFacebookUsingFeedDialog Function');
    console.log(image);
    console.log(postName);
    console.log(caption);
    console.log(description);

    var url = "https://www.facebook.com/dialog/feed?app_id=" + appId.id + "&name=" + postName + "&display=popup&caption=" + caption + "&description=" + description + "&link=" + image + "&redirect_uri=http://facebook.com&picture=" + image;
    window.open(url, '_blank');
  }

  $scope.shareToFacebookUsingDirectPostView = function() {
    var accessToken = window.localStorage['accessToken'];
    console.log('B4IF');
    console.log(accessToken);
    if (accessToken == undefined) {
      $state.go('login');
    } else {
      $state.go('facebookDirectSharing');
    }
  }

  $scope.shareToFacebookUsingLocalStorageImageView = function() {
    var accessToken = window.localStorage['accessToken'];
    console.log('B4IF');
    console.log(accessToken);
    if (accessToken == undefined) {
      $state.go('login');
    } else {
      $state.go('facebookImageSharing');
    }
   }
})

.controller('facebookDirectSharingCtrl', function($scope, $q, ngFB) {
  console.log('This is facebookDirectSharing');

  $scope.shareToFacebookUsingDirectPost = function(image, postName, caption, description) {
    $scope.shareToFacebookUsingNgOpenFB(image, postName, caption, description)
      .then(function(data) {
          console.log(data);
          $scope.success = 'success';
        },
        function(error) {
          console.log(error);
          $scope.error = 'error';
        })
  }

  $scope.shareToFacebookUsingNgOpenFB = function(image, postName, caption, description) {
    var deferred = $q.defer();
    ngFB.api({
      method: 'POST',
      path: '/me/feed',
      params: {
        // message: "I'll be attending: '" + $scope.session.title + "' by " +
        // $scope.session.speaker
        link: image,
        name: postName,
        caption: caption,
        message: description
      }
    }).then(
      function() {
        deferred.resolve('success');
      },
      function(error) {
        console.log(error);
        deferred.reject(error);
      });
    return deferred.promise;
  }

})

.controller('loginCtrl', function($scope, ngFB, $state,$ionicLoading) {
  console.log('This is Login');

  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    })
  };

  $scope.hide = function() {
    $ionicLoading.hide();

  };

  $scope.fbLogin = function() {
    $scope.show();
    ngFB.login({
      scope: 'email,public_profile, publish_actions'
    }).then(
      function(response) {
        if (response.status === 'connected') {
          console.log('Facebook login succeeded');
          console.log(response);
          window.localStorage['accessToken'] = response.authResponse.accessToken;
          console.log(response.authResponse.accessToken);
          $scope.getFbUserInfo();
        } else {
          alert('Facebook login failed');
        }
      });
  };

  $scope.getFbUserInfo = function() {
    ngFB.api({
      path: '/v2.6/me',
      params: {
        fields: 'id,name,picture,gender,email'
      }
    }).then(
      function(user) {
        console.log(user);
        window.localStorage['userId'] = user.id;
        $scope.hide();
        $state.go('app');

      },
      function(error) {
        alert('Facebook error: ' + error.error_description);
      });
  }
})

.controller('facebookImageSharingCtrl', function($scope, ngFB, $state, $ionicActionSheet, $q) {
  console.log('This is facebookImageSharingCtrl');

$scope.getPicture = function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }


  $scope.chooseImageSourceType = function() {
    var hideSheet = $ionicActionSheet.show({
      buttons: [{
        text: 'Choose Image to Share'
      }, {
        text: 'Take Photo'
      }, ],
      titleText: 'Add Photo',
      cancelText: 'Cancel',
      cancel: function() {

      },
      buttonClicked: function(index) {
        if (index == 0) {
          $scope.takePicture(index);
        } else if (index == 1) {
          $scope.takePicture(index);
        }

      }
    });
  }

  $scope.takePicture = function(src) {

    var options = {
      quality: 75,
      targetWidth: 200,
      targetHeight: 200,
      sourceType: src,
      encodingType: 0,
      destinationType: 1
    };

    $scope.getPicture(options).then(function(imageData) {
      $scope.photo = imageData;
      console.log(imageData);
    }, function(err) {
      console.log(err);
      $scope.errorTest = err;
    });
  }


  $scope.postImage = function(fileURI, message) {

      var accessToken = window.localStorage['accessToken'];

      var options = $scope.newFileUploadOptions();
      options.fileKey = "file";
      options.fileName = 'name_of_photo_' + Math.round((+(new Date()) + Math.random()));
      options.mimeType = "image/jpg";

      var params = new Object();
      params.access_token = accessToken;
      params.message = message;
      params.no_story = false;

      options.params = params;

     $scope.uploadPhotoFile(fileURI,options)
     .then(function(success) {
       $scope.testSuccess = success;
       window.alert("Successfully Posted");
     }, function(err) {
       console.log(err);
       $scope.errorUploadPhotoFileTest = err;
       window.alert("Failed to Post");
     });

  }

 $scope.uploadPhotoFile = function(fileURI,options){

  var q = $q.defer();

  var win = function (r) {
    console.log(r);
    q.resolve("Successfully Posted");


  }

  var fail = function (error) {

      console.log(error);
      q.reject("Failed to Post");

  }

   var ft = new FileTransfer();
   ft.upload(fileURI, "https://graph.facebook.com/v2.6/me/photos", win, fail, options);

 return q.promise;
 }

 $scope.newFileUploadOptions = function(){
   var options = new FileUploadOptions();
   return options;
 }




  })
