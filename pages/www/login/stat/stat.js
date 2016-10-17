Z.define('login/stat', {
	initialize: function(opts) {
		$(function(){
			if (type == 'reg') {
				StatReg(platform, category, version, uid, resource);
			} else {
				StatLogin(platform, category, version, uid);
			}
		});

		window.location.href = redirect;
	}
	
}).use();


