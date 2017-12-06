app.controller('homeCtrl', function($scope, $http) {
	var loginURL = "http://ec2-52-38-21-15.us-west-2.compute.amazonaws.com:4000/";
    jQuery(document).ready(function(){
		var wrapperWidth = jQuery(".crive-max-wrapper h1").width();
		var wrapperWidthMin = jQuery(".crive-min-wrapper").width();
		var wrapperMargin = jQuery(window).width() - wrapperWidth;
		var wrapperMarginMin = jQuery(window).width() - wrapperWidthMin;
		//console.log(wrapperWidth + ", " + wrapperMargin);
		jQuery(".crive-first-fold-info").css({"right": (wrapperMargin/2)+"px"});
		jQuery(".crive-first-fold-scroll").css({"left": (wrapperMargin/2)+"px"});
		jQuery(".crive-first-fold-tooltip").css({"right": ((wrapperMargin/2) - 40)+"px"});
		jQuery(".crive-second-fold-images").width(wrapperWidthMin/2);
		jQuery(".crive-form-input").focus(function(){
			jQuery(this).prev().addClass("label-transition");
		});
		jQuery(".crive-form-input").blur(function(){
			jQuery(this).prev().removeClass("label-transition");
		});
		jQuery(".crive-login-btn").click(function(){
			jQuery(".login-modal-overlay").fadeIn(300);
			jQuery(".crive-forgot-content").hide();
			jQuery(".crive-signup-content").hide();
			jQuery(".crive-login-content").show();
			jQuery(".crive-auth-content").show();
		});
		jQuery(".crive-signup-btn").click(function(){
			jQuery(".login-modal-overlay").fadeIn(300);
			jQuery(".crive-forgot-content").hide();
			jQuery(".crive-signup-content").show();
			jQuery(".crive-login-content").hide();
			jQuery(".crive-auth-content").show();
		});
	});
	jQuery(document).scroll(function(){
		var imageOff = jQuery(".crive-home-distorted-content").offset();
	    var wHeight = jQuery(window).height();
	    var scrollP = jQuery(window).scrollTop();
	    var footerPos = jQuery("footer").height() + jQuery(".crive-footer-signup").height() + 100;
	    if(scrollP >= (imageOff.top-(wHeight/2))){
	    	if(scrollP >= (jQuery("body").height() - footerPos - wHeight)){
	    		jQuery(".crive-second-fold-images").removeClass("crive-image-plugin-fixed");
	    		jQuery(".crive-second-fold-images").addClass("crive-image-plugin-absolute");
	    	}
	    	else{
	    		jQuery(".crive-second-fold-images").addClass("crive-image-plugin-fixed");
	    		jQuery(".crive-second-fold-images").removeClass("crive-image-plugin-absolute");
	    	}
	    }
	    else{
	    	jQuery(".crive-second-fold-images").removeClass("crive-image-plugin-fixed");
	    	jQuery(".crive-second-fold-images").removeClass("crive-image-plugin-absolute");
	    }
	    var dashboardPos = jQuery(".crive-home-dashboard-content").offset();
	    var dashboardH = jQuery(".crive-home-dashboard-content").height();
	    var themePos = jQuery(".crive-home-theme-content").offset();
	    var themeH = jQuery(".crive-home-theme-content").height();
	    //console.log(dashboardPos.top + ", " + scrollP + ", " + dashboardH + "," +(dashboardPos.top + (dashboardH/2) - (wHeight/2)));
	    if(scrollP >= (dashboardPos.top - (wHeight*3/4))){
	    	$(".crive-home-image-box").addClass("crive-home-image-align");
	    	$(".crive-home-theme-preview").fadeIn(300);
	    	if(scrollP >= (themePos.top - (wHeight*3/4))){
	    		$(".crive-home-image-box").fadeOut(300);
	    		$(".crive-home-theme-preview").removeClass("crive-home-mac-dashboard");
	    		$(".crive-home-theme-preview").addClass("crive-home-mac-preview");
	    	}
	    	else{
	    		$(".crive-home-image-box").fadeIn(300);
	    		$(".crive-home-theme-preview").addClass("crive-home-mac-dashboard");
	    		$(".crive-home-theme-preview").removeClass("crive-home-mac-preview");
	    	}
	    }
	    else{
	    	$(".crive-home-theme-preview").fadeOut(300);
	    	$(".crive-home-image-box").removeClass("crive-home-image-align");	
	    }
		if(scrollP >= 100){
			jQuery(".crive-header-scroll").fadeIn(300);
		}
		else{
			jQuery(".crive-header-scroll").hide();
		}
	});
	$scope.scrollDownHome = function(){
		$('html, body').animate({
		    scrollTop: (jQuery(window).height() - 60)
		}, 300);
	}
	$scope.showTooltip = false;
	$scope.homeSignupFn = function(){
		var criveLoginName = jQuery("#home-signup-name").val();
		var criveLoginEmail = jQuery("#home-signup-email").val();
		if(criveLoginName == ""){
			jQuery("#home-signup-name").removeClass("crive-form-success");
			jQuery("#home-signup-name").addClass("crive-form-error");
			jQuery("#home-signup-name").next().css({"visibility":"visible"});
			jQuery("#home-signup-email").next().css({"visibility":"hidden"});
		}
		else if(criveLoginEmail == ""){
			jQuery("#home-signup-name").addClass("crive-form-success");
			jQuery("#home-signup-email").addClass("crive-form-error");
			jQuery("#home-signup-email").next().css({"visibility":"visible"});
			jQuery("#home-signup-name").next().css({"visibility":"hidden"});
		}
		else{
			jQuery("#home-signup-btn").prop('disabled', true);
			var sendData = { 
				em: criveLoginEmail, 
				fna: criveLoginName.split(" ")[0],
				lna: criveLoginName.split(" ")[criveLoginName.split(" ").length - 1]
			}
			console.log(sendData);
			$http.post(loginURL+"invite/new", sendData).success(function(data, status) {
				if(data.s == "p")
				{
					console.log(data);
					console.log(data.d);
					console.log(data.d.cr);
					if(data.d.cr == true){
						jQuery(".crive-auth-alert p span").html("We have sent you a confirmation email. Please verify it to get an invitation soon.");
						jQuery(".crive-auth-alert").removeClass("crive-auth-error");
						jQuery(".crive-auth-alert").addClass("crive-auth-success");
						jQuery(".crive-auth-alert").addClass("crive-auth-show");
						jQuery(".crive-auth-alert p i").removeClass("icon-504");
						jQuery(".crive-auth-alert p i").addClass("icon-505");
						jQuery("#home-signup-btn").prop('disabled', true);
					}
					else if(data.d.cr == false){
						jQuery(".crive-auth-alert p span").html("Looks like you are already in the list for invitation. We will invite you shortly.");
						jQuery(".crive-auth-alert").removeClass("crive-auth-success");
						jQuery(".crive-auth-alert").addClass("crive-auth-error");
						jQuery(".crive-auth-alert").addClass("crive-auth-show");
						jQuery(".crive-auth-alert p i").removeClass("icon-505");
						jQuery(".crive-auth-alert p i").addClass("icon-504");
						jQuery("#home-signup-btn").prop('disabled', false);
					}
				}
	        })
			.error(function(data, status){
	        	jQuery("#home-signup-btn").prop('disabled', false);
	        });	
		}
	}
	jQuery(".crive-auth-alert a").click(function(){
		jQuery(".crive-auth-alert").removeClass("crive-auth-show");
	});
});

app.controller('featuresCtrl', function($scope) {
    $scope.scrollFeature = function(tabName){
    	var tabPos = jQuery("#crive-feature-box-"+tabName).offset();
    	$('html, body').animate({
		    scrollTop: (tabPos.top - 120)
		}, 300);
    }
    jQuery(document).ready(function(){
		jQuery(".crive-login-btn").click(function(){
			jQuery(".login-modal-overlay").fadeIn(300);
			jQuery(".crive-forgot-content").hide();
			jQuery(".crive-signup-content").hide();
			jQuery(".crive-login-content").show();
			jQuery(".crive-auth-content").show();
		});
		jQuery(".crive-signup-btn").click(function(){
			jQuery(".login-modal-overlay").fadeIn(300);
			jQuery(".crive-forgot-content").hide();
			jQuery(".crive-signup-content").show();
			jQuery(".crive-login-content").hide();
			jQuery(".crive-auth-content").show();
		});
	});
    jQuery(document).scroll(function(){
		var scrollP = jQuery(window).scrollTop();
		var headerHeight = jQuery(".crive-header-transparent").height();
		if(scrollP >= 100){
			jQuery(".crive-header-scroll").fadeIn(300);
			if(scrollP >= (headerHeight - 60)){
				jQuery(".crive-header-tabs").addClass("crive-header-tabs-sticky");
			}
			else{
				jQuery(".crive-header-tabs").removeClass("crive-header-tabs-sticky");
			}
		}
		else{
			jQuery(".crive-header-scroll").hide();
		}
	});
});

app.controller('contactusCtrl', function($scope) {
    jQuery(document).ready(function(){
		jQuery(".crive-form-input").focus(function(){
			jQuery(this).prev().addClass("label-transition");
		});
		jQuery(".crive-form-input").blur(function(){
			jQuery(this).prev().removeClass("label-transition");
		});
		jQuery(".crive-login-btn").click(function(){
			jQuery(".login-modal-overlay").fadeIn(300);
			jQuery(".crive-forgot-content").hide();
			jQuery(".crive-signup-content").hide();
			jQuery(".crive-login-content").show();
			jQuery(".crive-auth-content").show();
		});
		jQuery(".crive-signup-btn").click(function(){
			jQuery(".login-modal-overlay").fadeIn(300);
			jQuery(".crive-forgot-content").hide();
			jQuery(".crive-signup-content").show();
			jQuery(".crive-login-content").hide();
			jQuery(".crive-auth-content").show();
		});
	});
	jQuery(document).scroll(function(){
		var scrollP = jQuery(window).scrollTop();
		var headerHeight = jQuery(".crive-header-transparent").height();
		if(scrollP >= 100){
			jQuery(".crive-header-scroll").fadeIn(300);
			if(scrollP >= (headerHeight - 60)){
				jQuery(".crive-header-tabs").addClass("crive-header-tabs-sticky");
			}
			else{
				jQuery(".crive-header-tabs").removeClass("crive-header-tabs-sticky");
			}
		}
		else{
			jQuery(".crive-header-scroll").hide();
		}
	});
	$scope.contactMsgFn = function(){
		var criveContactName = jQuery("#crive-contact-name").val();
		var criveContactEmail = jQuery("#crive-contact-email").val();
		if(criveContactName == ""){
			jQuery("#crive-contact-name").removeClass("crive-form-success");
			jQuery("#crive-contact-name").addClass("crive-form-error");
			jQuery("#crive-contact-name").next().css({"visibility":"visible"});
			jQuery("#cr").next().css({"visibility":"hidden"});
		}
		else if(criveContactEmail == ""){
			jQuery("#footer-signup-name").addClass("crive-form-success");
			jQuery("#footer-signup-email").addClass("crive-form-error");
			jQuery("#footer-signup-email").next().css({"visibility":"visible"});
			jQuery("#footer-signup-name").next().css({"visibility":"hidden"});
		}
		else{
			var sendData = { 
				em: criveLoginEmail, 
				fna: criveLoginName.split(" ")[0],
				lna: criveLoginName.split(" ")[criveLoginName.split(" ").length - 1]
			}
			console.log(sendData);
			$http.post(loginURL+"start/signup", sendData).success(function(data, status) {
				if(data.s == "p")
				{
					console.log(data);
					console.log(data.d);
					console.log(data.d.cr);
					if(data.d.cr == true){
						jQuery(".crive-auth-alert p span").html("We have sent you a confirmation email. Please verify it to get an invitation soon.");
						jQuery(".crive-auth-alert").removeClass("crive-auth-error");
						jQuery(".crive-auth-alert").addClass("crive-auth-success");
						jQuery(".crive-auth-alert").addClass("crive-auth-show");
						jQuery(".crive-auth-alert p i").removeClass("icon-504");
						jQuery(".crive-auth-alert p i").addClass("icon-505");
					}
					else if(data.d.cr == false){
						jQuery(".crive-auth-alert p span").html("Looks like you are already in the list for invitation. We will invite you shortly.");
						jQuery(".crive-auth-alert").removeClass("crive-auth-success");
						jQuery(".crive-auth-alert").addClass("crive-auth-error");
						jQuery(".crive-auth-alert").addClass("crive-auth-show");
						jQuery(".crive-auth-alert p i").removeClass("icon-505");
						jQuery(".crive-auth-alert p i").addClass("icon-504");
					}
				}
	        });	
		}
	}
});

app.controller('aboutusCtrl', function($scope) {
    jQuery(document).ready(function(){
		jQuery(".crive-login-btn").click(function(){
			jQuery(".login-modal-overlay").fadeIn(300);
			jQuery(".crive-forgot-content").hide();
			jQuery(".crive-signup-content").hide();
			jQuery(".crive-login-content").show();
			jQuery(".crive-auth-content").show();
		});
		jQuery(".crive-signup-btn").click(function(){
			jQuery(".login-modal-overlay").fadeIn(300);
			jQuery(".crive-forgot-content").hide();
			jQuery(".crive-signup-content").show();
			jQuery(".crive-login-content").hide();
			jQuery(".crive-auth-content").show();
		});
	});
	jQuery(document).scroll(function(){
		var scrollP = jQuery(window).scrollTop();
		var headerHeight = jQuery(".crive-header-transparent").height();
		if(scrollP >= 100){
			jQuery(".crive-header-scroll").fadeIn(300);
			if(scrollP >= (headerHeight - 60)){
				jQuery(".crive-header-tabs").addClass("crive-header-tabs-sticky");
			}
			else{
				jQuery(".crive-header-tabs").removeClass("crive-header-tabs-sticky");
			}
		}
		else{
			jQuery(".crive-header-scroll").hide();
		}
	});
});

app.controller('tosCtrl', function($scope) {
    jQuery(document).ready(function(){
		jQuery(".crive-login-btn").click(function(){
			jQuery(".login-modal-overlay").fadeIn(300);
			jQuery(".crive-forgot-content").hide();
			jQuery(".crive-signup-content").hide();
			jQuery(".crive-login-content").show();
			jQuery(".crive-auth-content").show();
		});
		jQuery(".crive-signup-btn").click(function(){
			jQuery(".login-modal-overlay").fadeIn(300);
			jQuery(".crive-forgot-content").hide();
			jQuery(".crive-signup-content").show();
			jQuery(".crive-login-content").hide();
			jQuery(".crive-auth-content").show();
		});
	});
});

app.controller('privacyCtrl', function($scope) {
    jQuery(document).ready(function(){
		jQuery(".crive-login-btn").click(function(){
			jQuery(".login-modal-overlay").fadeIn(300);
			jQuery(".crive-forgot-content").hide();
			jQuery(".crive-signup-content").hide();
			jQuery(".crive-login-content").show();
			jQuery(".crive-auth-content").show();
		});
		jQuery(".crive-signup-btn").click(function(){
			jQuery(".login-modal-overlay").fadeIn(300);
			jQuery(".crive-forgot-content").hide();
			jQuery(".crive-signup-content").show();
			jQuery(".crive-login-content").hide();
			jQuery(".crive-auth-content").show();
		});
	});
});

app.controller('footerSignupCtrl', function($scope, $http) {
	var loginURL = "http://ec2-52-38-21-15.us-west-2.compute.amazonaws.com:4000/";
    jQuery(document).ready(function(){
		jQuery(".crive-form-input").focus(function(){
			jQuery(this).prev().addClass("label-transition");
		});
		jQuery(".crive-form-input").blur(function(){
			jQuery(this).prev().removeClass("label-transition");
		});
	});
	$scope.footerSignupFn = function(){
		var criveLoginName = jQuery("#footer-signup-name").val();
		var criveLoginEmail = jQuery("#footer-signup-email").val();
		if(criveLoginName == ""){
			jQuery("#footer-signup-name").removeClass("crive-form-success");
			jQuery("#footer-signup-name").addClass("crive-form-error");
			jQuery("#footer-signup-name").next().css({"visibility":"visible"});
			jQuery("#footer-signup-email").next().css({"visibility":"hidden"});
		}
		else if(criveLoginEmail == ""){
			jQuery("#footer-signup-name").addClass("crive-form-success");
			jQuery("#footer-signup-email").addClass("crive-form-error");
			jQuery("#footer-signup-email").next().css({"visibility":"visible"});
			jQuery("#footer-signup-name").next().css({"visibility":"hidden"});
		}
		else{
			jQuery("#footer-signup-btn").prop('disabled', true);
			var sendData = { 
				em: criveLoginEmail, 
				fna: criveLoginName.split(" ")[0],
				lna: criveLoginName.split(" ")[criveLoginName.split(" ").length - 1]
			}
			console.log(sendData);
			$http.post(loginURL+"invite/new", sendData).success(function(data, status) {
				if(data.s == "p")
				{
					console.log(data);
					console.log(data.d);
					console.log(data.d.cr);
					if(data.d.cr == true){
						jQuery(".crive-auth-alert p span").html("We have sent you a confirmation email. Please verify it to get an invitation soon.");
						jQuery(".crive-auth-alert").removeClass("crive-auth-error");
						jQuery(".crive-auth-alert").addClass("crive-auth-success");
						jQuery(".crive-auth-alert").addClass("crive-auth-show");
						jQuery(".crive-auth-alert p i").removeClass("icon-504");
						jQuery(".crive-auth-alert p i").addClass("icon-505");
						jQuery("#footer-signup-btn").prop('disabled', true);
					}
					else if(data.d.cr == false){
						jQuery(".crive-auth-alert p span").html("Looks like you are already in the list for invitation. We will invite you shortly.");
						jQuery(".crive-auth-alert").removeClass("crive-auth-success");
						jQuery(".crive-auth-alert").addClass("crive-auth-error");
						jQuery(".crive-auth-alert").addClass("crive-auth-show");
						jQuery(".crive-auth-alert p i").removeClass("icon-505");
						jQuery(".crive-auth-alert p i").addClass("icon-504");
						jQuery("#footer-signup-btn").prop('disabled', false);
					}
				}
	        })
	        .error(function(data, status){
	        	jQuery("#footer-signup-btn").prop('disabled', false);
	        });		
		}
	}
	jQuery(".crive-auth-alert a").click(function(){
		jQuery(".crive-auth-alert").removeClass("crive-auth-show");
	});
});

app.controller('navCtrl', function($scope, $location) {
	if(jQuery(window).width() < 768){
		$scope.showMenu = false;
	}
	else{
		$scope.showMenu = true;
	}
	$scope.activeNav = function(navVar){
		if($location.path() == navVar){
			return true;
		}	
		else{
			return false;
		}
	}
});

app.controller('footerCtrl', function($scope, $location) {
	jQuery(".crive-footer-menu-list ul li a").click(function(){
		jQuery(window).scrollTop(0);
	});
	$scope.footerShow = true;
	if($location.path() == "/verify"){
		$scope.footerShow = false;
	}
	else{
		$scope.footerShow = true;
	}
});

app.controller('verifyCtrl', function($scope, $location){
	if($location.path() == "/verify"){
		jQuery("footer").hide();
		jQuery(".crive-footer-signup").hide();
	}
	else{
		jQuery("footer").show();
		jQuery(".crive-footer-signup").show();
	}
	var verifyVal = $location.search();
	if(verifyVal.success == "true"){
		jQuery(".crive-verify-success-content i").removeClass("icon-504");
		jQuery(".crive-verify-success-content i").addClass("icon-505");
		jQuery(".crive-verify-success-content p").html("Thanks for verifying your email address jay@crive.me<br/>You are in a queue and we will invite you very soon.");
	}
	else{
		jQuery(".crive-verify-success-content i").removeClass("icon-505");
		jQuery(".crive-verify-success-content i").addClass("icon-504");
		jQuery(".crive-verify-success-content p").html("We could not verify your email.<br/> Please confirm it again by clicking on verify button.");
	}
	$scope.fbShare = function(){
		var winHeight = 600;
		var winWidth = 400;
		var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);
        var descr = "I just signed up for crive to create my portfolio in simplest way. You should check it out. by @crivein http://www.crive.co";
        var url = "http://www.crive.co";
        window.open('http://www.facebook.com/sharer.php?s=100&p[summary]=' + descr + '&p[url]=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
	}
	$scope.twitterShare = function(){
		window.open("http://twitter.com/share?url=http://www.crive.co&text=I just signed up for crive to create my portfolio in simplest way. You should check it out. by @crivein","_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=200, left=300, width=600, height=400");
	}
	$scope.googleShare = function(){
		window.open("http://www.crive.co","_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=200, left=300, width=600, height=400");
	}
});

app.controller('loginCtrl', function($scope, $http){
	jQuery(".crive-auth-alert a").click(function(){
		jQuery(".crive-auth-alert").removeClass("crive-auth-show");
	});
	var loginURL = "http://ec2-52-38-21-15.us-west-2.compute.amazonaws.com:4000/";
	$scope.loginFn = function(){
		var criveLoginName = jQuery("#crive-login-name").val();
		var criveLoginPwd = jQuery("#crive-login-pwd").val();
		if(criveLoginName == ""){
			jQuery("#crive-login-name").removeClass("crive-form-success");
			jQuery("#crive-login-name").addClass("crive-form-error");
			jQuery("#crive-login-name").next().css({"visibility":"visible"});
			jQuery("#crive-login-pwd").next().css({"visibility":"hidden"});
		}
		else if(criveLoginEmail == ""){
			jQuery("#crive-login-name").addClass("crive-form-success");
			jQuery("#crive-login-pwd").addClass("crive-form-error");
			jQuery("#crive-login-pwd").next().css({"visibility":"visible"});
			jQuery("#crive-login-name").next().css({"visibility":"hidden"});
		}
		else{
			var sendData = { 
				em: criveLoginName, 
				pw: criveLoginPwd 
			}
			console.log(sendData);
			$http.post(loginURL+"start/login", sendData).success(function(data, status) {
				if(data.s == 'p'){
					$window.location.href = loginURL;
	        	}
	        });
		}
	}
	$scope.forgetFn = function(){
		var criveLoginEmail = jQuery("#crive-login-email").val();
		if(criveLoginName == ""){
			jQuery("#crive-login-email").next().css({"visibility":"visible"});
		}
		else{
			var sendData = { 
				em: criveLoginEmail
			}
			$http.post(loginURL+"start/forgetpwd", sendData).success(function(data, status) {
				if(data.d.cr == true){
					jQuery(".crive-auth-alert p").html("Succesful Signup " + criveLoginName.split(" ")[0] + "!<br/>" + "Now check your mail to finish<br>or<br>Skip to choos Theme");
					jQuery(".crive-auth-alert").fadeIn(300);
				}
				else if(data.d.cr == false){
					jQuery(".crive-auth-alert p").html("Looks like this email is already in the system! Try something else!");
					jQuery(".crive-auth-alert").fadeIn(300);
				}
	        });
		}
	}
	$scope.signupFn = function(){
		var criveLoginName = jQuery("#crive-login-name").val();
		var criveLoginEmail = jQuery("#crive-login-email").val();
		if(criveLoginName == ""){
			jQuery("#crive-login-name").removeClass("crive-form-success");
			jQuery("#crive-login-name").addClass("crive-form-error");
			jQuery("#crive-login-name").next().css({"visibility":"visible"});
			jQuery("#crive-login-email").next().css({"visibility":"hidden"});
		}
		else if(criveLoginEmail == ""){
			jQuery("#crive-login-name").addClass("crive-form-success");
			jQuery("#crive-login-email").addClass("crive-form-error");
			jQuery("#crive-login-email").next().css({"visibility":"visible"});
			jQuery("#crive-login-name").next().css({"visibility":"hidden"});
		}
		else{
			var sendData = { 
				em: criveLoginEmail, 
				fna: criveLoginName.split(" ")[0],
				lna: criveLoginName.split(" ")[criveLoginName.split(" ").length - 1]
			}
			console.log(sendData);
			$http.post(loginURL+"invite/new", sendData).success(function(data, status) {
				if(data.s == "p")
				{
					console.log(data);
					console.log(data.d);
					console.log(data.d.cr);
					if(data.d.cr == true){
						jQuery(".crive-auth-alert p span").html("We have sent you a confirmation email. Please verify it to get an invitation soon.");
						jQuery(".crive-auth-alert").removeClass("crive-auth-error");
						jQuery(".crive-auth-alert").addClass("crive-auth-success");
						jQuery(".crive-auth-alert").addClass("crive-auth-show");
						jQuery(".crive-auth-alert p i").removeClass("icon-504");
						jQuery(".crive-auth-alert p i").addClass("icon-505");
					}
					else if(data.d.cr == false){
						jQuery(".crive-auth-alert p span").html("Looks like you are already in the list for invitation. We will invite you shortly.");
						jQuery(".crive-auth-alert").removeClass("crive-auth-success");
						jQuery(".crive-auth-alert").addClass("crive-auth-error");
						jQuery(".crive-auth-alert").addClass("crive-auth-show");
						jQuery(".crive-auth-alert p i").removeClass("icon-505");
						jQuery(".crive-auth-alert p i").addClass("icon-504");
					}
				}
	        });
		}
	}

	$scope.loginfb = function(){

		$window.location.href = loginURL+'facebook/auth/login';
	}

	$scope.logininsta = function(){

		$window.location.href = loginURL+'instagram/auth/login';
	}

	$scope.logingoogle = function(){

		$window.location.href = loginURL+'google/auth/google';
	}

	jQuery(".login-modal-close").click(function(){
		jQuery(".login-modal-overlay").fadeOut(300);
	});

	jQuery(".modal-forgot-link a").click(function(){
		jQuery(".crive-forgot-content").show();
		jQuery(".crive-signup-content").hide();
		jQuery(".crive-login-content").hide();
		jQuery(".crive-auth-content").hide();
	});

	jQuery(".modal-signup-link").click(function(){
		jQuery(".crive-forgot-content").hide();
		jQuery(".crive-signup-content").show();
		jQuery(".crive-login-content").hide();
		jQuery(".crive-auth-content").show();
	});
	jQuery(".modal-login-link").click(function(){
		jQuery(".crive-forgot-content").hide();
		jQuery(".crive-signup-content").hide();
		jQuery(".crive-login-content").show();
		jQuery(".crive-auth-content").show();
	});
});