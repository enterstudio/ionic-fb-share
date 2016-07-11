angular.module('starter.controllers', [])

.controller('facebookPostSharing', function($scope) {
  $scope.image = 'http://1.bp.blogspot.com/-whONj2eVaPM/TkLEIoj1hxI/AAAAAAAAEQo/ZyE2gApEe3k/s1600/gmc.png';
  $scope.postName = 'This is an example post name';
  $scope.caption = 'This is an example caption';
  $scope.description = 'This is an example description';
  $scope.shareToFacebook = function(image,postName, caption, description) {

    console.log('Button');
    console.log($scope.image);
    console.log($scope.postName);
    console.log($scope.caption);
    console.log($scope.description);

    var url = "https://www.facebook.com/dialog/feed?app_id=1617424538586903&name="+postName+"&display=popup&caption="+caption+"&description="+description+"&link="+image+"&redirect_uri=http://facebook.com&picture="+image;
    window.open(url, '_blank');
  }
})
