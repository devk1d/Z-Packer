Z.define('page/page',{
	initialize: function() {
		this.$wrap = $('.wrap');
		this.load();
		this.list_content();
		this.sendReply();

	},
	load: function(){
		var self = this;
		var params = F.parseURL().params;
		var pageType = params.type;
		//s是发送方
		//a是接受方
		//f是垃圾信息
		var s = params.s;
		var a = params.a;
		var f = params.f;
		if(typeof(s) == "undefined") {
			s = 0;
		}
		if(typeof(a) == "undefined") {
			a = 0;
		}
		if(typeof(f) == "undefined") {
			f = 0;
		}
		if(pageType == 'spam') {f =1 };
		var $contentRight= self.$wrap.find('.content_right');
		if( pageType == 'dialog' ){
			self.$wrap.find('.content_left a').removeClass('sidebar_active').closest('[otype=inbox]').addClass('sidebar_active');
		}else {
			self.$wrap.find('.content_left a').removeClass('sidebar_active').closest('[otype=' + pageType + ']').addClass('sidebar_active');
			// 一级标题添加样式
			if( pageType == 'inbox' ) {
				self.$wrap.find('.content_left dt').removeClass('dt_active').closest('.dt_inbox').addClass('dt_active');
			} else {
				self.$wrap.find('.content_left dt').removeClass('dt_active').closest('.dt_inform').addClass('dt_active');
			}
			
		}
	
		//防止用户对自己私信
		if( a != 0 && s != 0 && s == a ){
			window.location.href = '/user?type=setbasic';
			return false;
		}
		
		$.get('/message', {type: pageType, s:s, a:a, f:f, clear: 1}, function(json) {
			if(json.status == 200) {
				$contentRight.html(json.message.html);
				switch (pageType) {
					case 'discuss':
						function discussList(){
							var $discussList = $contentRight.find('.discuss_list'); 
							var getUrl = '/message/discussList';

							$.get(getUrl, {}, function(html){
								$discussList.html(html);
								var totalNumber = $discussList.find('.totalnum').attr('totalNum');
								var page = new Page({
									wrap: self.$wrap.find('.page_inbox'),
									url: getUrl,
									totalPage: Math.ceil(totalNumber/20),
									type: 'html',
									callback: function(data) {
										$discussList.html(data);
									}
								});
								//标记评论已读
								$discussList.on('click', '.message_reply_written', function(){
									var msgId = $(this).data('msgid');
									var threadId = $(this).data('threadid');
									var url = $(this).data('url');
									$.get('/message/readSinal', {id: msgId, thread_id: threadId}, function(json){
										if( json.status == 200 ){
											window.location.reload();
										}
									}, 'json');
								});
							}, 'html');
						}
						
						discussList();
						break;

					case 'appro':
						function approList(){
							var $approList = $contentRight.find('.appro_list'); 
								var getUrl = '/message/approList';
								$.get(getUrl, {}, function(html){
									$approList.html(html);
									var totalNumber = $approList.find('li:last-child').attr('totalNum');
									var page = new Page({
										wrap: self.$wrap.find('.page_inbox'),
										url: getUrl,
										totalPage: Math.ceil(totalNumber/20),
										type: 'html',
										callback: function(data) {
											$approList.html(data);
										}
									});

									//标记点赞已读
									$approList.on('click', '.reply_others a', function(){
										var msgId = $(this).data('msgid');
										var threadId = $(this).data('threadid');
										$.get('/message/readSinal', {id: msgId, thread_id: threadId}, function(json){
											if( json.status == 200 ){
												window.location.reload();
											}
										}, 'json');
									});
								}, 'html');
							}
							
						approList();	
						break;

					case 'collect':
						function collectList(){
							var $list = $contentRight.find('.collect_list'); 
							var getUrl = '/message/collectList';
							$.get(getUrl, {}, function(html){
								$list.html(html);
								var totalNumber = $list.find('li:last-child').attr('totalNum');
								var page = new Page({
									wrap: self.$wrap.find('.page_inbox'),
									url: getUrl,
									totalPage: Math.ceil(totalNumber/20),
									type: 'html',
									callback: function(data) {
										$list.html(data);
									}
								});
							}, 'html');
						}
						
						collectList();
						break;

					case 'answer':
						function answerList(){
							var $list = $contentRight.find('.answer_list'); 
							var getUrl = '/message/answerList';
							$.get(getUrl, {}, function(html){
								$list.html(html);
								var totalNumber = $list.find('li:last-child').attr('totalNum');
								var page = new Page({
									wrap: self.$wrap.find('.page_inbox'),
									url: getUrl,
									totalPage: Math.ceil(totalNumber/20),
									type: 'html',
									callback: function(data) {
										$list.html(data);
									}
								});

								//标记回答已读
								$list.on('click', '.message_reply_written', function(){
									var msgId = $(this).data('msgid');
									var threadId = $(this).data('threadid');
									var url = $(this).data('url');
									$.get('/message/readSinal', {id: msgId, thread_id: threadId}, function(json){
										if( json.status == 200 ){
											window.location.reload();
										}
									}, 'json');
								});
							}, 'html');
						}
						
						answerList();
						break;

					case 'inbox':
						//未读私信数量
						$.get('/message/unreadNum',{s_id: s, r_id: a},function(json){ 
							if(json.status ==200) {
								
							}
						},'json');

						//加载对话列表框
						$.get('/message/boxList', {t: 0}, function(html) {
							if($.trim(html) != '') {
								
								var $inboxShow = self.$wrap.find('#inbox_show');
								$inboxShow.html(html);
								//点击单个后标记已读
								$inboxShow.on('click', '.msg_right .right_content', function(){
									var sid = $(this).attr('sid');
									var rid = $(this).attr('rid');
									$.get('/message/reading', {s_id: sid, r_id: rid}, function(json){
										window.location.reload();
									}, 'json');

								});


								var total_num = $('#inbox_show').find('.msg_text').attr('totalnum');
								//page
								var page = new Page({
									wrap: self.$wrap.find('.page_inbox'),
									data: {type: 'inbox'},
									url: '/message/boxList',
									totalPage: Math.ceil(total_num/20),
									type: 'html',
									callback: function(html) {
										self.$wrap.find('#inbox_show').html(html);
									}
								});

								//移到垃圾
							$inboxShow.on('click', '.right_remove', function(event) {
									if( confirm('确定删除吗?') ){
										event.preventDefault();
										// id是私信的id
										var $this = $(this);
										var _s_id = $this.data('sid');
										var _r_id = $this.data('rid');
										var _id = $this.data('id');
										var type = $this.attr('id');
										//var getUrl = '/message/delMessage';
										var getUrl = '/message/setSpam';
										//if (type=="remove_inbox") _url='/user/setNormal';

										$.post(getUrl, {s_id: _s_id, r_id: _r_id}, function(json) {
											//console.log(json);
											if(json.status ==200) {
													//alert(json.message);
													//window.location.reload();
													// 用remove元素代替之前的reload页面，看起来不会页面被刷，好一点
													$this.closest('.msg_text').remove();

											}else {
													alert(json.message);
											}
										},'json');
									}
								});
							}else {
								self.$wrap.find('#inbox_show').after('(你的收件箱是空的)');
							}
							
						}, 'html');
						//_self.removeMsg();
						break;

					case 'dialog':
						function dialogShow() {
							$.get('/message/boxList',{s:s, a:a, f:f},function(html) {
								
								html = $.trim(html);
								if( html.length != 0 ){
									$('#dialog_show').html(html);
									var totalNum = self.$wrap.find('.dialog_list').attr('totalNum');
									//page
									var page = new Page({
										wrap: self.$wrap.find('.page_dialog'),
										data: {s: s, a: a, f:f},
										url: '/message/dialogList',
										totalPage: Math.ceil(totalNum/20),
										type: 'html',
										callback: function(html) {
											self.$wrap.find('#dialog_show').html(html);
											//停止刷新
											clearInterval(t);
										}
									});
								}
								
							}, 'html');
						}

						dialogShow();
						//标记已经阅读私信
						/*$.get('/message/reading',{s_id: s, r_id: a},function(json){ 
							console.log(111);
							if(json.status ==200) {
								//改变左侧导航数量
								$.get('/user/unreadNum',function(json) {
									//var $unreadNum = $('.side_nav_q').find('li:eq(2)').find('em');
									if(json.message == 0 ){
										$unreadNum.text('');
									}else {
										$unreadNum.text('+'+json.message);
									}
								},'json');
							}
						},'json');*/

						//加载对话内容
						var t = null;

						
						//实时刷新对话内容
						//t = setInterval(dialogShow, 10000);

						self.sendMsg(s,a);
						break;
				}
			}
		}, 'json');
	},
	sendMsg: function(s,a) {
		var self = this;
		var $wrap = $(".content_right");

		//对话内容发送
		$wrap.on('click', '.send_dia_btn', function() {
			var $this = $(this);
			if($this.html() == '发送中') {
				return false;
			}
			var _content = $wrap.find('.dialog_box').val();
			var _r_id = $(this).data('id');
			$this.html('发送中');

			$.post('/message/sendMessage', {content:_content,r_id:_r_id}, function(json) {
				if(json.status ==200) {
						$.get('/message/boxList',{s:s, a:a, f:0},function(html) {
							$('#dialog_show').html(html);
							$wrap.find('.dialog_box').val('');
							$this.html('发送');
							$wrap.find('.page_dialog').find('a').removeClass('curr');
							$wrap.find('.page_dialog').find('a').eq(1).addClass('curr');
						},'html');

				}else {
						alert(json.message);
				}
			},'json')
		})
	},
	

	list_content: function() {
		var $wrap = $('.message_list');
		$wrap.on('click', '.send_reply' ,function() {
			var $this = $(this);
			var $message_reply = $wrap.find('.message_reply');
			
			if ($this.hasClass('show')) {
				$message_reply.hide();
				$this.removeClass('show');
				return;
			}

			$this.addClass('show');
			$message_reply.hide();
			
			$this.closest('.message_cardWrap').find('.message_reply').show();
			reply_name = $this.parents().prevAll('.user_name').html();
			$reply_content = $this.closest('.post_reply').siblings('.message_reply').find('.reply_content_input');

			if (false) {
			//if($reply_dialog.is(":visible")) {
				//$reply_dialog.hide();
			} else {
				//$reply_dialog.show();
				if($.trim($reply_content.html()) == '') {
					$reply_content.html("回复"+reply_name+"的评论:").css('color','#757e91').addClass('no_text');
				}else {
					$reply_content.removeClass('no_text');
				}
			}

			// 伪div文本框focus
			// 增加失去焦点为空的判断 
			var $old_reply_content = $reply_content.html();
			$reply_content.on('focus', function() {
				var $this = $(this);
				if($this.hasClass('no_text')) {
					
					$this.html("").css('color','#31343b');
					$this.removeClass('no_text');
				}
			}).on('blur', function(){
				var $this = $(this);		
				
				if ($this.html() == "") {
					$this.addClass('no_text').css('color','#757e91');		
					$this.html($old_reply_content);
				}
			});


			$.fn.pasteEvents = function(delay) {
				if (delay == undefined) delay = 10;
					return $(this).each(function() {
						var $el = $(this);
						$el.on("paste", function() {
						$el.trigger("prepaste");
						setTimeout(function() { $el.trigger("postpaste"); }, delay);
					});
				});
			};
		
			$reply_content.on('postpaste',function() {
				var str = $reply_content.html();
				str = str.replace(/<\/?[^>]*>/g,'');
				str = str.replace(/&nbsp;/ig,'');
				$reply_content.html(str);
			}).pasteEvents();
		});
	
		/*		var $wrap = $('.message_list');
		$wrap.on('click', '.list_item a', function() {
			var $this = $(this);
			var _id = $this.data('id');
			
			if(_id) {
				$.get('/index/read', {id: _id, type: "single"}, function() {}, 'json');
				$this.parent().removeClass('unread').find('.unread_prefix').removeClass('unread_prefix').text('');
			}
		});*/
		},

		sendReply: function() {
			var $wrap = $('.message_list');

			$wrap.on('click','.global_btn',function() {
				$this = $(this);
			/*	var thread_id = $this.data('threadid');
				var reply_id = $this.data('replyid');
				var reply_author = $this.data('userid'); 
				var YII_CSRF_TOKEN = $('input[name="YII_CSRF_TOKEN"]').attr('value');
				var	requestData = {
					thread_id: thread_id, 
					content: content, 
					reply_id: reply_id, 
					reply_author: reply_author,
					YII_CSRF_TOKEN: YII_CSRF_TOKEN
				};
			*/
				var _post_id = $this.data('replyid');
				var _content= $this.closest('.message_publish').find('.reply_content_input').html();
				//var YII_CSRF_TOKEN = $('input[name="YII_CSRF_TOKEN"]').attr('value');
				var requestData = {
				    t_id: $this.data('threadid'),
					post_id: _post_id,
					content: _content,
				    source_user_id: $this.data('userid'),
				    ptype: $this.data('ptype'),  //用来区分是plus还是官网的
					type: $this.data('type')
				}

				if($.trim(requestData.content) == '' || requestData.content == '回复'+$this.data('user')+'的评论:')  {
					alert('请输入内容');
					return;
				}

				if(requestData.ptype == 'video') {
					requestData.content = '<blockquote>引用@'+$this.data('user')+'：<p>'+$this.data('content')+'</p></blockquote><p>'+requestData.content+'</p>'; 

				}

				$this.prop('disabled', true).text('提交中...');
				$.post('/Message/addReply', requestData, function(json) {
					if (json.status == 200) {
						$this.attr('disabled', false);
						//F.ga('button','click','plus_reply_Total');
						/*self = $this;
						$wrap.find('.send_reply').removeClass('show');
						self.parent().find('.reply_content_input').html('');
						self.parent().parent().hide();
						alert('回复成功');*/
						// 去除回复按钮的.show 
						$this.closest('.message_cardWrap').find('.send_reply').removeClass('show');		
						$this.closest('.message_publish').find('.reply_content_input').html('');
						$this.closest('.message_reply').hide();
						location.reload();
					} else { 
						alert(json.message);
					}
					$this.prop('disabled', false).text('回复');

				},'json');
			});
		},	
});

 
	
