/*
* @Title
* @Author	echoChan
* @Date 	Wed 08 Jun 2016 06:32:24 PM CST
*/

Z.define('search/page', {
	initialize: function() {
		this.$wrap = $('.search_wrap');
		var params = F.parseURL().params;
		var type = params.type || 'video';
		var keyword = params.keyword || '';

		this.bindEvent();
		this.loadData(type, keyword);

	},

	loadData: function(type, keyword, $btn) {
		var self = this;
		var $resultWrap = $('.search_result');
		var $tab = $('.result_tabs');

		if(keyword == '') return;
		$btn && $btn.prop('disabled', true);
		F.loading($resultWrap, 'white');
		$tab.hide();
		self.$wrap.find('.result_contentItem').hide();
		$.post('/search/search', {type: type, keyword: keyword}, function(json) {
			if(json.status == 200) {
				var html = json.message.html;
				self.$wrap.find('.result_contentItem').hide();
				if(html == '') {
					$tab.show();
					self.$wrap.find('.result_empty').show();
				} else {
					var num = json.message.num;
					$tab.find('.tabs_videoAmount').text('(' + num.video + ')');
					$tab.find('.tabs_postAmount').text('(' + num.post + ')');
					$tab.find('.tabs_askAmount').text('(' + num.ask + ')');
					$tab.find('.tabs_userAmount').text('(' + num.user + ')');
					$tab.find('li').removeClass('active');
					$tab.find('.tabs_' + type).addClass('active');
					$tab.show();
					self.$wrap.find('.result_' + type).html(html).show();

					var page = new Page({
						wrap: self.$wrap.find('.page_resultList'),
						url: '/search/search',
						data: {type: type, keyword: keyword},
						type: 'json',
						totalPage: Math.ceil(json.message.total_number/20),
						callback: function(data, page) {
							F.loading($resultWrap, 'white');
							F.unloading($resultWrap.height('auto'));
							self.$wrap.find('.result_' + type).html(data.message.html).show();
							F.scrollTo(0);
						}
					});
				}
			} else {
				alert(json.message);
			}
			F.unloading($resultWrap.height('auto'));
			$btn && $btn.prop('disabled', false);
		}, 'json');

	},

	bindEvent: function() {
		var self = this;

		// 搜索类型选择
		var $typeBtn = $('.input_type');
		var $typeSelect = $('.input_select');
		var $input = $('.input_content');
		var $searchBtn = $('.input_btn');
		var $tab = $('.result_tabs');

		$typeBtn.click(function() {
			$typeSelect.toggle();
		});

		$tab.on('click', 'li', function(){
			var $this = $(this);
			if($this.hasClass('active')) return;
			var type = $this.data('type');
			var keyword = $input.val();
			window.location.href = '/search/index?type=' + type + '&keyword=' + keyword;
		});

		$typeSelect.on('click', 'li', function() {
			var $this = $(this);
			var type = $this.data('type');
			var text = $this.text();
			$typeBtn.data('type', type).text(text);
			$typeSelect.hide();
		});

		// 搜索按钮
		$input.keydown(function(e) {
			var $this = $(this);
			if(e.which == 13 && $this.val()) {
				$searchBtn.click();
			}
		});

		$searchBtn.click(function() {
			var $this = $(this);
			var type = $typeBtn.data('type');
			var keyword = $input.val();
			window.history.pushState({type: type, keyword: keyword}, 'history search', '/search/index?type='+ type +'&keyword=' + keyword);
			self.loadData(type, keyword, $this);
		})
	}
});
