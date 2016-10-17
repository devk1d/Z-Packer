/*
* @Title
* @Author	echoChan
* @Date 	Wed 15 Jun 2016 04:37:29 PM CST
*/

Z.define('series/video', {
	initialize: function() {
		var $playerWrap = $('.video_player');
		var vu = $playerWrap.data('vu'); 
		var uu = $playerWrap.data('uu'); 

		// pc 端且视频源为乐视时 加载载自己的播放器
		if(!isMobile.Phone() && vu != '' && uu !='') {
			this.initZflash();
		}
		this.bindEvt();
		this.shareEvent();
	},
	
	// 初始化自己的播放器
	initZflash: function() {
		var $playerWrap = $('.video_player');
		var vu = $playerWrap.data('vu'); 
		var swf_url = STATIC_HOST + 'flash/KokoroPlayer.swf';
		var videojj_referer = window.location.href;
		var flashvars = {lecloud_video_unique: vu, videojj_appkey: 'V1po-op1b', videojj_video_url: vu, videojj_referer: videojj_referer, videojj_enable: 1};
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
			"1120", "630", 
			swfVersionStr, xiSwfUrlStr, 
			flashvars, params, attributes);
		swfobject.createCSS("#post_playerWrap", "display:block;text-align:left;");
	},

	bindEvt: function() {
		var $container = $('.wechat_mask');
		//微信分享
		var wechatDialog = new Dialog({
			content: $container.find(".mask_wechat").show(),
		});

		var $wechatDialogWrap = wechatDialog.$wrap;
		$wechatDialogWrap.on('click', '.pop_close', function() {
			wechatDialog.hide();
		});
		$wechatDialogWrap.find('.dialog_inner').css({'width':'560px', 'height': '360px','margin-top':'-190px', 'margin-left':'-280px'})
		WechatDialog = wechatDialog;

		$('.series_share .wechat').on('click', function() {
			WechatDialog.show();
		});
	},

	shareEvent: function() {
		var self = this;
		var $title = $('.series_head h1');

		//网页title
		var title = 'ZEALER「'+$title.text()+'」';
		//微博按钮
		var $wb_shareBtn = $('.series_share .weibo');
		//空间按钮
		var $qz_shareBtn = $('.series_share .qzone');
		//分享文字
		var wb_title = title + '（分享自 @ZEALER中国）';
		//分享图片
		var pic = $('.pic_bpic li').eq(0).find('img').attr('src');
		//分享地址
		//var url = document.URL;
		var url = '';
		if (typeof letvcloud_player_conf !== 'undefined') {
			url = encodeURIComponent('http://yuntv.letv.com/bcloud.html?uu='+letvcloud_player_conf.uu+'&vu='+letvcloud_player_conf.vu);
		} else {
			url = escape(document.URL);
		}
		var wb_appkey = "";
		var	wb_ralateUid = "3097378697";
		var wb_language = "zh_cn";
		var _height= 400;
		var _width = 600;
		var q_top = ($(window).height()-_height)/2;
		var q_left = ($(window).width()-_width)/2;
		var $playerWrap = $('.video_player');
		var vu = $playerWrap.data('vu');
		var uu = $playerWrap.data('uu');
		url = encodeURIComponent('http://yuntv.letv.com/bcloud.html?uu=' + uu + '&vu=' + vu + '&width=1120&height=664&skip=fenxiang&page_url=' + encodeURI(document.URL));
		
		$wb_shareBtn.on("click", function() {
			window.open("http://service.weibo.com/share/share.php?url="+url+"&appkey="+wb_appkey+"&title="+wb_title+"&ralateUid="+wb_ralateUid+"&language="+wb_language+"","_blank","width="+_width+", height="+_height+", top="+q_top+",left="+q_left+"");
			return false;
		});

		$qz_shareBtn.on("click", function() {
			//var vid = F.parseURL().params.id;
			window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary="+wb_title+"&title="+title+"&pics="+pic+"&url="+url+"","_blank","width="+_width+", height="+_height+", top="+q_top+",left="+q_left+"");
			return false;
		});
	}
});
