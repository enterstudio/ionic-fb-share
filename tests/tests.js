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

    scope.shareToFacebookUsingFeedDialog(image, postName, caption, description);
    expect(window.open).toHaveBeenCalledWith('https://www.facebook.com/dialog/feed?app_id=1617424538586903&name=postTest&display=popup&caption=testCaption&description=this is a test&link=image.jpg&redirect_uri=http://facebook.com&picture=image.jpg', '_blank');
  })
})

describe('facebookDirectSharingCtrl', function() {
  beforeEach(module('starter'));
  var controller,
    scope;

  beforeEach(inject(function($controller, $rootScope, _$q_, _$httpBackend_) {
    scope = $rootScope.$new();
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    controller = $controller('facebookDirectSharingCtrl', {
      $scope: scope
    });

  }))

  it('It should post to facebook successfully', function() {

    $httpBackend.whenGET('templates/login.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPostImageForm.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPostForm.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPost.html').respond(200, '');

    var image = 'image.jpg';
    var postName = 'postTest';
    var caption = 'testCaption';
    var description = 'this is a test';

    var deferred = $q.defer();
    deferred.resolve('resolveData');
    spyOn(scope, 'shareToFacebookUsingNgOpenFB').and.returnValue(deferred.promise);

    scope.shareToFacebookUsingDirectPost(image, postName, caption, description);
    scope.$apply();
    expect(scope.success).toEqual('success');
  });

  it('It should failed to post on facebook', function() {

    $httpBackend.whenGET('templates/login.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPostImageForm.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPostForm.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPost.html').respond(200, '');

    var image = 'image.jpg';
    var postName = 'postTest';
    var caption = 'testCaption';
    var description = 'this is a test';

    var deferred = $q.defer();
    deferred.reject('rejectData');
    spyOn(scope, 'shareToFacebookUsingNgOpenFB').and.returnValue(deferred.promise);

    scope.shareToFacebookUsingDirectPost(image, postName, caption, description);
    scope.$apply();
    expect(scope.error).toEqual('error');
  });
})

describe('facebookImageSharingCtrl', function() {
  beforeEach(module('starter'));
  var controller,
    scope;

  beforeEach(inject(function($controller, $rootScope, _$q_, _$httpBackend_) {
    scope = $rootScope.$new();
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    controller = $controller('facebookImageSharingCtrl', {
      $scope: scope
    });

  }))

  it('Should successfully take photo', function() {

    $httpBackend.whenGET('templates/login.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPostImageForm.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPostForm.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPost.html').respond(200, '');

    var src = 0;

    var deferred = $q.defer();
    deferred.resolve('resolveData');
    spyOn(scope, 'getPicture').and.returnValue(deferred.promise);

    scope.takePicture(src);
    scope.$apply();
    expect(scope.photo).toEqual('resolveData');
  });

  it('Should fail to take photo', function() {

    $httpBackend.whenGET('templates/login.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPostImageForm.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPostForm.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPost.html').respond(200, '');

    var src = 0;

    var deferred = $q.defer();
    deferred.reject('rejectData');
    spyOn(scope, 'getPicture').and.returnValue(deferred.promise);

    scope.takePicture(src);
    scope.$apply();
    expect(scope.errorTest).toEqual('rejectData');
  });

  it('It should post to facebook successfully using image from device', function() {

    var fileURI = 'imageURI';
    var message = 'hello';
    window.localStorage['accessToken'] = '25346742372';

    $httpBackend.whenGET('templates/login.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPostImageForm.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPostForm.html').respond(200, '');
    $httpBackend.whenGET('templates/fbPost.html').respond(200, '');

    var src = 0;

    spyOn(scope, 'newFileUploadOptions').and.callFake(function() {
      return {};
    });

    var deferred = $q.defer();
    deferred.resolve('resolveData');
    spyOn(scope, 'uploadPhotoFile').and.returnValue(deferred.promise);

    scope.postImage(fileURI, message);
    scope.$apply();
    expect(scope.testSuccess).toEqual('resolveData');
    window.localStorage['accessToken'] = '';
  });

  it('It should fail to post to facebook using image from device', function() {

      var fileURI = 'imageURI';
      var message = 'hello';
      window.localStorage['accessToken'] = '25346742372';

      $httpBackend.whenGET('templates/login.html').respond(200, '');
      $httpBackend.whenGET('templates/fbPostImageForm.html').respond(200, '');
      $httpBackend.whenGET('templates/fbPostForm.html').respond(200, '');
      $httpBackend.whenGET('templates/fbPost.html').respond(200, '');

      var src = 0;

      spyOn(scope, 'newFileUploadOptions').and.callFake(function() {
        return {};
      });

      var deferred = $q.defer();
      deferred.reject('rejectData');
      spyOn(scope, 'uploadPhotoFile').and.returnValue(deferred.promise);

      scope.postImage(fileURI, message);
      scope.$apply();
      expect(scope.errorUploadPhotoFileTest).toEqual('rejectData');
      window.localStorage['accessToken'] = '';
  });

})
