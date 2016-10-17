Z.define('data/list', {
	initialize: function() {				
	    this.$wrap = $('.list_inner');
		this.$mobile_inner = $('.list_mobile');
		this.$wrap_title = this.$wrap.find('.brand_title');
		this.cacheData = {};
		this.showBrand();
		this.getRequestData();
		this.doSelectMobile();
		this.dataCache = {};
	},
	setPage: function() {
		var self = this;
		var requestData = this.getRequestData();
		var page = new Page ({
			wrap: self.$wrap.find('.list_page'),
			data: requestData,
			url: '/data/SearchMobile',
			type: 'html',
			next: true,
			totalPage:  Math.ceil(self.$wrap.find('input[name="mobile_num"]').val()/5),
			loadWrap: self.$mobile_inner,
			callback: function(html, page) {
				self.drawStar();
				self.$mobile_inner.html(html);
				self.drawStar();
			}
		});
	},
	drawStar: function() {
		var self = this;
		$('.list_star_chart').each(function(i) {
			var $this = $(this);
			var _id = $this.data('id');

			self.initChart(_id);

			eval("var star_"+_id+"=$('#list_star_chart_"+_id+"')");
			// 定义对象
			var chart = eval("star_"+_id).highcharts();

			var $basicData = $('.basic_data_' + _id);

			//外观数组
			var appearance = [];

			var _product = $basicData.data('product');
			for(i in _product) {
				appearance.push(_product[i]);
			}
			
			//获取外观第一个参数 
			var _score = appearance[0]?appearance[0]:0;
			
			//获取数据
			var _dataScore = [
				parseFloat(_score),
				parseFloat($basicData.data('screen')),
				parseFloat($basicData.data('camera')),
				parseFloat($basicData.data('battery')),
				parseFloat($basicData.data('temp')),
				/*
				parseFloat($basicData.data('system')),
				parseFloat($basicData.data('specs'))
				*/
			]

			var _dataName = $basicData.data('name');

			chart.addSeries({
				type: 'area',
				name: _dataName,
				data: _dataScore,
				pointPlacement: 'on',
				color: 'rgba(23,99,167,0.3)'
			});
			
			
		})
	},
	doSelectMobile: function() {
		var self = this;
		//获取数据
		var requestData = this.getRequestData();

		if(!this.cacheData[requestData['company']+requestData['system']]) {
			F.loading(self.$mobile_inner, 'white', true);
			$.post('/data/SearchMobile', requestData, function(html) {
				//做缓存
				self.cacheData[requestData['company']+requestData['system']] = html;
				F.unloading(self.$mobile_inner);
				self.$mobile_inner.html(html);
				self.setPage();
				self.drawStar();
			}, 'html')
		}else {
			self.$mobile_inner.html(self.cacheData[requestData['company']+requestData['system']]);
			self.drawStar();
		}
	},
	getRequestData: function() {
		var requestData = {};
		requestData.company = $('#mobile_company').val();
	    requestData.system= $('#mobile_system').val();
		return requestData;
	},
	showBrand: function() {
		var self = this;

		//选中状态
		var $logoTable =  this.$wrap.find('.logo_right');
		var $logoList = $logoTable.find('.logo_list'); 
		var $logo = $logoList.find('img');
		var $logoSystem = $logoTable.find('.system_logo');;  
		var $logoCompany= $logoTable.find('.brand_logo');  

		var select = function($logoActive, $this) {
			//去除上一个active状态
			if($logoActive.length == 1) {
				$logoActive.attr('src',$logoActive.data('source-hover')); 
				$logoActive.removeClass('active');
			}
			
			var _src = $this.data('source');
			var _srcHover = $this.data('source-hover');

			$this.attr('src', _src);
			$this.addClass('active');
		}

		//点击操作筛选
		$logo.on('click', function() {
			var $this = $(this);

			if($this.hasClass('active')) {
				return;
			}
			var _id = $this.data('id');
			// 筛选功能
			var $logoParent = $this.closest('.logo_list'); 

			if($logoParent.hasClass('brand_logo')) {
				var $logoActive = $logoCompany.find('img[class="active"]');
				$('#mobile_company').val(_id);
			}else {
				var $logoActive = $logoSystem.find('img[class="active"]');
				$('#mobile_system').val(_id);
			}

			//选择样式
			select($logoActive,$this)
			//筛选函数
			self.doSelectMobile();
			//设置分页
			self.setPage();
		})

		$logo.on('mouseenter', function() {
			var $this = $(this);
			var _src = $this.data('source');
			var _srcHover = $this.data('source-hover');
			$this.attr('src', _src);
		});
		
		$logo.on('mouseleave', function(){
			var $this = $(this);
			var _src = $this.data('source');
			var _srcHover = $this.data('source-hover');
			if(!$this.hasClass('active')) {
				$this.attr('src', _srcHover);
			}
		});
	},
	initChart: function(_id) {

		$('#list_star_chart_'+_id).highcharts({
			chart : {
				backgroundColor: '#fbfbfb',
				polar: true
			},

			title: {
				text: '',
				x: -80
			},

			pane: {
				size: '80%'
			},

			xAxis: {
				categories: ['结构&外观', '显示效果', '相机成像', '电池续航', '发热控制', /*'系统性能', '硬件配置'*/],
				tickmarkPlacement: 'on',
				lineWidth: 0
			},

			yAxis: {
				gridLineInterpolation: 'polygon',
				lineWidth: 0,
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
					fillOpacity: 0.5,
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
	}
})
