Z.define('relativity/relativity', {
	initialize: function(){
			this.$wrap = $('.wrap');	
			this.bindEvent();
			this.eyeMove();
			this.shareEvent();
		},	
	bindEvent: function(){
			self = this;
			var $wrapContent = self.$wrap.find('.wrap_content');	
			$wrapContent.on('mouseenter', '.video_content', function(){
				$(this).find('.list_cover').stop().animate({'opacity': '0.6'});
			});

			$wrapContent.on('mouseleave', '.video_content', function(){
				$(this).find('.list_cover').stop().animate({'opacity':'0'});	
			});
		},
	eyeMove: function(){
			var left_center_offset = {
				left: 164,
				top: 194
			},
			right_center_offset = {
				left: 264,
				top: 194
			},
			radius = 10;
			var setEyeOffset = function(event) {
			var offset = $(".caton_logo").offset();
			var x1 = offset.left + left_center_offset.left;
			var y1 = offset.top + left_center_offset.top;
			var x2 = offset.left + right_center_offset.left;
			var y2 = offset.top + right_center_offset.top;
								
			var n1 = event.clientX - x1;
			var m1 = -(event.clientY - y1);
			var k1 = Math.atan2(m1, n1);
						
			var n2 = event.clientX - x2;
			var m2 = -(event.clientY - y2);
			var k2 = Math.atan2(m2, n2);
			//左眼
			var x11 = (Math.cos(k1) * radius + x1).toFixed(0);
			var y11 = (( - Math.sin(k1) * radius) + y1).toFixed(0);


			$("#eye_left").offset({
				left: x11,
				top: y11
			});
			//右眼
			var x22 = (Math.cos(k2) * radius + x2).toFixed(0);
			var y22 = (( - Math.sin(k2) * radius) + y2).toFixed(0);

			$("#eye_right").offset({
				left: x22,
				top: y22
			})
		};
			$('#main').mousemove(setEyeOffset);
		},

	shareEvent: function() {
		var self = this;
		var $container = $('#main');
		var $wrapHead = $container.find('.wrap_header');
		var $title = $wrapHead.find('h1');
		var $wb_share = $('.post_answer');

		//网页title
		var title = 'ZEALER「'+$title.text()+'」';

		//微博按钮
		var $wb_shareBtn = $wrapHead.find('.weibo');

		//空间按钮
		var $qz_shareBtn = $wrapHead.find('.qzone');
		
		//百度按钮
		var $baidu_shareBtn = $wrapHead.find('.baidu');

		//豆瓣按钮
		var $db_shareBtn = $wrapHead.find('.douban');

		//分享文字
		var wb_title = title+'（分享自 @ZEALER中国）';

		//分享地址
		var url = document.URL;

		var wb_appkey = "";
		var	wb_ralateUid = "3097378697";
		var wb_language = "zh_cn";
		var _height= 400;
		var _width = 600;
		var q_top = ($(window).height()-_height)/4;
		var q_left = ($(window).width()-_width)/2;
		

		$wb_shareBtn.on("click", function() {
			window.open("http://service.weibo.com/share/share.php?url="+url+"&appkey="+wb_appkey+"&title="+wb_title+"&ralateUid="+wb_ralateUid+"&language="+wb_language+"","_blank","width="+_width+", height="+_height+", top="+q_top+",left="+q_left+"");
			return false;
		});

		$qz_shareBtn.on("click", function() {
			//var vid = F.parseURL().params.id;
			window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary="+wb_title+"&title="+title+"&pics="+"&url="+url+"","_blank","width="+_width+", height="+_height+", top="+q_top+",left="+q_left+"");
			return false;
		});
	
			$baidu_shareBtn.on("click", function(){
			window.open("http://www.tieba.baidu.com/f/commit/share/openShareApi?title=网盟开放平台_百度贴吧&url="+url,"_blank","width="+_width+", height="+_height+", top"+q_top+",left="+q_left+"");
			return false;

		});


		$db_shareBtn.on("click", function(){
			window.open("http://www.douban.com/recommend/?url="+url+"&title"+wb_title+"&v=1","_blank","width="+_width+", height="+_height+", top"+q_top+",left="+q_left+"");
			return false;

		});
	}

	
});
