//console.log(window.opener.angular.element(document.getElementsByClassName('.main-panel')[0]).__proto__.scope());

//window.opener.angular.element($('.main-panel')).__proto__.injector().‌​get('$rootScope').photoConnect(jshare.photoConnect.type, jshare.photoConnect.pages);

document.write(window.opener.location.pathname);     
if(window.opener.location.pathname == '/photos')
{
	window.opener.photoConnect(jshare.photoConnect.type, jshare.photoConnect.pages);
	self.close();
}
else if(window.opener.location.pathname == '/onboarding')
{
	window.opener.onboardingConnect(jshare.photoConnect.type, jshare.photoConnect.pages);
	self.close();

}
