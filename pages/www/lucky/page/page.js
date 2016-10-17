
Z.define('lucky/page', {
	initialize: function(opts) {
		//微信分享配置初始化
		//this.wxinitial(opts.appId, opts.timestamp, opts.nonceStr, opts.signature);
		
		//loading页面
		//window.onload = function(){
			$('#loading').remove();	
			$('.lucky_contain').show();	
		//};
		$(window).unload(function(){
			//停止播放 
			$('#audio_a')[0].pause();
		});
		
		//var device_token = opts.tag;
		var self = this;
		var type = 1;//device_token判断标志
		var music = 1;//音乐关闭判定标志
		var state = 1;//剩余抽奖次数为0判断标志
		var isBegin = false;//防抖动标志
		var times = $.cookie('times');
		var device_token = F.parseURL().params.device_token;
		
		//设定cookie截止时间戳
		var date = new Date();
		date.setHours(23);
		date.setMinutes(59);
		date.setSeconds(59);
		date = new Date(date.getTime()+28800*1000);
		
		//device_token获取判断	
		if(typeof(device_token)=='undefined') {
			type = 0;
			if(typeof(times)=='undefined'){
				times = 3;
				$.cookie('times', times,  {expires: date});
			}
			$('.footerbox_detail span').text(times);
			if(times==0) state = 0;
		}else{
			Access(device_token);
			//console.info('have token');
		};
		
		//设置css样式
		var height = document.documentElement.clientHeight;
		var width = document.documentElement.clientWidth;
		$('.lucky_contain').css('height', height);
		$('#loading').css({'width': width,'height': height});
		$('.monkey').css({'top': height*0.38, 'right': -height*0.1});
		$('.lucky_box').css('width', height*0.5);
		$('.overlay').css({'height': height, 'width': width});
		$('.overlay1').css({'height': height, 'width': width});
		$('.close_r').css('height', height*0.1);
		$('.close_g').css('height', height*0.1);
		$('.lucky_success .tips_content').css('marginTop', height*0.63);
		$('.item').css('width', $('.item').innerWidth());
		//获取单个图片高度
		var u = $('.item').innerWidth()*264/166;
		
		//点击抽奖操作
		$('.btn').click(function(){
			//防抖动判断
			if(isBegin) return false;
			isBegin = true;
			//样式初始化
			$(this).attr('src','machine_pole.gif');
			$('.item').css('backgroundPositionY', 0);
			//摇杆声音播放
			$('#audio_pole')[0].play();    
			//google事件统计
			F.ga('button','click','play_total');  
			//剩余抽奖次数处理		
			var num = parseInt($('.footerbox_detail span').text());
			if(num>0) num--;
			if(type == 0) $.cookie('times', num,  {expires: date});
			//请求中奖信息
			if(state==1&&type==1) Request(device_token);
			$('.footerbox_detail span').text(num);
			//确认中奖信息
			var result = Rand($('.notice').text());
			var arr = (result + '').split('');
			//开始抽奖动画
			$('.item').each(function(index){
				var item = $(this);
				//摇奖声音
				$('#audio_pan')[0].play();
				setTimeout(function(){
					item.animate({
						backgroundPositionY: (u*20)-(u*arr[index])
					},{
						duration: 2000+index*500,
						easing: 'easeInOutCirc',
						complete: function(){
						if(index==2){ 
								isBegin = false;
								setTimeout(function(){
									if($('.footerbox_detail span').text()>=0 && state==1){
										$('.overlay').css('display', 'block');
										Award($('.notice').text());
										if($('.footerbox_detail span').text()==0) state=0; 
									}else{
										$('.overlay').css('display', 'block');
										$('.nochance_tips').css('display', 'block');	
									}
									//获奖声音
									$('#audio_award')[0].play();
								},500);
							}
						}
					});
				}, index * 300);
			});
		});

		//随机函数(不中奖则随机)	
		function Rand(opts){
			var rand = 0;
			switch(opts){
				case 'first': {
					rand = 555;
					break;
				}
				case 'second': {
					rand = 111;
					break;
				}
				case 'third': {
					rand = 222;
					break;
				}
				case 'fourth': {
					rand = 333;
					break;
				}
				case 'fifth': {
					rand = 444;
					break;
				}
				default: {
					do{
						var x = parseInt(Math.random()*5+1);
						var y = parseInt(Math.random()*5+1)*10;
						var z = parseInt(Math.random()*5+1)*100;
						rand = x + y + z;
					}while(rand%111==0)
					break;	
				}
			}
			return rand;
		}

		//请求入口信息
		function Access(opts){
			$.post('/activity/wandoujiatotal', {device_token: opts,YII_CSRF_TOKEN: $('.btn').data('token') }, function(json){
				if(json.status == 200) {
					//console.info(json);
					var total = 3 - json.message.total;
					if(total<=0) {
						total = 0;
						state = 0;
					}
					if(isNaN(total)) total = 3;
					$('.footerbox_detail span').text(total);
					var state1 = json.message.notice;
					if(state1 == 'prize_no_add'){
						$('.overlay1').css('display', 'block');
						$('.lucky_awardsign').css('display', 'block');	
						$('.monkey').css('display', 'none');
					}
				}else{
					console.info('error');
				}
			},'json');
		}

		//请求中奖信息
		function Request(opts){
			$.post('/activity/wandoujiatodo', {device_token: opts,YII_CSRF_TOKEN: $('.btn').data('token')}, function(json){
				if(json.status == 200) {
					//console.info(json.message.notice);
					$('.notice').text(json.message.notice);
				}else{
					console.info('error');
				}
			},'json');
		}

		//记录中奖用户信息
		function Sign(opt1, opt2, opt3, opt4){
			$.post('/activity/wandoujiatoreport', {name: opt1, mobile: opt2, address: opt3, device_token: opt4}, function(json){
				if(json.status == 200) {
					//console.info(json);			
				} else {
					console.info('error');			
				}
			}, 'json');
		}

		//判断奖品类型函数
		function Award(opts){
			switch(opts){
				case 'first': {
						$('.grade').text('一等奖');
						$('.font_s').text('Ticwatch智能手表');
						$('.award_img').attr('src','award_prize_1st.png');
						$('.lucky_tips').css('display', 'block');	
						break;
					}
				case 'second': {
						$('.grade').text('二等奖');
						$('.font_s').text('人皇Sky签名腕托');
						$('.award_img').attr('src','award_prize_2nd.png');
						$('.lucky_tips').css('display', 'block');	
						break;
					}
				case 'third': {
						$('.grade').text('三等奖');
						$('.font_s').text('精品ZEALER定制腕托');
						$('.award_img').attr('src','award_prize_3rd.png');
						$('.lucky_tips').css('display', 'block');	
						break;
					}
				case 'fourth': {
						$('.grade').text('四等奖');
						$('.font_s').text('精品ZEALER定制手帐');
						$('.award_img').attr('src','award_prize_4th.png');
						$('.lucky_tips').css('display', 'block');	
						break;
					}
				case 'fifth': {
						$('.grade').text('参与奖');
						$('.font_s').text('精品ZEALER定制书签');
						$('.award_img').attr('src','award_prize_5th.png');
						$('.lucky_tips').css('display', 'block');	
						break;
					}
				default: {
						$('.nolucky_tips').css('display', 'block');	
						break;
					}
			}
		}
	
		//填写领奖信息
		$('.award_btn').click(function(){
			$('.lucky_tips').css('display', 'none');	
			$('.overlay').css('display', 'none');
			$('.overlay1').css('display', 'block');
			$('.lucky_awardsign').css('display', 'block');	
			$('.monkey').css('display', 'none');
		});

		//提交领奖信息
		$('.commit').click(function(){
			if($('.name').val() && $('.phone').val() && $('.area').val()){
				if($('.phone').val().length==11){
					Sign($('.gtame').val(), $('.phone').val(), $('.area').val(), device_token);
					$('.overlay').css('display', 'block');
					$('.lucky_success').css('display', 'block');
				}else{
					alert('请输入11位手机号码,谢谢~');
				}
			}else{
				alert('请输入完整信息,谢谢~');
			};
		});

		//抽奖说明页
		$('.footerbox_detail a').click(function(){
			$('.overlay').css('display', 'block');	
			$('.lucky_message').css('display', 'block');	
		});
		
		//信息提示页
		$('.lucky_message').click(function(){
			$('.overlay').css('display', 'none');	
			$('.lucky_message').css('display', 'none');	
		});
		
		//红色关闭按钮
		$('.close_r').click(function(){
			$('.nolucky_tips').css('display', 'none');	
			$('.lucky_tips').css('display', 'none');	
			$('.overlay').css('display', 'none');	
			$('.overlay1').css('display', 'none');	
			$('.lucky_success').css('display', 'none');	
			$('.lucky_awardsign').css('display', 'none');	
			$('.monkey').css('display', 'block');
		});
		
		//绿色关闭按钮
		$('.close_g').click(function(){
			$('.nochance_tips').css('display', 'none');	
			$('.overlay').css('display', 'none');	
		});

		//播放音乐控制
		$('.musicOn').click(function(){
			$(this).toggleClass('animationOn');
			if(music == 1){
				music = 0;
				$('.musicOn').attr('src', 'music2.png');	
				$('#audio_a')[0].pause();    //停止	
			}else{
				music = 1;
				$('.musicOn').attr('src', 'music.png');	
				$('#audio_a')[0].play();    //播放	
			}
		});

		//分享QQ空间
		$('.zone').click(function(){
			F.ga('button','click','share_zone_total');
			qqshare('ZEALER 欠你一份猴年好礼！2.0 新版上线，智能手表、定制周边送到手！','http://www.zealer.com/lucky//tag/share','http://img.zealer.com/690/0/fd90a00f0ebd8f79d3332336339f455268d.jpg');
		});

		//分享新浪微博
		$('.weibo').click(function(){
			F.ga('button','click','share_sina_total');
			sinashare('ZEALER 欠你一份猴年好礼！2.0 新版上线，智能手表、定制周边送到手！','http://www.zealer.com/lucky//tag/share','http://img.zealer.com/690/0/fd90a00f0ebd8f79d3332336339f455268d.jpg','');
		});
		
		//QQ空间
		function qqshare(title,url,picturl){
			var shareqqzonestring='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+title+'&url='+url+'&pics='+picturl;
			window.open(shareqqzonestring,'newwindow','height=400,width=400,top=100,left=100');
		}

		//新浪微博
		function sinashare(title,url,picturl,appkey){
			var sharesinastring='http://service.weibo.com/share/share.php?url='+url+'&title='+title+'&appkey='+appkey+'&content=utf-8&pic='+picturl;
			window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
		}

	},
	
	//微信自定义分享配置
	wxinitial: function(opt1, opt2, opt3, opt4) {
		//初始化配置
		wx.config({
			debug: true,
			appId: opt1,
			timestamp: opt2,
			nonceStr: opt3,
			signature: opt4,
			jsApiList: [
			// 所有要调用的 API 都要加到这个列表中
				'onMenuShareTimeline',
			]
		});
		//监听函数
		wx.ready(function () {
			// 在这里调用 API
			wx.onMenuShareTimeline({
				title: 'ZEALER 欠你一份猴年好礼！2.0 新版上线，智能手表、定制周边送到手！', // 分享标题
				link: 'http://www.zealer.com/lucky//tag/share', // 分享链接
				imgUrl: 'http://img.zealer.com/690/0/fd90a00f0ebd8f79d3332336339f455268d.jpg', // 分享图标
				success: function () { 
					// 用户确认分享后执行的回调函数
				},
				cancel: function () { 
					// 用户取消分享后执行的回调函数
				}
			});
		});
		//错误返回信息
		wx.error(function(res){
			console.info(res);
		});
		
	}

});


