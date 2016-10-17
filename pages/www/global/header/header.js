Z.define('global/header', {
	initialize: function() {
		this.$container = $('body');

		this.path = F.parseURL().controller || '';  //获取页面路径
		this.$account_seperate = this.$container.find('.account_seperate');  //pc分割线
		this.$mHeaderRight= this.$container.find('.mHeader_right');  
		if(this.path != 'apple2016') {  //暂时i7直播页面隐藏头部需求加载
			this.showUser();
		}else {
			this.$account_seperate.hide();
			this.$mHeaderRight.hide();
		}

		this.$postUser = this.$container.find('.user_card');
		this.$mHeader = $('.global_mHeader');

		this.bindEvt();
		this.updateStatus();
		this.updateStatusSidebar();
	},

	bindEvt: function() {
		var self = this;
		var $mMenu = self.$mHeader.find('.mHeader_menu');
		var $globalCover = $('.global_cover');
		var $footerDown = $('.global_appDownload');
		var $win = $(window);

		$mMenu.click(function() {
			if(self.$mHeader.hasClass('mHeader_white')) {
				$('.mHeader_menuList').animate({
					top: '-360' 
				}, 400, function(){
					self.$mHeader.removeClass('mHeader_white');
				});
				$globalCover.hide();
			} else {
				self.$mHeader.addClass('mHeader_white');
				$('.mHeader_menuList').animate({
					top: '44' 
				}, 400);
				$globalCover.show();
			}
		});

		$globalCover.click(function() {
			$('.mHeader_menuList').animate({
				top: '-360' 
			}, 400, function(){
				self.$mHeader.removeClass('mHeader_white');
			});
			$globalCover.hide();
		});

		// 移动端底部下载 app 	
		if($footerDown.length > 0) {
			$(window).scroll(function(){
				if($(document).scrollTop() > $win.height()*2/3 && $win.width() < 721){
					$footerDown.show();
				} else {
					$footerDown.hide();
				}
			});
		}

		// 搜索
		var $search_input = $('.head_searchInput');
		var $searchBtn = $('.head_searchIcon')
		$searchBtn.click(function(){
			var keyword = $.trim($search_input.val());
			window.location.href="/search/index?type=video&keyword=" + keyword;
		});

		$search_input.keydown(function(e) {
			var $this = $(this);
			if(e.which == 13) {
				$searchBtn.click();
			}
		});
	},

	showData: function(userData) {
		//设置cookie
		function setCookie(c_name,value,expiredays) {
			var exdate=new Date()
			exdate.setDate(exdate.getDate()+expiredays)
			document.cookie=c_name+ "=" +escape(value)+
			((expiredays==null) ? "" : "; expires="+exdate.toGMTString())+";path=/;domain=.zealer.com";
		}
		//获取cookie
		function getCookie(c_name) {
			if (document.cookie.length>0) { 
				c_start=document.cookie.indexOf(c_name + "=")
				if (c_start!=-1) { 
					c_start=c_start + c_name.length+1 
					c_end=document.cookie.indexOf(";",c_start)
					if (c_end==-1) c_end=document.cookie.length
						return unescape(document.cookie.substring(c_start,c_end))
				} 
			}
			return '';
		}

		var _username = userData.username;
		var _uid = userData.uid;
			
		//定义图片正则
		var regPic = /mb_pic50\.gif$/;
		if(userData.imgURL.match(regPic)  && getCookie('z_data') != _uid+'nodata') { //符合正则
			setCookie('z_data', _uid, 3650);  //设置cookie,最后一个参数是日期

			var $popup = new Dialog({
				content: F.template('showData.tpl', {}),
				popClose: true,
				width: 360,
				height: 400
			})
			$popup.show();
			$popup.$wrap.addClass('global_new_dialog');
			//资料
			$popup.find('#msg_pic').attr('src', userData.imgURL);
			$popup.find('#msg_name').html(_username);

			$popup.find('.dialog_close').on('click', function() {
				$popup.hide();
				setCookie('z_data', _uid+'nodata', 3650);  //设置cookie,最后一个参数是日期
			})
			$popup.find('.msg_btn_box').on('click', function() {  // 完善资料
				$popup.hide();
				setCookie('z_data', _uid+'nodata', 3650);  //设置cookie,最后一个参数是日期
			})
		}

	},
	showUser: function(){ 
		var self = this;
		var $globalNav = self.$container.find('.global_header');
		var $pageHeader = self.$container.find('.page_header');
		var $app_download = $globalNav.find('.app_download'); 
		var $app_area = $globalNav.find('.app_area'); 

		$app_download.hover( function() {
				$app_area.show();
			}, function() {
				$app_area.hide();
			}
		); 

		function setUserData(userData) {
			// 设置 post 页评论框左侧用户头像
			var reg = /w\/24\/h\/24/;
			self.$postUser && self.$postUser.find('img').attr('src', userData.imgURL.replace(reg,'w/50/h/50'));
			// 设置 post 页显示 评论框 or 登录提醒 （CDN 缓存原因）
			var $no_login_toReply = self.$container.find('.no_login_toReply');
			var $user_comment = self.$container.find('.user_comment');
			if($no_login_toReply.length > 0) {
				$no_login_toReply.hide();
				$user_comment.show();
			}
			// 设置导航用户信息
			self.bigNav(userData);
			/*
			if(!$globalNav.is(':visible')){
				self.smallNav(userData);
			}else { 
				self.bigNav(userData);
			}
			*/
			//$.cookie('user', JSON.stringify(userData), {expires: 30});
		}
		/*
		if($.cookie('user')) {
			var userData = JSON.parse($.cookie('user'));
			setUserData(userData);
		} else {
			*/

		$.get('/index/showUser', function(json) {
			if( json.status == 200 ){ 
				var userData = json.message;
				setUserData(userData);
				self.showData(userData);
				//$.cookie('user', JSON.stringify(userData), {expires: 30});
				// 移动端登录逻辑
				self.$mHeader.find('.mHeader_login').hide();
				self.$mHeader.find('.user_img').attr('src', userData.imgURL.replace(reg,'/50/50'))
				self.$mHeader.find('.img_link').show();

				// 新增通知的下拉列表
				var $smsInform = $('.sms_inform');	
				var $innerAccount = $('.inner_account');
				var $ul = $smsInform.find('.sms_inform_list ul');
				var $accountMsg = $innerAccount.find('.account_message'); 

				var notice = json.message.notice;
				var isEmpty = notice.empty;
				var noticeObj = notice.list;	
				var msgNum = notice.total_number ? notice.total_number : 0; 

				// 动态拼接显示的下拉框
				var msgUrl = '', strLi = '';

				if(!isEmpty) {
					for (var k in noticeObj) {
						if (noticeObj.hasOwnProperty(k))	{
							switch(k) {
								case 'reply':
									msgUrl = WWW_HOST+'message?type=discuss';
									break;
								case 'assist':
									msgUrl = WWW_HOST+'message?type=appro';
									break;
								case 'collect':
									msgUrl = WWW_HOST+'message?type=collect';
									break;
								case 'answer':
									msgUrl = WWW_HOST+'message?type=answer';
									break;
							}

							strLi += '<li><a href="javascript:void(0);" data-url='
								+ msgUrl +' data-type=' + k +' class="clear"><span class="sms_inform_name">'
								+ noticeObj[k].c_name +'</span><span class="sms_inform_num">'
								+ noticeObj[k].total_number +'</span></a></li>';	
						}
					} 
				} else {
					strLi = '<li>暂无通知</li>';
				}
			
				$ul.html(strLi);
				
				// 通知不为0，才显示数量
				if(msgNum != 0){
					$innerAccount.find('.message_num').text('('+msgNum+')');
					$accountMsg.removeClass('no_show');
					$innerAccount.find('.sms_list').css('left', '-100px');
				}else if(!$accountMsg.hasClass('no_show')){
					$innerAccount.find('.message_num').text('');
					$accountMsg.addClass('no_show');	
				};
				
				$accountMsg.on('mouseenter', function(){
					if(!$accountMsg.hasClass('no_show')) {   //没有消息不用显示
						$smsInform.show();	
					}
				}).on('mouseleave', function(){
					$smsInform.hide();		
				});	
				$smsInform.on('mouseenter', function(){
					if(!$accountMsg.hasClass('no_show')) {   //没有消息不用显示
						$smsInform.show();	
					}
				}).on('mouseleave', function(){
					$smsInform.hide();			
				});
			}
			else {
				if(!$globalNav.is(':visible')){
					$pageHeader.find('.inner_login').show();
				}else { 
					$globalNav.find('.inner_login').show();
				}
				//$.cookie('user', "", {expires: 30});
			}
		}, 'json');
	},

	bigNav: function(userData){
		var self = this;
		//大导航
		var $innerAccount = self.$container.find('.global_header .inner_account');
		var $accountMessage = $innerAccount.find('.account_message');
		var $accountLetter = $innerAccount.find('.account_letter');
		var $messageList = $innerAccount.find('.message_list');
		var $smsList = $innerAccount.find('.sms_list');
		var $smsInform = $innerAccount.find('.sms_inform');

		var $innerUser = $innerAccount.find('.account_user');
		var $userImg = $innerUser.find('.user_img');
		$userImg.attr('src', userData.imgURL);
		
		$innerUser.find('.active_name').html(userData.nickname.substring(0, 8));

		var $innerLogin = self.$container.find('.inner_login');
		$innerLogin.hide();
		$innerAccount.show();
		//messageList();
		//var mTimer = setInterval(messageList, 60000);
		function messageList(){
			$.post('/index/unread', {}, function(html){
				$messageList.html(html);
				var messageTotal = $messageList.find('.message_arrow').attr('totalnum'); 
				if( messageTotal != '0' ){
					$accountMessage.find('.message_num').html('(' + messageTotal + ')');
				}else {
					$accountMessage.find('.message_num').html('');
				}
				$accountMessage.on('mouseenter', function(){ 
					$messageList.show().on('mouseenter', function(){ 
						$(this).show();
					});
				});

				//通知标记已读
				$messageList.on('click', '.list_detail', function(){
					var msgId = $(this).attr('msgId');
					var threadId = $(this).attr('threadId');
					$messageList.hide();
					$.get('/message/readDiscuss', {id: msgId, thread_id: threadId}, function(json){
						if( json.status == 200 ){
							messageList();
						}
					}, 'json');
				});
				//点击“我知道了”取消所哟通知
				$messageList.find('.message_btn span').on('click', function(){
					$.get('/message/readAll', {}, function(json){
						messageList();
						$accountMessage.find('.message_num').html('');
					}, 'json');
				});

				$accountMessage.on('mouseleave', function(){ 
					$messageList.hide();
					$messageList.on('mouseleave', function(){ 
						$(this).hide();
					});
				});
			}, 'html');
		}

		var $accountUser = $innerAccount.find('.account_user');
		var $userActive = $accountUser.find('.user_active'); 
		$accountUser.on('mouseenter', function(){
			$userActive.show();
		});
		$accountUser.on('mouseleave', function(){
			$userActive.hide();
		});
		
		//私信
		smsList();
		//var sTimer = setInterval(smsList, 60000);
		function smsList(){
			$.get('/index/sms?t=0', function(html){
				$smsList.html(html);  
				//设置空掉私信下拉框，产品说不需要
				var smsTotal = $smsList.find('.sms_arrow').attr('totalnum');
				if( (smsTotal != '0') && (smsTotal != undefined) ){
					$accountLetter.find('.letter_num').html('(' + smsTotal + ')');
				}else {
					$accountLetter.find('.letter_num').html('');
				}
				//点击单个后标记已读
				$smsList.on('click', '.list_detail', function(){
					var sid = $(this).attr('sid');
					var rid = $(this).attr('rid');
					$.get('/message/reading', {s_id: sid, r_id: rid}, function(json){
						//window.location.reload();
						smsList();
					}, 'json');

				});
				//标记全部已读
				$smsList.on('click', '.sms_btn span', function(){
					$.get('/message/readingAll', {}, function(json){
						smsList();
						$accountLetter.find('.letter_num').html('');
					}, 'json');
				});
				
				$accountLetter.on('mouseenter', function(){
					 //注释掉私信下拉框，产品说不需要
					/*
					$smsList.show().on('mouseenter', function(){
						$(this).show();
					});
					*/
				});
				$accountLetter.on('mouseleave', function(){ 
					$smsList.hide().on('mouseleave', function(){ 
						$(this).hide();
					});
				});
			}, 'html');
		}
	},
	
	// 点击通知项，设置全部为已读	
	updateStatus: function() {
		var self = this;
		var $innerAccount = self.$container.find('.global_header .inner_account');
		var $smsInformList = $innerAccount.find('.sms_inform_list');
		
		$smsInformList.on('click', 'a', function() {
			var $this = $(this);
			var _type = $this.data('type');
			var url = $this.data('url');

			$.get('/message/updateStatus', {type: _type}, function(json){
				if( json.status == 200 ){
					$this.closest('li').remove();
					self.showUser();
					window.location.href = url;
				}
			}, 'json');
		});
	},


	// 侧边栏点击通知项，设置全部为已读	
	updateStatusSidebar: function() {
		var $leftList = $('.message_list .content_left .left_list');

		$leftList.on('click', 'a', function() {
			var $this = $(this);
			var _type = $this.attr('otype');

			// 该if判断是因为后台和前台在评论和点赞字段不一样
			if(_type == 'discuss') {
				_type = 'reply';		
			} else if (_type == 'appro'){
				_type = 'assist';		
			} else {
				_type = _type;		
			}
			// 如果是点击私信，则不用标记全部已读。直接return进入列表
			if (_type == 'inbox'){
				return;		
			}

			var url = $this.data('url');

			$.get('/message/updateStatus', {type: _type}, function(json){
				if( json.status == 200 ){
					$this.closest('li').remove();
					window.location.href = url;
				}
			}, 'json');
		});
	}

})
