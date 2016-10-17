
Z.define('data/basicInfo', {
	initialize: function() {
		var self = this;
		self.select = Z.require('data/tools').select;

		self.currMobileId = window.mobile_id;
		self.currMobileName = window.mobile_name;
		self.currColorId = window.mobile_colorid;
		self.compMobileId= window.compMobileId;
		self.compMobileName = window.compMobileName;
		self.compColorId = window.compColorId;

		self.$wrap = $('.detail_basicInfo');
		self.$header = $('.basicInfo_header');
		//5角星
		self.starNum = 5;
		//多边形颜色
		self.currColor = ['#2b9aff', '#248eff', '#4fb5ff', '#35a4ff', '#2fa0ff'];
		self.compColor = ['#ffce00', '#ffc700', '#ffdd00', '#ffd400', '#ffd200'];
		//多边形数据的集合（即三角形集合）
		self.currData = [];
		self.compData = [];

		self.categories = ['结构&外观', '显示效果', '相机成像', '电池续航', '发热控制'];

		/*self.data = {
			curr: {
					type: 'area',
					name: self.currMobileName,
					data: [],
					pointPlacement: 'on',
					color: 'rgba(23,99,167,0.3)'
				},
			comp: {
					type: 'area',
					name: self.compMobileName,
					data: [],
					pointPlacement: 'on',
					color: 'rgba(228,66,135,0.3)'
				}
		};*/

		self.initChart();
		self.chart = $('#basicInfo_sevenStar').highcharts();

		// 获取六芒星数据并渲染, 先渲染对比机型数据是为了让当前机型在上面
		self.getScoreData(self.compMobileId, self.compColorId, 'comp', function() {
			self.getScoreData(self.currMobileId, self.currColorId, 'curr');
		});


		self.bindEvent();
	},

	bindEvent: function() {
		var self = this;
		//加载视网膜屏的黄色icon
		var iconup2x = new Image();
		iconup2x.src = 'iconup2x.png';

		var $colorSelector = self.$wrap.find('.colorSelector');
		var $colorImgWrap = self.$wrap.find('.colorImgWrap');

		$colorSelector.on('click', 'span', function() {
			var $this = $(this);

			if($this.hasClass('active')) return;
			$colorSelector.find('.active').removeClass('active');
			$this.addClass('active');
			$colorImgWrap.find('.active').fadeOut(200, function(){
				$(this).removeClass('active');
				$colorImgWrap.find('img').eq($this.index()).fadeIn(300, function() {
					$(this).addClass('active');
				});
			});
		});

		//经过五芒星
		var $starPoint = self.$wrap.find('.star_point');
		$starPoint.on('mouseenter', function(e){
			if( self.chart.series.length ){
				for( var i=0; i<self.starNum; i++ ){
					self.chart.series[i].update(self.currData[i]);
					self.chart.series[i+5].update(self.compData[i]);
				}
			}
		});
		$starPoint.on('mouseleave', function(e){
			if( self.chart.series[5]){
				for( var i=0; i<self.starNum; i++ ){
					self.chart.series[i].update(self.compData[i]);
					self.chart.series[i+5].update(self.currData[i]);
				}
			}
		});
		

		//机型比较
		self.phoneSelector = new self.select({
			dom: self.$header.find('.tool_compare'),
			defaultKey: '选择对比机型',
			onClick: function(e, dom) {
				var compMobileId = $(dom).data('id');
				var compColors = $(dom).data('color');
				window.location.href = '\/data\/detail\/' + self.currMobileId + '?compid=' + compMobileId;
			}
		});

		/* 颜色第一版不上
		// toggle颜色Selector
		self.$wrap.find('.basic_colorSel').on('click', '.defaultColor', function(e) {
			var $this = $(this);
			if($this.hasClass('unclickable')) return;
			e.stopPropagation();
			$('.defaultColor').not($this).parent().find('.colorSel').hide();
			$this.parent().find('.colorSel').toggle();
		});

		// 选择其他颜色
		self.$wrap.on('click', '.colorSel',  function(e) {
			var $this = $(e.target);
			if($this.hasClass('color_selItem')) {
				var cid = $this.data('cid');
				var id = $this.data('id');
				var type = $this.data('type');
				var rgb = $this.data('rgb');

				if($this.hasClass('active')) return;
				$this.parent().find('.active').removeClass('active');
				$this.addClass('active');
				if(type == 'curr' && self.chart.series[0]) {
					self.$wrap.find('.curr_defaultColor').css('background', '#' + rgb);
					self.chart.series[0].remove();
				} else {
					self.$wrap.find('.comp_defaultColor').css('background', '#' + rgb);
					self.chart.series[1].remove();
				}
				self.getScoreData(id, cid, type)
			} else {
				e.stopPropagation();
			}
		});

		// 点击外部关掉颜色sel
		$('html').click(function() {
			self.$wrap.find('.colorSel').hide();
		});
		*/
	},

	getScoreData: function(mobileId, colorid, type, callback) {
		var self = this;
		var arrColor = [];
		var chartArr = [];
		if( type == 'curr' ) arrColor = self.currColor;
		else if( type == 'comp' ) arrColor = self.compColor;
		// 获取六芒星数据
		$.post('/data/getSevenData', {mobile_id: mobileId}, function(json) {
			var data = json.message;
			if(json.status == 200) {
				//原版的只有一个颜色的多边形
				/*self.data[type].data = [
					self.deEncrypt(data.product_score[colorid]),
					self.deEncrypt(data.screen_score),
					self.deEncrypt(data.camera_score),
					self.deEncrypt(data.battery_score),
					self.deEncrypt(data.temp_score)];*/
					/*self.deEncrypt(data.system_score), self.deEncrypt(data.specs_score)*/
				
				//新版多边形多种颜色，通过每一块画三角形得出
				//这里每个新创建的数据对象，避免引用关系
				chartArr.push({
					type: 'area',
					data: [self.deEncrypt(data.product_score[colorid]), self.deEncrypt(data.screen_score), 0],
					pointPlacement: 'on',
					color: arrColor[0] 
				});
				self.chart.addSeries(chartArr[chartArr.length-1], false);//false为不渲染，只添加数据

				chartArr.push({
					type: 'area',
					data: [0, self.deEncrypt(data.screen_score), self.deEncrypt(data.camera_score), 0],
					pointPlacement: 'on',
					color: arrColor[1] 
				});
				self.chart.addSeries(chartArr[chartArr.length-1], false);

				chartArr.push({
					type: 'area',
					data: [0, 0, self.deEncrypt(data.camera_score), self.deEncrypt(data.battery_score), 0],
					pointPlacement: 'on',
					color: arrColor[2] 
				});
				self.chart.addSeries(chartArr[chartArr.length-1], false);

				chartArr.push({
					type: 'area',
					data: [0, 0, 0, self.deEncrypt(data.battery_score), self.deEncrypt(data.temp_score), 0],
					pointPlacement: 'on',
					color: arrColor[3] 
				});
				self.chart.addSeries(chartArr[chartArr.length-1], false);

				chartArr.push({
					type: 'area',
					data: [0, 0, 0, 0, self.deEncrypt(data.temp_score), self.deEncrypt(data.product_score[colorid]), 0],
					pointPlacement: 'on',
					color: arrColor[4] 
				});
				self.chart.addSeries(chartArr[chartArr.length-1], true);

				var chartNum = self.chart.series.length - 1;
				for( var i = chartNum; i>(chartNum - self.starNum); i-- ){
					//保存当前机型和对比机型的数值、颜色等数据
					if( type == 'curr' ) self.currData = chartArr; 
					else if( type == 'comp' ) self.compData = chartArr; 
				}
				
				// 保证对比机型的七芒星晚于当前机型渲染
				if(callback && typeof callback === 'function') {
					callback();
				}
			} 
		}, 'json');
	},

	deEncrypt: function(str) {
		return (parseFloat(str.split('e')[0]) - 0.00001415)* 100000;
	},

	//点击刻度触发时间
	go2Tool: function(evt) {
		var $type = $(evt.target).text();

		var headList = {'结构&外观': 'surface', '配置参数': 'configure', '相机成像': 'camera', 
		'显示效果': 'screen', '电池续航': 'battery', '发热控制': 'temp', 'ZEALER 点评': 'comment'}

		if(headList[$type]) {
			var $headIcon = $('.post_' + headList[$type] + '_head .head_icon');
			if(!$headIcon.hasClass('active')) {
				$headIcon.trigger('click');
			}			
			/*setTimeout(function() {
				F.scrollTo($headIcon.offset().top - 60);
			}, 400);*/
		}
	},

	initChart: function() {
		var self = this;
		var label_index = 0;

		$('#basicInfo_sevenStar').highcharts({
			chart : {
				polar: true,
				events: {
					click: function(e) {
						self.go2Tool(e);
					}
					/*
					redraw: function(event) {
					}
					*/
				},       
				//backgroundColor: '#ff0000',
				//borderColor: '#d7e0e8',
				animation: {
					duration: 300
				},
				//plotBackgroundColor: '#d7e0e8',
			},

			title: {
				text: '',
			},

			pane: {
				size: 260,
				//background: [{backgroundColor: '#eaeff3', borderWidth: 0}],
				startAngle: 0,
				endAngle: 360
			},

			xAxis: {
				tickInterval: 72,
				min: 0,
				max: 360,
				//categories: ['结构&外观', '显示效果', '相机成像', '电池续航', '发热控制'],
				lineWidth: 2,
				lineColor: '#eaeff3',
				//tickmarkPlacement: 'on',
				tickWidth: 1,
				gridLineColor: '#d7e0e8',
				labels: {
					formatter: function () {
						if( label_index > 5 ) label_index = 0;
						var _html = '<span style="background: #ff0000;" data-type="' + self.categories[label_index] + '">' + self.categories[label_index] + '</span>';
						label_index++;
						return _html;
					}
				}
			},

			yAxis: {
				alternateGridColor: '#eaeff3',
				gridLineInterpolation: 'circle',
				tickInterval: 100,
				lineWidth: 0,
				max: 100,
				min: 0,
				labels: {
					enabled: false
				},
			},

			tooltip: {
				enabled: false
			},

			plotOptions: {
				series: {
					pointStart: 0,
					pointInterval: 72,
					fillOpacity: 1,
					marker: {
						enabled: false
					},
	                enableMouseTracking: false
				},
				column: {
					pointPadding: 0,
					groupPadding: 0,
				}
			},

			tooltip: {
				enabled: false
			},

			exporting: {
				enabled: false
			},

			legend: {
				enabled: false 
			},

			credits: {
				enabled: false
			},

			series: [
			]
		});	
	}



	/*initChart: function() {
		var self = this;

		$('#basicInfo_sevenStar').highcharts({
			chart : {
				polar: true,
				events: {
					click: function(e) {
						self.go2Tool(e);
					}
					redraw: function(event) {}
				},       
			},

			title: {
				text: '',
				x: -80
			},

			pane: {
				size: '80%'
			},

			xAxis: {
				categories: ['结构&外观', '显示效果', '相机成像', '电池续航', '发热控制'],
				tickmarkPlacement: 'on',
				lineWidth: 0,
				labels: {
					formatter: function () {
						return '<span data-type="' + this.value + '">' + this.value + '</span>';
					}
				}
			},

			yAxis: {
				gridLineInterpolation: 'polygon',
				lineWidth: 0,
				max: 100,
				min: 0,
				labels: {
					enabled: false
				}
			},

			tooltip: {
				enabled: false
			},

			plotOptions: {
				series: {
					fillOpacity: 0.3,
					marker: {
						enabled: false
					}
				}
			},

			exporting: {
				enabled: false
			},

			legend: {
				align: 'right',
				verticalAlign: 'top',
				y: 70,
				layout: 'vertical',
				enabled: false
			},

			credits: {
				enabled: false
			},

			series: []
		});	
	}*/
});
