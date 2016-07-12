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
  //  https://www.facebook.com/dialog/feed?app_id=171126103041654&name=postTest&display=popup&caption=testCaption&description=this is a test&link=image.jpg&redirect_uri=http://facebook.com&picture=image.jpg', '_blank' ]
  })
})
