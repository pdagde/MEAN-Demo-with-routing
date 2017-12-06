$(document).ready(function(e) {
	
	$('.forgot-link').click(function(event) {
		
		$('.modal-body').removeClass('signup-state');
		$('.modal-body').removeClass('login-state');
		$('.modal-body').addClass('forgot-state');
		$('#input-enter-name').removeAttr('required');
		$('#input-enter-email').attr('required', '');
		$('#input-enter-pass').removeAttr('required');
	});

	$('.signup-link').click(function(event) {
		
		$('.modal-body').removeClass('forgot-state');
		$('.modal-body').removeClass('login-state');
		$('.modal-body').addClass('signup-state');
		$('#input-enter-pass').removeAttr('required');
		$('#input-enter-email').attr('required', '');
		$('#input-enter-name').attr('required', '');
	});

	$('.login-link').click(function(event) {
		
		$('.modal-body').removeClass('forgot-state');
		$('.modal-body').removeClass('signup-state');
		$('.modal-body').addClass('login-state');
		$('#input-enter-name').removeAttr('required');
		$('#input-enter-email').attr('required', '');
		$('#input-enter-pass').attr('required', '');

	});

	$('close-btn').click(function(event) {
		$('.modal-body').removeClass('forgot-state');
		$('.modal-body').removeClass('login-state');
		$('.modal-body').addClass('signup-state');
	});
});