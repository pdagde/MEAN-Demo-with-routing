var nodeMailer=require('nodemailer');
var mailConfig ={
		service: 'Gmail',
    	auth: {
        	user: 'support@crive.me',
        	pass: 'Crive.17'
    	}
	};
var transport = nodeMailer.createTransport(mailConfig);
function sendEmail(mailOptions,callback,retry)
{	
	transport.sendMail(mailOptions,function(err, msg)
	{
		if(err)
		{
			console.log("having-email-error");
			console.log(err);
			if(err.code === 'Throttling')
			{
			}
			else
			{
				if(callback)
				{
					callback(true);
				}
			}
		}
		else
		{
			if(retry)
			{
				clearTimeout(retry.timer);
			}
			if(callback)
			{
				callback(false);
			}
			console.log("message-sent");
		}
	});
}



exports.sendverificationCode=function(auth)
{

  var pass = 'rString';
 var mailOptions={
        from: ['support@crive.me'],
        to:auth.email,
        subject:  "verification Mail please use this otp "+auth.verificationCode,
        text: "verification Mail please use this otp "+auth.verificationCode
    };
    sendEmail(mailOptions);
};
