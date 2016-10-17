
// 续航
Z.define('data/battery', {
	initialize: function() {
		var self = this;
		//requestAnimationFrame的兼容处理
		(function() {
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
											  window[vendors[x] + 'CancelRequestAnimationFrame'];
			}

			if (!window.requestAnimationFrame) {
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
					var id = window.setTimeout(function() {
						callback(currTime + timeToCall);
					}, timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			}
			if (!window.cancelAnimationFrame) {
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
			}
		}());

		this.select = Z.require('data/tools').select;

		this.currentMobile = window.mobile_name;
		this.currMobileId = window.mobile_id;
		this.currMobileColorId = window.mobile_colorid;
		this.compMobileId = window.compMobileId;
		this.compMobileColorid = window.compColorId;

		//5、8小时续航的左右两边的定时器
		this.timerLeft = null;
		this.timerRight = null;
		
		// 充电动画时长配置
		this.CHARGETIME = 8;

		this.$wrap = $('.battery_tools_wrap');
		this.$head = $('.post_battery_head');
		this.$fiveWrap = this.$wrap.find('.battery_5h_wrap'); // 5小时续航wrap
		this.$eightWrap = this.$wrap.find('.battery_8h_wrap'); // 8小时待机wrap
		this.$chargeWrap = this.$wrap.find('.battery_charge_wrap'); // 充电wrap

		this.radius = 110;
		
		// 时钟canvas
		this.$curr5hCanvas = document.getElementById('curr_5hClock').getContext("2d");;
		this.$curr5hCanvas.translate(55, 55);
		this.$comp5hCanvas = document.getElementById('comp_5hClock').getContext("2d");;
		this.$comp5hCanvas.translate(55, 55);

		this.$curr8hCanvas = document.getElementById('curr_8hClock').getContext("2d");;
		this.$curr8hCanvas.translate(55, 55);
		this.$comp8hCanvas = document.getElementById('comp_8hClock').getContext("2d");;
		this.$comp8hCanvas.translate(55, 55);

		this.$currCharCanvas = document.getElementById('curr_chargeClock').getContext("2d");;
		this.$currCharCanvas.translate(55, 55);
		this.$compCharCanvas = document.getElementById('comp_chageClock').getContext("2d");;
		this.$compCharCanvas.translate(55, 55);

		$.post('/data/batteryBothShow', {currid: self.currMobileId, compid: self.compMobileId}, function(json) {
			if(json.status == 200) {
				self.currData = json.message.current;
				self.compData = json.message.compare;

				self.curr5h= self.format5hData(self.currData.five);
				self.comp5h= self.format5hData(self.compData.five);

				self.curr5hLeft = self.currData.five[10].values;
				self.comp5hLeft = self.compData.five[10].values;

				self.curr8hLeft = self.str2percent(self.currData.left8h);
				self.comp8hLeft = self.str2percent(self.compData.left8h);
				
				self.currChargTime = parseInt(self.currData.chargeTime);
				self.$chargeWrap.find('.curr_life').text(self.str2h(self.currData.chargeTime));
				self.compChargTime = parseInt(self.compData.chargeTime);
				self.$chargeWrap.find('.comp_life').text(self.str2h(self.compData.chargeTime));

				self.$wrap.data('done', true);
				self.$head.find('.head_loading').hide();
				if(self.$head.hasClass('active')) {
					self.$head.trigger('click');
				}
			}
		}, 'json');

		this.mobileSelect();

		this.$wrap.on('ga', function(){
			F.ga('button', 'click', 'battery');
		});

		this.$wrap.on('init', function() {
			self.init(self.data);
			$(this).off('init');
		});
	},
	
	// 将hh:mm转变成毫秒数
	str2sec: function(str) {
		var arr = str.split(':');
		return 1000*(parseInt(arr[0])*60*60 + parseInt(arr[1]*60));
	},

	// 将mm转变成h
	str2h: function(str) {
		return Math.floor(str/60) + ':' + (str%60 < 10 ? ('0' + str%60) : str%60);
	},

	// 将23.4%转变成0.234
	str2percent: function(str) {
		var arr = str.split('%');
		return parseFloat(arr[0])/100;
	},

	format5hData: function(arr) {
		var scalStr = [];
		$.each(arr, function(index, item) {
			if(index > 0) {
				scalStr.push(item.name + '<dd class="five_percent"> ' + (arr[index - 1].values * 1000 - item.values * 1000)/10  + '%</dd>');
			}
		});
		return scalStr;
	},

	getData: function(mobileid, callback) {
		$.post('/data/batteryShow', {mobileid: mobileid}, function(json) {
			if(json.status == 200) {
				callback && callback(json.message);
			}
		}, 'json');
	},

	init: function(data) {
		var self = this;
		var chartMaxWidth = 660; //表格最长宽度
		var scale = Z.require('data/tools_show').scale;

		// 设置刻度
		self.scale1 = new scale({
			dom: self.$wrap.find('.battery_5h_wrap .current_scale').css('height', 500),
			vertical: true,
			height: 500,
			num: 10
		});
		
		self.scale1.setData(self.curr5h);

		self.scale2 = new scale({
			dom: self.$wrap.find('.battery_5h_wrap .compare_scale').css('height', 500),
			vertical: true,
			height: 500,
			num: 10
		});
		self.scale2.setData(self.comp5h);

		self.scale3 = new scale({
			dom: self.$wrap.find('.battery_8h_wrap .current_scale').css('height', 500),
			vertical: true,
			height: 500,
			num: 8
		});
		self.scale3.setData(['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h']);

		self.scale4 = new scale({
			dom: self.$wrap.find('.battery_8h_wrap .compare_scale').css('height', 500),
			vertical: true,
			height: 500,
			num: 8
		});
		self.scale4.setData(['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h']);

		self.scale5 = new scale({
			dom: self.$wrap.find('.battery_charge_wrap .current_scale').css('height', 500),
			vertical: true,
			height: 500,
			num: 12
		});
		//self.scale5.setData(['5:00', '', '4:00', '', '3:00', '', '2:00', '', '1:00', '', '0:00']);
		self.scale5.setData(['6:00', '', '5:00', '', '4:00', '', '3:00', '', '2:00', '', '1:00', '', '0:00']);

		self.scale6 = new scale({
			dom: self.$wrap.find('.battery_charge_wrap .compare_scale').css('height', 500),
			vertical: true,
			height: 500,
			num: 12
		});
		//self.scale6.setData(['5:00', '', '4:00', '', '3:00', '', '2:00', '', '1:00', '', '0:00']);
		self.scale6.setData(['6:00', '', '5:00', '', '4:00', '', '3:00', '', '2:00', '', '1:00', '', '0:00']);


		// 初始化环形进度条
		self.config = function(time) { 
			var config =  {
				color: '#fff',
				strokeWidth: 5,
				trailWidth: 1,
				duration: time, text: {
					value: '0'
				},
				step: function(state, circle) {
					circle.setText((circle.value() * 100).toFixed(0) + ' %');
				}
			}
			return config;
		}

		// 5小时续航
		//self.fiveCurrCircle = new ProgressBar.Circle('#battery_five_current_circle', self.config(1000));
		//self.fiveCompareCircle = new ProgressBar.Circle('#battery_five_compare_circle', self.config(1000));

		// 8h待机圆环
		//self.eightCurrCircle = new ProgressBar.Circle('#battery_eight_current_circle', self.config(500));
		//self.eightCompareCircle = new ProgressBar.Circle('#battery_eight_compare_circle', self.config(500));

		// 充电圆环
		//self.chargeCurrCircle = new ProgressBar.Circle('#battery_charge_current_circle', self.config(self.currChargTime * self.CHARGETIME));
		//self.chargeCompareCircle = new ProgressBar.Circle('#battery_charge_compare_circle', self.config(self.compChargTime * self.CHARGETIME));

		//与刻度联动

		this.bindEvent();
		$('.battery_5h').trigger('click');
	},
	/*
	 * 选择按钮
	 */
	bindEvent: function() {
		var self = this;
		var $toolsHead = $(".tools .post_battery_head");
		var $headTabs = $toolsHead.find('.head_tabs');

		$headTabs.on('click', 'li', function(e) {
			e.stopPropagation();
			var $this = $(this);
			var $currHead = $this.parent().parent();
			var $currTabs = $currHead.find('.head_tabs');
			var $currWrap = $currHead.next('.tools_wrap');

			/*if($this.hasClass('active')) {
				return;
			}*/
			$currTabs.find('li.active').removeClass('active');
			$this.addClass('active');
			$('.battery_tools_wrap').find('.wrap_tab.active').removeClass('active');
			$('.battery_tools_wrap').find('.wrap_tab_' + $this.data('tab')).addClass('active');

			if($this.hasClass('battery_5h')) {
				self.render5h(self.curr5hLeft, self.comp5hLeft);
				F.ga('button', 'click', 'battery_5h');

			} else if($this.hasClass('battery_8h')) {
				self.render8h(self.curr8hLeft, self.comp8hLeft);
				F.ga('button', 'click', 'battery_8h');

			} else if($this.hasClass('battery_charge')) {
				self.renderCharge(self.currChargTime, self.compChargTime);
				F.ga('button', 'click', 'battery_charging');
			}
		});

		var $inchTip =  self.$fiveWrap.find('.batt_tip');
		var $inchTipCont = self.$fiveWrap.find('.batt_tip_content');
		$inchTip.on('mouseenter', function(){
			$inchTipCont.fadeIn(300);
			$inchTip.on('mouseleave', function(){
				$inchTipCont.fadeOut(300);
			});
		});
	},

	mobileSelect: function(){
		var self = this;

		// 5小时续航对比机型列表
		self.fiveSelector = new self.select({
			dom: self.$wrap.find('.tool_compare5h'),
			defaultkey: '选择对比机型',
			onClick: function(e, dom) {
				var mobileid = $(dom).data('id');
				self.getData(mobileid, function(data) {
					comp5hLeft = data.left5h;
					self.render5h(self.curr5hLeft, comp5hLeft);
				});
			}
		});

		// 8小时待机比机型列表
		self.eightSelector = new self.select({
			dom: self.$wrap.find('.tool_compare8h'),
			defaultkey: '选择对比机型',
			onClick: function(e, dom) {
				var mobileid = $(dom).data('id');
				self.getData(mobileid, function(data) {
					var comp8hLeft = self.str2percent(data.left8h);
					self.render8h(self.curr8hLeft, comp8hLeft);
				});
			}
		});

		// 充电比机型列表
		self.chargeSelector = new self.select({
			dom: self.$wrap.find('.tool_compareCharge'),
			defaultkey: '选择对比机型',
			onClick: function(e, dom) {
				var mobileid = $(dom).data('id');
				self.getData(mobileid, function(data) {
					var compChargTime = parseInt(self.compData.chargeTime);
					self.$chargeWrap.find('.comp_life').text(self.str2h(self.compData.chargeTime));
					self.chargeCompareCircle.destroy();
					self.chargeCompareCircle = new ProgressBar.Circle('#battery_charge_compare_circle', self.config(compChargTime * self.CHARGETIME));
					self.renderCharge(self.currChargTime * self.CHARGETIME, compChargTime * self.CHARGETIME);
				});
			}
		});
	},

	render5h: function(curr5hLeft, comp5hLeft) {
		var self = this;
		var time = 3000;
		var $currBattWrap = self.$fiveWrap.find('.current_data .batt_leftWrap')
		var $compareBattWrap = self.$fiveWrap.find('.compare_data .batt_leftWrap')

		self.drawNew(this.$curr5hCanvas, this.$comp5hCanvas, 300, 300, time);

		//self.drawTimer(self.$curr5hCanvas, 5, 9, 'left');
		$('.batt_resultLeft').html('');
		self.fiveAnimate($currBattWrap, time, parseFloat(curr5hLeft), 'curr');
		//self.drawTimer(self.$comp5hCanvas, 5, 9, 'right');
		self.fiveAnimate($compareBattWrap, time, comp5hLeft, 'comp');
	},

	render8h: function(curr8hLeft, comp8hLeft) {
		var self = this;
		var time = 3000;
		var $currBattWrap = self.$eightWrap.find('.current_data .batt_leftWrap')
		var $compareBattWrap = self.$eightWrap.find('.compare_data .batt_leftWrap')

		self.drawNew(this.$curr8hCanvas, this.$comp8hCanvas, 480, 480, time);

		//self.drawTimer(self.$curr8hCanvas, 8, 8, 'left');
		//self.drawTimer(self.$comp8hCanvas, 8, 8, 'right');
		self.eightAnimate($currBattWrap, time, curr8hLeft, 'curr');
		self.eightAnimate($compareBattWrap, time, comp8hLeft, 'comp');
	},

	renderCharge: function(currChargTime, compChargTime) {
		var self = this;
		var $currBattWrap = self.$chargeWrap.find('.current_data .batt_leftWrap')
		var $compareBattWrap = self.$chargeWrap.find('.compare_data .batt_leftWrap')
		// 充电动画时长配置
		this.CHARGETIME = 13;

		// 当前手机动画
		//self.chargeCurrCircle.set(0);
		//self.chargeCurrCircle.animate(1);
		self.drawNew(this.$currCharCanvas, this.$compCharCanvas, currChargTime, compChargTime);
		self.chargeAnimate($currBattWrap, currChargTime);

		// 对比手机动画
		//self.chargeCompareCircle.set(0);
		//self.chargeCompareCircle.animate(1);
		self.chargeAnimate($compareBattWrap, compChargTime);
	},

	// 5小时续航动画
	fiveAnimate: function($battery, time, left, type) {
		var self = this; 
		var $currBattery =  $battery.find('.batt_used');

		var redTime = 0;
		var greenTime = time;
		var greenHeight = (1-left) * 100 + '%';
		var redAnimate = function() {
				$('.'+ type +'_5hLeft').html('').text((left * 1000)/10 + '%').show();
			};

		// 如果8小时待机后剩余电量低于20%
		if(left < 0.2) {
			greenHeight = '80%';
			greenTime = (0.8 / (1 - left)) * time;
			redTime = time - greenTime;

			redAnimate = function() {
				$currBattery.animate({
					'height': (1-left) * 100 + '%' 
				}, {
					duration: redTime,
					start: function() {
						$battery.css('background-color', '#d63036');
					},
					complete: function() {
						$('.'+ type +'_5hLeft').html('').text((left * 1000)/10 + '%').show();
					}
				});
			}
		} 

		// 重置待机初始状态
		$currBattery.stop().height('0');
		$battery.css('background-color', '#64dd17');
		
		// 充电动画
	    $currBattery.animate({
			'height': greenHeight 
		}, { 
			duration: greenTime,
			queue: false, 
			complete: redAnimate
		});

		self.timer($('.batt_5htimer'), 5, 0, 8);

	},
	

	// 八小时待机动画
	eightAnimate: function($battery, time, left, type) {
		var self = this; 
		var $currBattery =  $battery.find('.batt_used');

		var redTime = 0;
		var greenTime = time;
		var greenHeight = (1-left) * 100 + '%';
		var redAnimate = function() {
			$('.'+ type +'_8hLeft').html('').text((left * 1000)/10 + '%').show();
		};

		// 如果8小时待机后剩余电量低于20%
		if(left < 0.2) {
			greenHeight = '80%';
			greenTime = (0.8 / (1 - left)) * time;
			redTime = time - greenTime;

			redAnimate = function() {
				$currBattery.animate({
					'height': (1-left) * 100 + '%' 
				}, {
					duration: redTime,
					start: function() {
						$battery.css('background-color', '#d63036');
					},
					complete: function() {
						$('.'+ type +'_8hLeft').html('').text((left * 1000)/10 + '%').show();
					}
				});
			}
		} 

		// 重置待机初始状态
		$currBattery.stop().height('0');
		$battery.css('background-color', '#64dd17');
		
		// 从点动画
	    $currBattery.animate({
			'height': greenHeight 
		}, { 
			duration: greenTime,
			queue: false, 
			complete: redAnimate
		});

		self.timer($('.batt_8htimer'), 8, 0, 4);
	},

	// 充电动画, time 充满时间
	chargeAnimate: function($battery, time) {
		var self = this; 
		var $currBattery =  $battery.find('.batt_used');
		var redTime = time * self.CHARGETIME * 0.2;
		var greenTime = time * self.CHARGETIME * 0.8;
		var $dataY = $battery.closest('.battery_wrap').find('.batt_dataY').stop().css('height', '100%');
		//var yHeight = ((1 - (time * 60/ (5 * 3600)))*100).toFixed(2) + '%'; 
		var yHeight = ((1 - (time * 60/ (6 * 3600)))*100).toFixed(2) + '%'; 

		// 重置充电初始状态
		$currBattery.stop().height('100%');
		$battery.css('background-color', '#d63036');
		$battery.parent().find('.charge_icon').show();
		$dataY.css('border-bottom', 'none');
		
		// 充电电池动画
	    $currBattery.animate({
			'height': '80%'
		}, { 
			duration: redTime,
			queue: false, 
			easing: 'linear',
			complete: function() {
				$(this).animate({
					'height': '0'
				}, {
					easing: 'linear',
					duration: greenTime,
					start: function() {
						$battery.css('background-color', '#64dd17');
					},
					done: function() {
						$battery.parent().find('.charge_icon').fadeOut('slow');
					}
				});
			}
		});
		// 充电Y轴动画
		$dataY.animate({
			'height' : yHeight
		}, time * self.CHARGETIME,  function() {
			$(this).css('border-bottom', '1px solid #64dd17');
		});
	},

	timer: function($wrap,  minutes, seconds, time) {
		var t;
		function add() {
			seconds--;
			if (seconds < 0) {
				seconds = 59;
				minutes--;
				if (minutes < 0) {
					clearTimeout(t);
				}
			}
			//$wrap.text((hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));
			if(minutes >= 0) {	
				$wrap.text((minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));
				timer();
			}
		}
		function timer() {
			t = setTimeout(add, time);
		}
		timer()
	},

	//currCtx 和 compCtx 分别是左右的canvas的ctx，currTime和compTime 分别是左右时钟所要转的分钟数，animateTime是动画时间（可选）	
	drawNew: function(currCtx, compCtx, currTime, compTime, animateTime){
		var self = this;
		// 动画时间
		var radius = self.radius / 2;
		var pi = Math.PI;
		radius = radius * 0.90

		self.initChart = function(){
			cancelAnimationFrame(currCtx.animation);
			cancelAnimationFrame(compCtx.animation);
			self.startAnimation(currCtx, currTime);
			self.startAnimation(compCtx, compTime);
		};
		self.startAnimation = function(ctx, chargTime){
			var animate_time = '';
			if( !animateTime)
			animate_time = chargTime * self.CHARGETIME;
			else 
			animate_time = animateTime;
			// 目标 时 和 分
			var hour = Math.floor( (chargTime/60) % 12 );
			var minute = chargTime - hour * 60;
			// 结束滚动分钟
			var end_min  = (hour % 12) * 60 + minute;
			// 开始滚动的分钟
			var start_min = 0;
			// 平均每帧滚动分钟，requestAnimation每秒60帧
			var avgMin = (end_min / (animate_time/1000*60));

			ctx.run = function(){
				start_min += avgMin;
				ctx.clearRect(-55, -55, 110, 110);
				//starDraw(start_min / 60, start_min % 60, ctx);
				if (start_min < end_min) {
					starDraw(start_min / 60, start_min % 60, ctx);
					ctx.animation = requestAnimationFrame(ctx.run);
				} else {
					start_min = end_min;
					starDraw(start_min / 60, start_min % 60, ctx);
					cancelAnimationFrame(ctx.animation);
				}
			};
			ctx.animation = requestAnimationFrame(ctx.run);
		};

		function starDraw(hour, min, ctx) {
			// 画白色背景
			drawBackground(ctx, radius);

			// 画指针
			drawTime(hour, min, ctx);

			// 画时间刻度
			drawText(ctx, radius);
		};

		function drawBackground(ctx, radius) {
			ctx.beginPath();
			ctx.arc(0, 0, radius, 0, 2*Math.PI);
			ctx.fillStyle = 'white';
			ctx.fill();
			ctx.strokeStyle = '#333';
		    ctx.lineWidth = 1;
			ctx.stroke();
		};

		function drawText(ctx, radius) {
			var ang;
			var num;
			ctx.font = radius*0.2 + "px arial";
		    ctx.fillStyle = '#333';
			ctx.textBaseline="middle";
			ctx.textAlign="center";
			for(num = 1; num < 13; num++){
				if(num % 3 === 0) {	
					ang = num * Math.PI / 6;
					ctx.rotate(ang);
					ctx.translate(0, -radius*0.85);
					ctx.rotate(-ang);
					ctx.fillText(num.toString(), 0, 0);
					ctx.rotate(ang);
					ctx.translate(0, radius*0.85);
					ctx.rotate(-ang);
				} else {
					//ctx.translate(-radius, -radius);
					ang = num * Math.PI / 6;
					ctx.lineWidth = 1;            // HAND WIDTH.
                    ctx.beginPath();

					var min = radius * 0.8;
					var max = radius * 0.9;

                    var x1 = Math.cos(ang) * min;
                    var y1 = Math.sin(ang) * min;
                    var x2 = Math.cos(ang) * max;
                    var y2 = Math.sin(ang) * max;

                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);

                    ctx.strokeStyle = '#333';
                    ctx.stroke();
					//ctx.translate(radius, radius);
				}
			}
		};

		function drawTime(hour, min, ctx) {
			// 画绿色时长
			//hour_degreess时针的角度数
			var hour_degreess = (hour % 12) * 360 / 12;
			var hour_angle = hour_degreess * pi / 180;
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(0, radius);
			ctx.rotate(-0.5 * pi);
			ctx.arc(0, 0, radius, 0, hour_angle);
			
			ctx.fillStyle = '#64dd17';
			ctx.fill();
			ctx.rotate(0.5 * pi);

			// 时针
			hour_angle = (hour_degreess - 90) * pi / 180;
			var h_radius = radius * 0.5;
			drawHand(ctx, hour_angle, h_radius);

			// 分针
			//min_degreess分针的角度数
			var min_degreess = min * 360 / 60;
			var m_radius = radius * 0.75;
			var min_angle = (min_degreess - 90) * pi / 180;
			drawHand(ctx, min_angle, m_radius);

			function drawHand(ctx, min_angle, _radius){
				var start_min_x = -Math.cos(min_angle) * 6;
				var start_min_y = -Math.sin(min_angle) * 6;
				var end_min_x = Math.cos(min_angle) * (_radius - 6);
				var end_min_y = Math.sin(min_angle) * (_radius - 6);
				ctx.beginPath();
				ctx.lineWidth = 3;
				ctx.lineCap = "round";
				ctx.moveTo(start_min_x, start_min_y);
				ctx.lineTo(end_min_x, end_min_y);
				ctx.stroke();
			}
		};	

		self.initChart();

	},
	
	/*drawTimer: function(ctx, stopHour, speed, way) {
		var radius = 55;
		var hour = 0;
		var minute = 0;
		var timer = null;
		ctx.clearRect(-55, -55, 110, 110);
		radius = radius * 0.90

		if( way == 'left' ){
			clearInterval(self.timerLeft);

			self.timerLeft = setInterval(function() {
				if(hour >= stopHour*Math.PI/6 && minute === 0) {
					clearInterval(self.timerLeft);
					return;
				}
				drawClock();
			}, speed);
		} else if( way == 'right' ){
			clearInterval(self.timerRight);

			self.timerRight = setInterval(function() {
				if(hour >= stopHour*Math.PI/6 && minute === 0) {
					clearInterval(self.timerRight);
					return;
				}
				drawClock();
			}, speed);
		}


		function drawClock() {
			drawFace(ctx, radius);
			drawTime(ctx, radius);
			drawNumbers(ctx, radius);
		}

		function drawFace(ctx, radius) {
			ctx.beginPath();
			ctx.arc(0, 0, radius, 0, 2*Math.PI);
			ctx.fillStyle = 'white';
			ctx.fill();
			ctx.strokeStyle = '#333';
		    ctx.lineWidth = 1;
			ctx.stroke();
		}

		function drawNumbers(ctx, radius) {
			var ang;
			var num;
			ctx.font = radius*0.2 + "px arial";
		    ctx.fillStyle = '#333';
			ctx.textBaseline="middle";
			ctx.textAlign="center";
			for(num = 1; num < 13; num++){
				if(num % 3 === 0) {	
					ang = num * Math.PI / 6;
					ctx.rotate(ang);
					ctx.translate(0, -radius*0.85);
					ctx.rotate(-ang);
					ctx.fillText(num.toString(), 0, 0);
					ctx.rotate(ang);
					ctx.translate(0, radius*0.85);
					ctx.rotate(-ang);
				} else {
					//ctx.translate(-radius, -radius);
					ang = num * Math.PI / 6;
					ctx.lineWidth = 1;            // HAND WIDTH.
                    ctx.beginPath();

					var min = radius * 0.8;
					var max = radius * 0.9;

                    var x1 = Math.cos(ang) * min;
                    var y1 = Math.sin(ang) * min;
                    var x2 = Math.cos(ang) * max;
                    var y2 = Math.sin(ang) * max;

                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);

                    ctx.strokeStyle = '#333';
                    ctx.stroke();
					//ctx.translate(radius, radius);
				}
			}
		}

		function drawTime(ctx, radius){
			minute = minute + Math.PI/30;
			hour = hour + Math.PI/360;

			if(minute >= (2*Math.PI) ) {
				minute = 0;
			}

			// 画绿色时长
			ctx.beginPath();
			ctx.moveTo(0,0);
			ctx.lineTo(0, radius);
			ctx.rotate(-0.5*Math.PI);
			ctx.arc(0, 0, (radius-0.5), 0, hour);
			ctx.fillStyle = '#64dd17';
			ctx.fill();
			ctx.rotate(0.5*Math.PI);

			drawHand(ctx, hour, radius*0.5, 3);
			drawHand(ctx, minute, radius*0.75, 3);
		}

		function drawHand(ctx, pos, length, width) {
			ctx.beginPath();
			ctx.lineWidth = width;
			ctx.rotate(pos);
			ctx.moveTo(0, 6);
			ctx.lineTo(0, -length);
			ctx.stroke();
			ctx.rotate(-pos);
		}
	}*/
});
