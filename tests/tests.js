describe('facebookPostSharing', function() {
  beforeEach(module('starter'));
  var controller,
    scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('facebookPostSharingCtrl', {
      $scope: scope
    });

  }))

  it('Should open facebook feed dialog', function() {

    spyOn(window, "open").and.callFake(function() {
     return true;
    });

  var image = 'image.jpg';
  var postName = 'postTest';
  var caption = 'testCaption';
  var description = 'this is a test';

    scope.shareToFacebookUsingFeedDialog(image,postName, caption, description);
    expect(window.open ).toHaveBeenCalledWith('https://www.facebook.com/dialog/feed?app_id=1617424538586903&name=postTest&display=popup&caption=testCaption&description=this is a test&link=image.jpg&redirect_uri=http://facebook.com&picture=image.jpg', '_blank');
  })
})

describe('facebookDirectSharingCtrl', function() {
  beforeEach(module('starter'));
  var controller,
    scope;

  beforeEach(inject(function($controller, $rootScope, _$q_) {
    scope = $rootScope.$new();
    $q = _$q_;
    controller = $controller('facebookDirectSharingCtrl', {
      $scope: scope
    });

  }))

  it('It should post to facebook successfully', function() {


    var deferred = $q.defer();
    deferred.resolve('resolveData');
    spyOn(scope, 'shareToFacebookUsingNgOpenFB').and.returnValue(deferred.promise);

    scope.shareToFacebookUsingDirectPost(image,postName, caption, description);
    $rootScope.$apply();
    expect(scope.success).toEqual('success');
  });

  it('It should failed to post on facebook', function() {


    var deferred = $q.defer();
    deferred.reject('rejectData');
    spyOn(scope, 'shareToFacebookUsingNgOpenFB').and.returnValue(deferred.promise);

    scope.shareToFacebookUsingDirectPost(image,postName, caption, description);
    $rootScope.$apply();
    expect(scope.error).toEqual('error');
  });
})
