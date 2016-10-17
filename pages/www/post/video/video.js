Z.define('post/video', {
	initialize: function() {
		var $playerWrap = $('.player_screen');
		var vu = $playerWrap.data('vu'); 
		var uu = $playerWrap.data('uu'); 

		// pc 端且视频源为乐视时 加载载自己的播放器
		if(!isMobile.Phone() && vu != '' && uu !='') {
			this.initZflash();
		}
	},
	
	// 初始化自己的播放器
	initZflash: function() {
		var token = '';
		//var login_status = $.cookie('uc1');
		var login_status = $.cookie('uc1_offline');
		if (login_status != undefined) {
			//token = $.cookie('z_q1');
			token = $.cookie('z_q1_offline');
		}
		if (comment_enable == '1') {
			$('.player_screen').css('height', '680px');
		}
		var $playerWrap = $('.player_screen');
		var vu = $playerWrap.data('vu'); 
		var swf_url = STATIC_HOST + 'flash/KokoroPlayer.swf';
		var videojj_referer = window.location.href;
		var login_url = WWW_HOST + 'login?redirect=' + encodeURI(videojj_referer);
		var flashvars = {token: token, login_url: login_url, comment_enable: comment_enable, lecloud_video_unique: vu, videojj_appkey: 'V1po-op1b', videojj_video_url: vu, videojj_referer: videojj_referer, videojj_enable: 1};
		var swfVersionStr = "11.1.0";
		var xiSwfUrlStr = "playerProductInstall.swf";
		var params = {};
		var attributes = {};
		params.quality = "high";
		params.bgcolor = "#000000";
		params.allowscriptaccess = "always";
		params.allowFullScreenInteractive = "true";
		params.allowfullscreen = "true";
		params.wmode = "direct";
		attributes.id = "flashContent";
		attributes.name = "KokoroPlayer";
		attributes.align = "middle";

		swfobject.embedSWF(
			swf_url, "post_playerWrap", 
			"100%", "100%", 
			swfVersionStr, xiSwfUrlStr, 
			flashvars, params, attributes);
		swfobject.createCSS("#post_playerWrap", "display:block;text-align:left;");
	}
});
