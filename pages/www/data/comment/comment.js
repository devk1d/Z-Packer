
// ZEALER 点评
Z.define('data/comment', {
	initialize: function() {
		var self = this;
		self.data = {current: {}, compare: {}};

		self.$container = $('.J_comment_tools_wrap');
		self.$head = $('.post_comment_head');
		self.select = Z.require('data/tools').select;

		$.post('/data/commentShow', {id: 26}, function(json) {
			if(json.status == 200) {
				self.$container.data('done', true);

				$.each(json.message, function(index, item) {
					if(item.type === 'nice') {
						self.data.current.nice = item.content;
					} else if(item.type === 'bad') {
						self.data.current.bad = item.content;
					} else if(item.type === 'summary') {
						self.data.current.summary = item.content;
					} 
				});

				self.$container.find('.curr_niceContent').text(self.data.current.nice);
				self.$container.find('.curr_badContent').text(self.data.current.bad);
				self.$container.find('.curr_summContent').text(self.data.current.summary);

				if(self.$head.hasClass('active')) {
					self.$head.trigger('click');
				}
			}
		}, 'json')

		self.setCompareData(26, 'isFirst');

		//机型比较
		this.phoneSelector = new self.select({
			dom: self.$container.find('.tool_compare'),
			defaultKey: '选择对比机型',
			onClick: function(e, dom) {
				var compId = $(dom).data('id');
				self.setCompareData(compId);
			}
		});

		this.$container.on('init', function() {
			$(this).off('init');
		});
	},

	setCompareData: function(phoneId) {
		var self = this;
		var $compContent = self.$container.find('.zComment_compare .zComment_content');
		
		$compContent.html('');
		F.loading($compContent, 'white');
		$.post('/data/commentShow', {id: phoneId}, function(json) {
			if(json.status == 200) {
				$.each(json.message, function(index, item) {
					if(item.type === 'nice') {
						self.data.compare.nice = item.content;
					} else if(item.type === 'bad') {
						self.data.compare.bad = item.content;
					} else if(item.type === 'summary') {
						self.data.compare.summary = item.content;
					} 
				});
				F.unloading($compContent);
				self.$container.find('.comp_niceContent').text(self.data.compare.nice);
				self.$container.find('.comp_badContent').text(self.data.compare.bad);
				self.$container.find('.comp_summContent').text(self.data.compare.summary);
			}
		}, 'json')
	}
});
