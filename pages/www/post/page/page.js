Z.define('post/page', {
	initialize: function() {
		this.$wrap= $('.post_wrap');
		this.$commListWrap = this.$wrap.find('.comments_list');

		//评论文本框初始化
		if($('#comment').length > 0) {
			this.editor = new UE.ui.Editor({
				initialFrameWidth: 698,
				initialFrameHeight: 98,
				minFrameHeight: 145,
				enableAutoSave: false,
				initialContent: '',
				toolbars:[["Bold", "Italic", "blockquote"]],
				wordCount:false,
				elementPathEnabled:false,
				autoHeightEnabled:true,
				enableContextMenu: false,
			});
			this.editor.render('comment');
		}

		this.bindEvt();
		this.shareEvent();
		//加载第一页的评论
		this.getComment();
		
	},

	bindEvt: function() {
		var self = this;

		// 评论框第三方登录统计
		var $noLogin = this.$wrap.find('.no_login_toReply');
		$noLogin.on('click', '.outer_login', function(e){
			var $this = $(this);
			var label = $this.attr('alt'); 	
			F.ga('官网第三方登录统计', 'click', label);	
		});
		
		// 推荐视频 hover 动画
		var $rightRecommend = self.$wrap.find('.right_recommend');
		$rightRecommend.on('mouseenter', 'li', function(){
			$(this).find('.recommend_cover').stop().animate({'opacity': 0.8});
			$(this).find('.recommend_title').stop().animate({'opacity': 1});
		});
		$rightRecommend.on('mouseleave', 'li', function(){
			$(this).find('.recommend_cover').stop().animate({'opacity': 0});
			$(this).find('.recommend_title').stop().animate({'opacity': 0});
		});

		//微信分享
		var $container = $('.wechat_mask');
		var wechatDialog = new Dialog({
			content: $container.find(".mask_wechat").show(),
		});
		var $wechatDialogWrap = wechatDialog.$wrap;
		$wechatDialogWrap.on('click', '.pop_close', function() {
			wechatDialog.hide();
		});
		$wechatDialogWrap.find('.dialog_inner').css({'width':'560px', 'height': '360px','margin-top':'-190px', 'margin-left':'-280px'})
		WechatDialog = wechatDialog;

		self.$wrap.find('.wechat').on('click', function() {
			WechatDialog.show();
		});

		//经过头像出现私信图案
		var $videoPage = self.$wrap.find('.cmtList');
		$videoPage.on('mouseenter', '.list_card', function(){
			$(this).find('.user_idcard').fadeIn();
		});
		$videoPage.on('mouseleave', '.list_card', function(){
			$(this).find('.user_idcard').fadeOut();
		});
		
		// 回复评论
		self.$commListWrap.on('click', '.reply', function() {
			var $this = $(this);

			if ($this.hasClass('unlogin')) {
				alert('请登录');
				return;
			}

			F.scrollTo($('.post_commentTotal'));
			var message = $(this).parent().parent().find('dd:first').html();
			var user = $(this).parent().parent().find('dt:first').find('.mb_name').html();
			var user_id = $(this).attr('author');
			var reply_id = $(this).attr('reply');
			$('input[name=reply_author]').val(user_id);
			$('input[name=reply_id]').val(reply_id);
			message = message.replace(/<blockquote>(.*)<\/blockquote>/, '');
			self.editor.setContent('<blockquote>引用@'+ user + '：' + message + '</blockquote><br/>');
			self.editor.focus(true);
		});
		
		// 评论点赞
		self.$commListWrap.on('click', '.appro', function() {
			var $this = $(this);

			if ($this.hasClass('unlogin')) {
				alert('请登录');
				return;
			}

			var total = $this.find('span:eq(1)').html();
			if(total) {
				var reg = /\((.*?)\)/;
				total = total.replace(reg, '$1');
			} else {
				total = 0;
			}
			
			var id = $this.attr('reply');
			var action = 'Increase';
			if ($this.hasClass('liked')) {
				action = 'Decrease';
			}
			if (action == 'Increase') {
				$this.addClass('liked');
				$this.find('span:eq(0)').html('已赞').addClass('info_appro_active');
				$this.find('span:eq(1)').html('('+(parseInt(total)+1)+')').addClass('info_appro_active');
			} else {
				$this.removeClass('liked');
				$this.find('span:eq(0)').html('点赞').removeClass('info_appro_active');
				total = total - 1 == 0 ? 0 : total - 1;
				if( total == 0 ){
					$this.find('span:eq(1)').html('').removeClass('info_appro_active');
				}else {
					$this.find('span:eq(1)').html('('+total+')').removeClass('info_appro_active');
				}
			}
			$.getJSON('/comment/like', {id: id, action: action}, function(json) {});
		});

		// 删除评论
		self.$commListWrap.on('click', '.post_commDel', function() {
			var $this = $(this);
			var id = $this.data('id');

			if ($this.hasClass('acting')) {
				return false;
			} else {
				if (confirm('确定要删除吗？')) {
					$this.addClass('acting');
					$.getJSON('/mediaDetail/clear', {id: id}, function(json) {
						if (json.status == 200) {
							$('#c_' + id).remove();
						} else {
							alert(json.message);
						}
					})
				}
			}
		});

		// 禁言评论
		self.$commListWrap.on('click', '.post_commProhibit', function() {
			var $this = $(this);
			var id = $this.data('id');
			var uid = $this.data('uid');

			if ($this.hasClass('acting')) {
				return false;
			} else {
				if (confirm('确定要把该账号禁言吗？')) {
					$this.addClass('acting');
					$.getJSON('/mediaDetail/prohibit', {id: id, uid: uid}, function(json) {
						if (json.status == 200) {
							$('#c_' + id).remove();
						} else {
							alert(json.message);
						}
					})
				}
			}
		});

		// 删除禁言评论
		self.$commListWrap.on('click', '.post_commDelProhibit', function() {
			var $this = $(this);
			var id = $this.data('id');
			var uid = $this.data('uid');

			if ($this.hasClass('acting')) {
				return false;
			} else {
				if (confirm('确定要把该账号禁言，并删除发表的所有评论吗？')) {
					$this.addClass('acting');
					$.getJSON('/mediaDetail/prohibit', {id: id, uid: uid, flag: 'Y'}, function(json) {
						if (json.status == 200) {
							$('.c_' + uid).remove();
						} else {
							alert(json.message);
						}
					})
				}
			}
		});

		//评论框提交
		self.$wrap.find('.comment_btn').on('click', function() {
			var $this = $(this);
			if ($this.val() == '发布中...') { return false; }
			var patrn = /说点什么吧…/;
			var message = self.editor.getContent();
			var $comment = $('#comments');
			var post_id = self.$wrap.find('.title_top').data('id');
			var reply_id = $('input[name=reply_id]').val();  //回复的楼的id
			var getUrl ='/Post/comment?id=' + post_id; 
			var reply_author = $('input[name=reply_author]').val();  //被通知回复的人，不是当前登录用户
			var user_type = reply_author == '0' ? 'landlord' : 'replyer';
			var type = 'reply';
			var YII_CSRF_TOKEN = $('input[name=YII_CSRF_TOKEN]').val();
			if (message.length == 0 || patrn.test(message)) {
				alert('请填写内容');
			} else {
				$this.val('发布中...');
				$.post('/comment/post', {post_id: post_id, source_id: reply_id, source_user_id: reply_author, message: message, YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json) {
					if (json.status == 200) {
						$.get(getUrl,{page: 1},function(data) {
							$comment.find('.comments_list ul').html(data.content);
							var $comNum = self.$wrap.find('.side_left p span');
							var com_num = parseInt($comNum.html());
							com_num++;
							$comNum.html(com_num);
							//用户名片、私信
							//userCardInit();
						}, 'json');
						self.editor.setContent('');

						StatAct('pc', 'www', '2.0', json.message.uid, 'video_post');
					} else {
						alert(json.message);
						if (json.status == 301) {
							//Navigate(this, 'c');
						}
					}
					$this.val('发布评论');
				}, 'json')
			}
		});
	},

	getComment: function() {
		var self = this;
		var obj = null;
		var url = F.parseURL();	
		var currPage = url.params.page;
		var $wrap = this.$wrap.find('#main');
		var post_id = $wrap.find('.title_top').data('id');
		var $comment = $('#comments');
		var getUrl ='/Post/comment?id=' + post_id; 
		var $comment_num = $wrap.find('#comment_num');


		// 打开就load评论，考虑到屏幕高度过高会造成空白所以没用lazyload
		// F.lazyload($comment, function($ele) {
		F.loading($comment, 'white');
		$.get(getUrl,{page: 1},function(data) {
			//获取数据条数
			$comment.find('.comments_list ul').html(data.content);
			$comment.css({'height':''});
			//用户名片、私信
			//userCardInit();
			var eachNum = 20;//每页显示几条评论
			var total = data.count;
			var page = new Page({
				wrap: self.$wrap.find('.page_cmtList'),
				url: getUrl,
				data: {id: post_id},
				type: 'json',
				totalPage: Math.ceil(total/eachNum), 
				callback: function(data, page) {
					F.unloading($comment.height('auto'));
					$comment.find('.comments_list ul').html(data.content);
					F.scrollTo($('.post_commentTotal'));
				}
			});
		},'json');
	},

	shareEvent: function() {
		this.$wrap= $('.wrap');
		var self = this;
		var $container = $('#main');
		var $videoHead = $container.find('.video_title');
		var $title = $videoHead.find('h3');
		var $wb_share = $('.post_answer');

		//网页title
		var title = 'ZEALER「'+$title.text()+'」';

		//微博按钮
		var $wb_shareBtn = $videoHead.find('.title_share .weibo');

		//空间按钮
		var $qz_shareBtn = $videoHead.find('.title_share .qzone');

		//分享文字
		var wb_title = title+'（分享自 @ZEALER中国）';

		//分享图片
		var pic = self.$wrap.find('.player_list a img').attr('src') ? self.$wrap.find('.player_list a img').attr('src') : '';
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
		var $playerWrap = $('.player_screen');
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
