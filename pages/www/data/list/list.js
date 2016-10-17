Z.define('data/list', {
	initialize: function() {
		var self = this;
		this.$wrap = $('.wrap_phone');
		this.bindEvent();
		this.showCompare();
		this.clickCompare();
	},
	bindEvent: function(){
		var self = this;
		var $contentSort = this.$wrap.find('.content_sort');
		var $phoneList = this.$wrap.find('.phone_list');
		var $phoneLoad = this.$wrap.find('.phone_load');
		F.loading($phoneLoad, 'white', true);

		//页面开始时是综合排序
		var _type = 'sort desc';
		//每次加载5台手机
		var _each = 5;
		var sortNum = $contentSort.find('.sort_num span').text();

		this.cacheData = {};

		this.data = {
			company: this.$wrap.data('cid'),
			system: this.$wrap.data('sid'),
			page: 1,
			sort: 'sort desc',
		};
		//防止多次滚动加载，true是不能加载
		var loading = false;
		//控制排列选择的开关
		var changeTab = true;

		//排列选择，时间、价格等
		$contentSort.on('click', 'li', function(){
			if( changeTab ){
				changeTab = false;
				//保存点击前的内容
				self.cacheData[_type] = $phoneList.html();

				//order用来判断当前显示的是升序还是降序
				var _order = $(this).data('order');
				
				$contentSort.find('li').removeClass();
				if( _order == 'desc' ){
					_order = 'asc';
					$(this).addClass('sort_up');
				} else {
					_order = 'desc';
					$(this).addClass('sort_down');
				}
				$(this).data('order', _order);
				
				_type = $(this).data('type') + ' ' + _order;
				self.data.sort = _type;

				if( self.cacheData[_type] ){
					$phoneList.html(self.cacheData[_type]);
					var _length = $phoneList.find('.list_li').length;
					//如果该缓存内容是加载完的
					if( _length < sortNum ) loading = false;
					else loading = true;

					self.data.page = Math.ceil(_length/_each);
					makeChosen($phoneList);
					changeTab = true;
				} else {
					loading = false;
					self.data.page = 1;
					$phoneList.hide();
					$phoneLoad.show();
					requestData();
				}
			}
		});
		
		$(window).scroll(function(){
			//$(window).scrollTop();
			if( ( $(document).height() - $(window).scrollTop() ) - $(window).innerHeight() < 270){
			//if( ( $(document).height() - $(window).scrollTop() ) < 1100 ){
				if( !loading && $phoneList.find('.list_li').length < sortNum ){
					$phoneLoad.show();
					self.data.page++;
					requestData(true);
				}
			}
		});
		
		//处理切换条件时手机的选中状态
		function makeChosen($html){
			var $liCheckbox= $html.find('li .li_checkbox');
			$.each($liCheckbox, function(index, item){
				var n_id = $(item).data('id');
				if( n_id == self.id_1 ){
					self.$box_1 = $(item).find('.checkbox_on').show();
				} else if( n_id == self.id_2 ){
					self.$box_2 = $(item).find('.checkbox_on').show();
				} else {
					$(item).find('.checkbox_on').hide();
				}
			});
			self.noChoose($html);
		}
		
		//add为true时为瀑布流追加内容
		function requestData(add){
			var url = '/data/searchMobiles';
			var _html = '';
			if( !loading ){
				loading = true;
				$.post(url, self.data, function(json){
					if( json.status == 200 ){
						var $jsonMessage = $('<ul>' + json.message + '</ul>');
						$phoneLoad.hide();
						if( add ) _html = $phoneList.html();

						$phoneList.show().html( _html + $jsonMessage.html() );
						makeChosen($phoneList);

						if( !$jsonMessage.html() || $phoneList.find('.list_li').length == sortNum ) loading = true;
						else loading = false;

						changeTab = true;
					} else {
						alert(json.message);
						changeTab = true;
					}
				}, 'json');
			}
		}

	},

	showCompare: function(){
		var self = this;
		var $phoneList = this.$wrap.find('.phone_list');
		$phoneList.on('mouseenter', '.list_content .content_img', function(){
			var $listLi = $(this).closest('.list_li');
			var $listCompare = $listLi.find('.list_compare').stop().animate({left: '319px'});
			var $compareTab = $listCompare.find('.compare_tab');
			var $tabBtn = $listCompare.find('.compare_btn ul li');
			
			//对比条tab切换
			$tabBtn.on('click', function(){
				var _index = $(this).index();
				$tabBtn.removeClass('active');
				$(this).addClass('active');
				
				$compareTab.hide();
				$compareTab.eq(_index).show();
			});

			$listLi.on('mouseleave', function(){
				$listCompare.stop().animate({left: '-760px'});
			});
		});
	},

	//点击加入对比框	
	clickCompare: function(){
		var self = this;
		var $phoneList = this.$wrap.find('.phone_list');
		var $phoneCompare = this.$wrap.find('.phone_compare');

		this.id_1 = '';
		this.id_2 = '';
		var img_1 = '';
		var img_2 = '';
		//加入对比的机型的勾√ 
		this.$box_1 = null;
		this.$box_2 = null;

		//取消对比框内容
		function cancelCompare(index){
			//index为触发的是对比框的哪个（上:0、下:1）；
			if( index == 0 ){
				self.$box_1.hide();
				if( self.id_2 ){
					self.id_1 = self.id_2;
					img_1 = img_2;
					self.$box_1 = self.$box_2;

					self.id_2 = '';
					img_2 = '';
					self.$box_2 = null;
					$phoneCompare.find('img').eq(0).attr('src', img_1);
					$phoneCompare.find('img').eq(1).attr('src', img_2).hide();
				} else {
					self.id_1 = '';
					img_1 = '';
					self.$box_1 = null;
					$phoneCompare.find('img').eq(0).attr('src', img_1).hide();
					$phoneCompare.stop().animate({'right': '-142px'}, 600);
				}
			} else if( index == 1 ){
				self.$box_2.hide();
				self.id_2 = '';
				img_2 = '';
				self.$box_2 = null;
				$phoneCompare.find('img').eq(1).attr('src', img_2).hide();
			}

			$phoneCompare.find('.compare_go').attr('href', 'javascript:;');
			self.noChoose($phoneList);
		}

		//处理勾选完和没勾选完的框背景色
		self.noChoose = function($html){
			if( self.id_1 && self.id_2 ){
				$html.find('.li_checkbox').addClass('checkbox_no');
				self.$box_1.parent().removeClass('checkbox_no');
				self.$box_2.parent().removeClass('checkbox_no');
			} else {
				$html.find('.li_checkbox').removeClass('checkbox_no');
			}
		};

		//点击列表的勾选框
		$phoneList.on('click', '.li_checkbox', function(){
			var $checkboxOn = $(this).find('.checkbox_on');
			var now_id = $(this).data('id');

			//当前点击机型已加入对比，该点击表示取消
			if( now_id == self.id_1 || now_id == self.id_2 ){
				if( now_id == self.id_1 ) cancelCompare(0);	
				else cancelCompare(1);

			//当前点击机型还没加入对比
			} else if( !self.id_1 || !self.id_2 ){
				if( !self.id_1 ){
					$phoneCompare.stop().animate({'right': 0}, 600);

					self.id_1 = now_id;
					img_1 = $(this).siblings('.list_content').find('img').attr('src');
					self.$box_1 = $checkboxOn.show();

					$phoneCompare.find('img').eq(0).attr('src', img_1).show();
				} else {
					self.id_2 = now_id;
					img_2 = $(this).siblings('.list_content').find('img').attr('src');
					self.$box_2 = $checkboxOn.show();
					$phoneCompare.find('img').eq(1).attr('src', img_2).show();

					self.noChoose($phoneList);
					
					$phoneCompare.find('.compare_go').attr('href', WWW_HOST + 'data/detail/' + self.id_1 + '?compid=' + self.id_2);
				}

			}  else {
				return false;
			}
		});

		//点击对比框的删除
		$phoneCompare.on('click', 'ul li', function(){
			var _index = $(this).index();

			if( _index == 0 && self.id_1 ){
				cancelCompare(_index);	
			} else if( _index == 1 && self.id_2 ){
				cancelCompare(_index);	
				$(this).find('.compare_del').hide();
			}
		});

		$phoneCompare.on('mouseenter', 'ul li', function(){
			var _index = $(this).index();
			if( _index == 0 && self.id_1 ){
				$(this).find('.compare_del').show();
			} else if( _index == 1 && self.id_2 ) {
				$(this).find('.compare_del').show();
			}
		});
		$phoneCompare.on('mouseleave', 'ul li', function(){
			var _index = $(this).index();
			$(this).find('.compare_del').hide();
		});
	}
})
	
