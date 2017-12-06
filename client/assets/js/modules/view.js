$(document).ready(function(e) {
	$('.pwd-lost-wrapper').hide();
	$('.password-lost').click(function(event) {
		
		$('.login-wrapper').hide(400, function(){
			$('.pwd-lost-wrapper').show(400);
		});
	});
});