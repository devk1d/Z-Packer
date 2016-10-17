Z.define('post/data', {
	initialize: function(opts) {				
		var self = this;
		this.trend = opts.trend;
	    this.$wrap = $('.post_data');

		this.bindEvt();
		this.showCloud();
		this.priceTrend();
	},

	bindEvt: function() {
		var self = this;
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
	},
	//标签云排列
	showCloud: function(){
		var self = this;
		var $setCloud = this.$wrap.find('.data_cloud');
		var $cloudTags = $setCloud.find('.cloud_tag').not('.cloud_tag_0');

		var cloud_width = $setCloud.width();
		var cloud_height = $setCloud.height();
		var round_num = $cloudTags.length;//大圆周围圆的数量
		var each_angle = 360 / round_num;
		var min_length = 130;
		var max_length = 150;
		var PI = Math.PI;
		var start_pi = Math.random() * 2 * PI;//开始布置圆的随机角度
		var color_arr = [1, 2, 3, 4];
		var angle_arr = [-PI/8, PI/8, PI * 7/8, -7/8 * PI];

		//生成随机颜色下标
		var random_color = color_arr.sort(function(){
			return Math.random() - 0.5;
		});
		//随机标签角度
		var random_angle = angle_arr.sort(function(){
			return Math.random() - 0.5;
		});

		//字体的宽度
		var getTxtWidth = function($dom){
			var n_size = parseInt($dom.css('font-size'));
			var $new = $('<span>').text($dom.text());
			$new.css({'font-size': n_size + 'px'});
			$('body').append($new);
			var width = $new.outerWidth();
			$new.remove();
			return width;
		};
		var reSize = function($dom, grade){
			var txt = $dom.html();
			var txt_length = txt.length;
			var txt_width = getTxtWidth($dom);//获取文字在一行中的宽度
			var n_width = $dom.width();
			var n_size = parseInt($dom.css('font-size'));
			var dis = n_width - txt_width;

			var each_min = 6;//使文字左右离边保持最小6px的距离
			var min_size = 12;//文字最小为12px
			
			//当文字长度超过所在圆宽度范围限制
			if( dis < each_min * 2 ){
				n_size -= 2;

				//当文字还可以缩小时
				if( n_size > min_size ){
					$dom.css('font-size', n_size + 'px');
					reSize($dom, grade);

				} else {
					$dom.css('font-size', min_size + 'px');
					txt_width = getTxtWidth($dom);
					dis = n_width - txt_width;
					//当字体达到最小当仍超时
					if( dis < each_min * 2 ){
						//文字已最小，但长度仍超
						if( grade ){
							txt = txt.substr(0, 5);
						} else {
							txt = txt.substr(0, 4);
						}
						$dom.html(txt + '...');
					}
				}
			}
		};

		if( each_angle ){
			$.each($cloudTags, function(index, item){
				//将标签根据随机位置排列
				$(item).addClass('cloud_tag_big');
				var n_angle = angle_arr[index];
				var length = Math.random() * (max_length - min_length) + min_length;
				var n_x = length * Math.cos(n_angle) + cloud_width / 2;
				var n_y = length * Math.sin(n_angle) + cloud_height / 2;
				
				reSize($(item), index % 2);

				$(item).css({'left': n_x, 'top': n_y}).addClass('cloud_color_' + random_color[index]);
			});
		}
		$setCloud.find('.cloud_tag').show();
		$cloudTags.on('click', function(){
			var txt = $(this).html();	
			F.ga('button', 'click', 'post_cloud_' + txt);
		});
	},

	//价格曲线
	priceTrend: function(){
		var self = this;
		var list = this.trend.mobilePriceTrend,
		mobile_info = this.trend.mobileInfo;
		content = [],
		xScale = [],
		price = null,
		len = list.length,
		startLen = 0,
		y_arr = [],//纵轴坐标
		lenNum = len - 5;

		//取最后5个数据
		if( lenNum <= 0) {
			startLen = 0;	
		} else {
			startLen = lenNum;
		};

		function dataChange(data, type) {
			var Y = '';
			var M = '';
			var N = '';
			if (type) {
				M = (data.getMonth() + 1) + '.'
				N = data.getDate()
				xScale.push(M + N);
			} else {
				Y = data.getFullYear() + '.'
				M = (data.getMonth() + 1) + '.'
				N = data.getDate()
				xScale.push(Y + M + N);
			} 
		}

		if(list == '') {
			//list = json.message.mobileInfo;
			var creatData = new Date(parseInt(mobile_info.releaseDate * 1000, 10));
			var nowData = new Date();
			
			dataChange(creatData, 0);
			dataChange(nowData, 1);
			price = {'values': mobile_info.price}
			//只有两条数据
			for(var i= 0; i<2; i++){
				content.push(price);	
			}

			//y_arr = ['0', json.message.mobileInfo.price];
			y_arr = parseInt(json.message.mobileInfo.price);
		} else {
			var creatData = new Date(parseInt(mobile_info.releaseDate * 1000, 10));
			var nowData = new Date();
			
			dataChange(creatData, 0);

			if( parseInt(mobile_info.releasePrice) )
			content.push({'values': mobile_info.releasePrice});
			else 
			content.push({'values': mobile_info.price});

			//时间格式变换
			var each_date = '';
			var max_price = 0;//取出价格趋势中最高价
			for(var i= startLen; i<len; i++){
				var data = new Date(parseInt(list[i].created_at * 1000, 10));

				if (i == startLen) {
					var Y = data.getFullYear() + '.'
					var M = (data.getMonth() + 1) + '.'
					var N = data.getDate()
					each_date = Y + M + N;
				} else {
					var M = (data.getMonth() + 1) + '.'
					var N = data.getDate()
					each_date = M + N;
				}
				xScale.push(each_date);
				price = {'values': list[i].official_price}
				content.push(price);	
			}
			//取出最大的纵坐标
			for( var i=0; i< content.length; i++ ){
				var now_price = parseInt(content[i].values);
				if( now_price >= max_price ){
					max_price = now_price;
				}
			}
			y_arr = max_price;
			//y_arr = [list[len - 1].official_price, json.message.mobileInfo.price];
		}

		var $priceCanvas = self.$wrap.find('.price_canvas');
		//xScale.push('今天');
		//content.push(content[content.length-1]);
		if( content.length > 2 ){	
			//取出最小值
			var min = content[0];
			var min_index = 0;
			$.each(content, function(index, item){
				if( min > item.values ){
					min_index = index;
					min = item.values;
				}
			});

			//处理出现相同日期的情况
			if( xScale[0] == xScale[min_index] ){
				var new_content = [content[0], content[content.length-1]];
				var new_scale = [xScale[0], '今天'];
			} else {
				var new_content = [content[0], {values: min}, content[content.length-1]];
				var new_scale = [xScale[0], xScale[min_index], '今天'];
			}
			content = new_content;
			xScale = new_scale;
		} else if( content.length == 2 ){
			var new_scale = [xScale[0], '今天'];
			xScale = new_scale; 
		}
		var o_date = xScale[0].split('.');
		xScale[0] = o_date[0] + '.' + o_date[1];

		var drawWater = new self.priceChart({
			dom: $priceCanvas,
			timeScale: xScale,
			content: content,
			y_arr: y_arr,
			color: {
				blue:	'#19a0ff',
				green:	'#44be05',
				yellow:	'#ffc411',
				red:	'#f86117',
				black:	'#59676b',
				gray:	'#b3b3b3',
				l_gray: '#e2e5e7'
			}
		});
	},

	priceChart: function(opts){
		var self = this;
		this.opts = $.extend({
			dom: '',
			content: [],
			color: {}
		}, opts)

		this.$dom = this.opts.dom; 
		this.content = this.opts.content;
		this.timeScale = this.opts.timeScale;
		this.color = this.opts.color;

		this.canvas = this.$dom.find('canvas');
		this.width = this.$dom.width();
		this.height = this.$dom.height();
		this.ctx = this.canvas.get(0).getContext('2d');
		this.y_arr = this.opts.y_arr;//y轴纵坐标
		var pi = Math.PI;
		var o_x = 32.5; //原点坐标
		var o_y = 195.5;
		var y_num = 4;//横线条数
		var scale_width = 260;
		var each_width = parseInt((scale_width)/(this.timeScale.length - 1));
		var each_height = 50;
		var scale_height = each_height * (y_num - 1);
		var point_radius = 2.5; //小点半径
		var o_temp = 0; //原点坐标的起始温度
		var y_height = 0; //每个点在动画过程中的纵坐标
		var arr_pos = []; //存储每个点的坐标
		var y_price = 0; //y轴的最高价格

		var dott_each = 6;//白色虚线宽度
		var dott_num = Math.ceil(scale_width / dott_each);

		y_price = Math.ceil(this.y_arr / 1000);
		if( y_price > 2 ){
			o_temp = y_price - y_num + 1;
		} else {
			o_temp = y_price / 4;
		}

		this.makeScale = function(){
			var ctx = this.ctx;
			ctx.save();
			ctx.translate(o_x, o_y);

			//每个价格横线
			ctx.beginPath();
			//ctx.font = '10px';
			ctx.font = '10px Arial';
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'right';

			for( var i=0; i<y_num; i++){
				//var y_each_price = o_temp + y_price - y_num + 1 + i; 
				if( y_price > 2 ){
					var y_each_price = o_temp + i;
				} else {
					var y_each_price = o_temp * (i + 1);
				}
				ctx.fillStyle = self.color.l_gray;
				ctx.fillText(y_each_price + 'k', -3, -i * each_height);
				ctx.moveTo(0, -i * each_height);
				ctx.lineTo(scale_width, -i * each_height);
			}
			ctx.lineWidth = 1;
			ctx.strokeStyle = self.color.l_gray;
			ctx.stroke();
			ctx.closePath();

			//白色纵线，和上面的合并形成虚线
			/*ctx.beginPath();
			for( var i=1; i<dott_num; i++){
				ctx.moveTo(i * dott_each + 0.5, 2);
				ctx.lineTo(i * dott_each + 0.5, -scale_height - 1);
			}
			ctx.lineWidth = 2;
			ctx.strokeStyle = '#fff';
			ctx.stroke();
			ctx.closePath();*/

			//纵轴
			ctx.beginPath();
			//var len = this.y_arr.length - 1;	
			//var y_price = 0;

			/*for(var i=0; i<3; i++){
				if(i == 2) {
					y_price = Math.ceil(this.y_arr[i - 1] / 1000);
					ctx.strokeText((o_temp + y_price) + 'k' , -5, -i * each_height);
				} else if(i == 1) {
					y_price = Math.ceil(this.y_arr[i] / 2000);
					ctx.strokeText((o_temp + y_price) + 'k' , -5, -i * each_height);
				} 		
			}*/
			//ctx.strokeText((o_temp + y_price) + 'k' , -5, -2 * each_height);
			//ctx.strokeText((o_temp + y_price / 2) + 'k' , -5, -each_height);

			ctx.strokeStyle = self.color.l_gray;
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
		};

		this.drawTemp = function(y_height){
			var ctx = this.ctx;
			ctx.save();
			ctx.translate(o_x, o_y);
			//计算前一个点和下一个点
			for(var i=0; i<self.content.length; i++){
				var temp_x = i * each_width;
				var ny = self.content[i].values - o_temp;
				var temp_y = -ny * (scale_height/(y_price * 1000)) * y_height;

				if( i != self.content.length - 1 ){
					var nny = self.content[i+1].values - o_temp;
					var temp_ny = -nny * (scale_height/(y_price * 1000)) * y_height;
				}
				if( y_height >= 1 ){
					arr_pos.push({x: temp_x, y: temp_y, values: self.content[i].values});
				}


				//点与点之间的连线(除了最后一个点);
				if( i != self.content.length - 1 && i != 0){
					ctx.beginPath();
					ctx.moveTo(temp_x, temp_y);
					ctx.lineTo( (i+1) * each_width,  temp_ny);
					ctx.strokeStyle = self.color.blue;
					ctx.lineWidth = 1;
					ctx.stroke();
					ctx.closePath();
				} else if( i == 0) {
					ctx.beginPath();
					//画波浪begin
					ctx.moveTo(0, temp_y);
					ctx.lineTo( (i+1) * each_width, temp_ny );
					ctx.strokeStyle = self.color.blue;
					ctx.lineWidth = 1;
					ctx.stroke();
					ctx.closePath();
				}
			}
			ctx.restore();
		};

		this.makeOx = function(){
			var ctx = this.ctx;
			ctx.save();
			ctx.translate(o_x, o_y);

			/*ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(scale_width - 30.5, 0);
			ctx.strokeStyle = self.color.gray;
			ctx.stroke();
			ctx.closePath();*/

			ctx.beginPath();
			ctx.font = '12px Arial';
			ctx.textAlign = 'center';
			ctx.fillStyle = self.color.l_gray;

			for(var j=0; j<2 * this.timeScale.length + 1; j++){
				if(j == 0) {
					ctx.fillText( this.timeScale[j], j * each_width, 30);
				} else {
					ctx.fillText( this.timeScale[j], j * each_width - 10, 30);
				}
				//ctx.stroke();
			}
			ctx.closePath();

			ctx.restore();
		};
		this.makeOy = function(){
			/*var ctx = this.ctx;
			ctx.save();
			ctx.translate(o_x, o_y);

			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(0, -scale_height);
			ctx.strokeStyle = self.color.gray;
			ctx.stroke();
			ctx.closePath();
			ctx.restore();*/
		};

		//鼠标悬浮
		this.makeHover = function(pos){
			var ctx = this.ctx;
			var line_num = Math.ceil(-pos.y / 2);
			ctx.save();
			ctx.translate(o_x, o_y);

			ctx.beginPath();
			for( var i=0; i<line_num; i++ ){
				if( !(i % 3) ){
					var now_y = pos.y + i * 2;
					if( now_y + 2 > 0 ) now_y = -2;
					ctx.moveTo(pos.x, now_y);
					ctx.lineTo(pos.x, now_y + 2);
					
				}
			}
			ctx.lineWidth = 1;
			ctx.strokeStyle = '#cceaff';
			ctx.stroke();
			
			ctx.closePath();

			ctx.beginPath();
			ctx.arc(pos.x, pos.y, point_radius+0.5, 0, 2*pi);
			ctx.fillStyle = '#fff';
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.arc(pos.x, pos.y, point_radius+0.5, 0, 2*pi);
			ctx.strokeStyle = this.color.blue;
			ctx.stroke();
			ctx.closePath();

			var r = 2;			//圆角半径
			var r_width = 53;	//正方体框宽度 
			var r_height = 22;	//正方体框高度
			var spe_width = 7;	//平行四边形上下两边偏移度
			
			//温度数字框
			var a_x = Math.floor(pos.x) - 0.5;
			var a_y = Math.floor(pos.y) - 25.5;
			ctx.save();
			ctx.translate(a_x, a_y);
			ctx.beginPath();
			ctx.moveTo(spe_width, 0);
			ctx.lineTo(r_width + spe_width, 0);
			ctx.lineTo(r_width, r_height);
			ctx.lineTo(0, r_height);
			ctx.lineTo(spe_width, 0);
			ctx.fillStyle = self.color.blue;
			ctx.fill();

			ctx.font = '12px Arial';
			//ctx.font = '12px "Helvitica Neue" lighter';
			//ctx.font = '12px "Helvitica Neue", Helvitica, Arial, "Microsoft YaHei", sans-serif lighter';
			ctx.textAlign = 'center';
			ctx.fillStyle = '#fff';
			ctx.fillText('￥' + parseInt(pos.values), spe_width+20, 16);

			ctx.closePath();
			ctx.restore();

			ctx.restore();
		};

		this.run = function(){
			if( y_height <  100 ){
				y_height += 2;
				self.ctx.clearRect(0, 0, self.width, self.height);
				self.makeScale();
				self.drawTemp(y_height/100);
				//self.makeOy();
				self.makeOx();
				self.animation = requestAnimationFrame(self.run);
			} else {
				cancelAnimationFrame(this.animation);
				self.makeHover(arr_pos[0]);
			}
		};
		this.canvas.on('mousemove', function(ev){
			if( y_height >= 100 ){
				var mouse = F.getMousePos(ev, $(this));
				//相对于原点的坐标轴位置
				var pos = { x: mouse.x - o_x, y: mouse.y - o_y };
				var now_one = Math.ceil( (pos.x - each_width/2) / each_width);
				if( pos.x > 0 && pos.y < 0 ){
					self.ctx.clearRect(0, 0, self.width, self.height);
					self.makeScale();
					self.drawTemp(1);
					self.makeOx();
					self.makeHover(arr_pos[now_one]);
				}
			}
		});

		this.animation = requestAnimationFrame(this.run);
	}
})
