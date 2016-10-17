Z.define('media/page', {
	initialize: function() {
		this.$wrap= $('.wrap');
		this.bindEvent();
	},
	bindEvent: function(){ 
		var self = this;

		//导航用户状态
		var $innerUser = self.$wrap.find('.inner_account');
		var $accountUser = $innerUser.find('.account_user');
		var $userImg = $accountUser.find('.user_img');
		
		//二级导航切换
		var $mediaContent = self.$wrap.find('.media_content');

		//点击热门标签切换内容或点击加载更多来加载内容
		//$container是包围视频列表的元素，isindex为'y‘时表示为视频页首页
		var getTag = function(cid, tid, count, page, type, $container, isindex){
			var url = '/media/videoList';
			//避免重复请求而没数据返回
			var odata = new Date();
			var clear = odata.getSeconds();
			$.get(url, {cid: cid, tid: tid, count: count, page: page, isindex: isindex, clear: clear}, function(data){
				if( $.trim(data) != '' ){

					$wrapGoText.html('加载更多');
					//type为change为替换内容
					if( type == 'change' ){
						$container.html(data);
					//type为plus时为追加内容
					}else if( type == 'plus' ){
						var ohtml = $container.html();
						$container.html(ohtml + data);
						nowPage++;
					}
				}else {
					if( type == 'change' ){
						$container.html('');
					}
				}
				checkVideo();
			}, 'html');
		};

		//视频页首页分类标签切换视频
		var $wrapGo = $mediaContent.find('.wrap_go');
		var $wrapGoText = $wrapGo.find('a'); 
		var $categoryVideo = self.$wrap.find('.content_common');	
		var $handVideo = self.$wrap.find('.hand_video');

		var checkVideo = function(){
			var $videoList = $handVideo.find('li');
			var videoNum = parseInt($videoList.attr('totalnum'));
			if( $videoList.length == videoNum || $videoList.length == 0 ){
				$wrapGo.hide();
			}else {
				$wrapGo.show();
			}
		};
		checkVideo();
		
		
		$.each($categoryVideo, function(index, ele){
			var $btnTags = $(ele).find('.btn_tags');
			$btnTags.on('click', 'a', function(){
				$(this).siblings('a').removeClass('btn_active');
				$(this).addClass('btn_active');
				var cid = $(this).attr('cid');
				var tid = $(this).attr('tid');	
				var count = 20;
				var page = 1;
				var type = 'change';
				var $container = $(this).closest('.common_btn').siblings('.common_list'); 
				var isindex = 'y';
				getTag(cid, tid, count, page, type, $container, isindex);
			});
		});

		//各个分类页面点击标签切换内容
		var count = 3;	
		var nowPage = 2;
		var $mediaContent = self.$wrap.find('.media_content');
		var $handBtn = $mediaContent.find('.hand_btn'); 
		
		$handBtn.on('click', 'a', function(){
			var tid = F.parseURL().params.tid;
			var cid = F.parseURL().params.cid;
			if(tid){
				self.$wrap.find('.media_content .hand_title').html('全部');
			}
			console.log(tid);
			nowPage = 2;
			$(this).siblings('a').removeClass('btn_active');
			$(this).addClass('btn_active');
			var cid = $(this).attr('cid');
			var tid = $(this).attr('tid');	
			var page = 1;
			var type = 'change';
			var $container = $handBtn.siblings('.hand_video'); 
			getTag(cid, tid, count, page, type, $container);
		});

		//点击加载更多
		//var $addMore = $wrapGo.find('a');
		$wrapGo.on('click', 'a', function(){
			var cid = $handBtn.find('.btn_active').attr('cid');
			var tid = $handBtn.find('.btn_active').attr('tid');
			var type = 'plus';
			var $container = $mediaContent.find('.hand_video'); 
			$wrapGoText.html('加载中');
			getTag(cid, tid, count, nowPage, type, $container);
		});
	}
})
