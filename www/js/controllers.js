angular.module('starter.controllers', [])

.controller('facebookPostSharingCtrl', function($scope) {
  $scope.image = 'http://1.bp.blogspot.com/-whONj2eVaPM/TkLEIoj1hxI/AAAAAAAAEQo/ZyE2gApEe3k/s1600/gmc.png';
  $scope.postName = 'This is an example post name';
  $scope.caption = 'This is an example caption';
  $scope.description = 'This is an example description';

  console.log(appId.id);
  $scope.shareToFacebookUsingFeedDialog = function(image,postName, caption, description) {

    console.log('Inside shareToFacebookUsingFeedDialog Function');
    console.log(image);
    console.log(postName);
    console.log(caption);
    console.log(description);

    var url = "https://www.facebook.com/dialog/feed?app_id="+appId.id+"&name="+postName+"&display=popup&caption="+caption+"&description="+description+"&link="+image+"&redirect_uri=http://facebook.com&picture="+image;
    window.open(url, '_blank');
  }
})

.controller('facebookDirectSharingCtrl', function($scope) {
  console.log('This is facebookDirectSharing');

  })

.controller('loginCtrl', function($scope, ngFB, $state) {
  console.log('This is Login');

  $scope.fbLogin = function () {
    ngFB.login({scope: 'email,public_profile, publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                console.log(response);
                //$scope.closeLogin();
                window.localStorage['accessToken'] = response.authResponse.accessToken;
                console.log(response.authResponse.accessToken);
                $state.go('facebookDirectSharing');
            } else {
                alert('Facebook login failed');
            }
        });
};
  })
