//参数
Z.define('data/configure', {
	initialize: function() {
		var self = this;
		self.select = Z.require('data/tools').select;
		self.$container = $('.post_configure_wrap');
		self.$head = $('.post_configure_head');
		self.data = {};
		self.otherMobile = window.compMobileName;
		self.compId = window.compMobileId;

		self.bindEvent();

		self.showMore(self.compId);

		self.$container.on('init', function() {
		});
	},
	bindEvent: function(){
		var self = this;
		
		var $wrapCompare = self.$container.find('.wrap_compare');
		var $wrapInfo = self.$container.find('.wrap_info');
		var $infoMore = $wrapInfo.find('.info_more');
		var $compareTwo = self.$container.find('.compare_two');
		var $otherShow = $wrapCompare.find('.compare_configure');

		//有$compareTwo.offset().top可得$compareTwo距离文档顶部距离为833px，($compareTwo.parent().top是随scroll变化而变化)
		var _top = 833;

		$(window).scroll(function(){
			if( $(document).scrollTop() > _top - 60 ){
				$otherShow.css('margin-top', '104px');
				$compareTwo.addClass('compare_stay');
			} else {
				$otherShow.css('margin-top', 0);
				$compareTwo.removeClass('compare_stay');
			}
		});

		$infoMore.on('click', function(){ 
			var $this = $(this)

			//$compareTwo.removeClass('compare_stay');
			/*$wrapCompare.stop().slideToggle(600, function() {
				// 关掉其他工具抽屉
				if($wrapCompare.is(':visible')) {
					$('.tools_wrap').not('.post_configure_wrap').each(function(index, item) {
						var $item = $(item);
						if($item.is(':visible')) {
							$item.parent().find('.head_icon, .head_right_icon').removeClass('active');
							$item.parent().find('.head_tabs').hide();
							$item.hide();
						}
					});
					$this.addClass('active');
					$compareUp.find('.tool_icons').addClass('arrow_up');
					F.ga('button', 'click', 'details_open');
				} else {
					$compareUp.find('.tool_icons').removeClass('arrow_up');
					$this.removeClass('active');
					F.ga('button', 'click', 'details_close');
				}
			});*/
		});
	},

	showMore: function(comId){
		var self = this;
		var $wrapCompare = self.$container.find('.wrap_compare');
		var $otherShow = $wrapCompare.find('.compare_configure');
		
		if( !self.data[self.otherMobile] ){
			$.get('/data/configure', {id: window.mobile_id, cid: comId}, function(json){ 
				if( json.status == 200 ){
					$otherShow.html(json.message.html);
					self.$container.data('done', true);
					self.$head.find('.head_loading').hide();
					self.data[self.otherMobile] = json.message.html;

					//隐藏\显示相同项
					var $compareShow = self.$container.find('.compare_show');
					var $hideSame = self.$container.find('.compare_two .hide_same');
					//nowHide用来判断显示还是隐藏
					var nowHide = 0;
					$hideSame.on('click', function(){
						var $dls = $compareShow.find('dl');

						if( !nowHide ){
							$(this).text('显示相同参数');
							$.each($dls, function(index, item){
								var sameNum = 0;
								var $dds = $(item).find('dd');
								$.each($dds, function(index_1, item_1){
									var $desLeft = $(item_1).find('.des_left');
									var $desRight = $(item_1).find('.des_right');
									if( $desLeft.html() == $desRight.html() ){
										sameNum++;
										$(item_1).addClass('dl_hide');
									}
								});
								//判断相同的数目是否和dd的数目一致，一致则整个dl隐藏
								if( sameNum == $dds.length ){
									$(item).addClass('dl_hide');
								}
							});
							nowHide = 1;
						} else {
							$(this).text('隐藏相同参数');
							$compareShow.find('.dl_hide').removeClass('dl_hide');
							nowHide = 0;
						}
					});

					var $dds = $compareShow.find('dd');
					$dds.on('mouseenter', function(){
						$(this).addClass('dd_active');
					});
					$dds.on('mouseleave', function(){
						$(this).removeClass('dd_active');
					});
				}
			}, 'json');
		} else {
			$otherShow.html(self.data[self.otherMobile]);
		}
	}
});
