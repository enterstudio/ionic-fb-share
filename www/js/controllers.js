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

.controller('loginCtrl', function($scope, ngFB, $state) {
  console.log('This is Login');

  $scope.fbLogin = function() {
    ngFB.login({
      scope: 'email,public_profile, publish_actions'
    }).then(
      function(response) {
        if (response.status === 'connected') {
          console.log('Facebook login succeeded');
          console.log(response);
          window.localStorage['accessToken'] = response.authResponse.accessToken;
          console.log(response.authResponse.accessToken);
          $state.go('facebookDirectSharing');
        } else {
          alert('Facebook login failed');
        }
      });
  };
})
