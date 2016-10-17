
// 系统性能 
Z.define('data/system', {
	initialize: function() {
		var self = this;
		self.mobile_id = window.mobile_id;
		self.data = {};

		self.$container = $('.J_system_tools_wrap');
		self.$head = $('.post_system_head');

		$.post('/data/systemCompare', {current_id: self.mobile_id, compare_id: 2}, function(json) {
			if(json.status == 200) {
				self.data = json.message;
				self.$container.data('done', true);
				if(self.$head.hasClass('active')) {
					self.$head.trigger('click');
				}
			} else {
				alert(json.message);
			}
		}, 'json')

		this.$container.on('init', function() {
			self.bindEvent();
			self.init();
			$(this).off('init');
		});

	},

	init: function(data) {
		var self = this;

		// 触发默认tab点击事件 软件运行－平均启动时间
		self.$container.find('.software_start').trigger('click');
	},

	bindEvent: function() {
		var self = this;
		var $toolsHead = $(".tools .post_system_head");
		var $headTabs = $toolsHead.find('.head_tabs');
		var $leftTab = self.$container.find('.left_tabs');

		// head tab 切换 
		$headTabs.on('click', 'li', function() {
			var $this = $(this);
			var $currHead = $this.parent().parent();
			var $currTabs = $currHead.find('.head_tabs');
			var $currTool = $currHead.next('.tools_wrap');
			var $currWrap = $currTool.find('.wrap_tab_' + $this.data('tab'));

			if($this.hasClass('active')) {
				return;
			}
			$currTabs.find('li.active').removeClass('active');
			$this.addClass('active');
			$currTool.find('.wrap_tab.active').removeClass('active');
			$currWrap.addClass('active');

			// 触发动画
			if ($currWrap.find('.left_tabs > li.active').length > 0 ) {
				$currWrap.find('.left_tabs > li.active').trigger('click');
			} else {
				$currWrap.find('.left_tabs > li').eq(0).trigger('click');
			}
		});

		// 侧边栏tab切换
		$leftTab.on('click', 'li', function() {
			var $this = $(this);
			var type = $this.data('type');
			var $currWrap = $this.closest('.wrap_tab');
			var $rightWrap = $currWrap.find('.sysTab_' + type);

			$this.parent().find('li').removeClass('active');
			$this.addClass('active');
			$currWrap.find('.sysTab_right.active').removeClass('active');
			$rightWrap.addClass('active');
			
			// 初始化动画
			self.animateInit(type);
		});
	},

	animateInit: function(type) {
		var self = this;

		switch(type) {
			case 'soft_start':
				self.softStarAnimate();
				break;
			case 'geekbench':
			case 'gfxbench':
			case 'sdbench':
				self.scoreAnimate(type);
				break;
			case 'game_start':
			case 'game_performance':
				self.gameAnimate(type);
				break;
		}
	},

	// 软件平均启动时间动画
	softStarAnimate: function() {
		var $currWrap = $('.system_software_wrap');
		var $imgWrap = $currWrap.find('.system_imgWrap');

		// 重置动画初始状态
		$imgWrap.show();
		$('.soft_content').hide();
		$currWrap.find('.system_ripple').removeClass('show');
		$currWrap.find('.system_tap').css({left: 135, top: 370});

		$currWrap.find('.system_tap').stop().animate({
			top: '-=156px',
			left: '-=81px'
		}, 900, function() {
			var $currRipple = $currWrap.find('.current_ripple');
			var $comRipple = $currWrap.find('.compare_ripple');

			$currRipple.removeClass('show').addClass('show');
			$comRipple.removeClass('show').addClass('show');
			setTimeout(function() {
				$imgWrap.fadeOut(50, function() {
					$('.curr_softContent').fadeIn(500);
					$('.comp_softContent').fadeIn(2500);
				});
			}, 600)
		});
	},

	// 游戏动画 
	gameAnimate: function(type) {
		var self = this;
		var $currWrap = $('.sysTab_' + type);
		var $curr = $currWrap.find('.current_animateWrap');
		var $comp = $currWrap.find('.compare_animateWrap');
		var $currSuperman = $curr.find('.game_superman');
		var $compSuperman = $comp.find('.game_superman');

		// 重置动画初始状态
		if (type === 'game_start') {
			$currSuperman.css({top: -156, left: -47});
			$curr.find('.game_result').hide();
			$curr.find('.system_imgWrap').removeClass('tool_blur');
			$curr.removeClass('tool_blur');
			$currSuperman.stop().animate({
				left: '+=158px'
			}, 900, function() {
				$curr.find('.system_imgWrap').addClass('tool_blur');
				$curr.find('.game_result').fadeIn(1000);
			});

			$compSuperman.css({top: -156, left: -47});
			$comp.find('.game_result').hide();
			$comp.find('.system_imgWrap').removeClass('tool_blur');
			$comp.removeClass('tool_blur');
			$comp.removeClass('tool_blur');
			$compSuperman.stop().animate({
				left: '+=158px'
			}, 1900, function() {
				$comp.find('.system_imgWrap').addClass('tool_blur');
				$comp.find('.game_result').fadeIn(1000);

			});
		} else {
			$currSuperman.css({top: -156, left: 111});
			$curr.find('.game_result').hide();
			$curr.find('.system_imgWrap').removeClass('tool_blur');
			$curr.removeClass('tool_blur');
			$currSuperman.stop().animate({
				top: '-555px'
			}, { 
				duration: 900,
				easing: 'swing',
				complete: function() {
					$curr.find('.system_imgWrap').addClass('tool_blur');
					$curr.find('.game_result').fadeIn(1000);
				}
			});

			$compSuperman.css({top: -156, left: 111});
			$comp.find('.game_result').hide();
			$comp.find('.system_imgWrap').removeClass('tool_blur');
			$comp.removeClass('tool_blur');
			$comp.removeClass('tool_blur');
			$compSuperman.stop().animate({
				top: '-555px'
			}, {
				duration: 1900,
				easing: 'swing',
				complete: function() {
					$comp.find('.system_imgWrap').addClass('tool_blur');
					$comp.find('.game_result').fadeIn(1000);
				}
			});
		};
	},

	// 跑分成绩动画
	scoreAnimate: function(type) {
		var self = this;
		var $currWrap = $('.sysTab_' + type);
		var $imgWrap = $currWrap.find('.system_imgWrap');
		var $result = $currWrap.find('.score_result');

		// 重置动画初始状态
		$imgWrap.show();
		$result.hide();
		$currWrap.find('.system_ripple').removeClass('show');

		var $currRipple = $currWrap.find('.current_ripple');
		var $comRipple = $currWrap.find('.compare_ripple');

		setTimeout(function() {
			$currRipple.removeClass('show').addClass('show');
			$comRipple.removeClass('show').addClass('show');
			$imgWrap.fadeOut(1050, function() {
				self.setScoreData(type);
				$result.show();
			});
		}, 200)
	},

	setScoreData: function(type) {
		var self = this;
	    var $currWrap = $('.sysTab_' + type);

		var $currResult = $currWrap.find('.current_result');
		var $compResult = $currWrap.find('.compare_result');

		if(type === 'geekbench') {
			$currResult.find('.single_core').text(self.data.current.geekbench_single_core + ' pts');
			$currResult.find('.dual_core').text(self.data.current.geekbench_dual_core + ' pts');
			$compResult.find('.single_core').text(self.data.compare.geekbench_single_core + ' pts');
			$compResult.find('.dual_core').text(self.data.compare.geekbench_dual_core + ' pts');
		} else if(type === 'gfxbench') {
			$currResult.find('.manhattan_core').text(self.data.current.gfxbench_manhattan + ' frams');
			$currResult.find('.manhattan_offscreen_core').text(self.data.current.gfxbench_manhattan_offscreen + ' frams');
			$currResult.find('.dragon_core').text(self.data.current.gfxbench_dragon + ' frams');
			$currResult.find('.dragon_offscreen_core').text(self.data.current.gfxbench_dragon_offscreen + ' frams');

			$compResult.find('.manhattan_core').text(self.data.current.gfxbench_manhattan + ' frams');
			$compResult.find('.manhattan_offscreen_core').text(self.data.current.gfxbench_manhattan_offscreen + ' frams');
			$compResult.find('.dragon_core').text(self.data.current.gfxbench_dragon + ' frams');
			$compResult.find('.dragon_offscreen_core').text(self.data.current.gfxbench_dragon_offscreen + ' frams');

		} else if(type === 'sdbench') {
			$currResult.find('.read_core').text(self.data.current.sdbench_read + ' MB/s');
			$currResult.find('.write_core').text(self.data.current.sdbench_write + ' MB/s');
			$currResult.find('.ram_core').text(self.data.current.sdbench_ram + ' MB/s');

			$compResult.find('.read_core').text(self.data.current.sdbench_read + ' MB/s');
			$compResult.find('.write_core').text(self.data.current.sdbench_write + ' MB/s');
			$compResult.find('.ram_core').text(self.data.current.sdbench_ram + ' MB/s');

		} else {
			$currResult.text(self.data.current[dataType]);
			$compResult.text(self.data.compare[dataType]);
		}
	},

	setCompareData: function(mobile_id) {
		var self = this;

		$.post('/data/systemShow', {id: mobile_id}, function(json) {
			if(json.status == 200) {
				self.data.compare = json.message;
			} else {
				alert(json.message);
			}
		}, 'json')
	}
});
