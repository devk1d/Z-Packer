<!-- 温度  -->
<div class="tools_head post_temp_head">
	<div class="head_icon tool_icons"></div>
	<span class="head_title">发热控制</span>
	<ul class="head_tabs clear">
		<li class="temp_battery active" data-tab="battery"><span>5小时续航发热</span></li>
		<li class="temp_charging" data-tab="charging"><span>充电发热</span></li>
		<li class="temp_weibo" data-tab="weibo"><span>微博发热</span></li>
		<li class="temp_game" data-tab="game"><span>游戏发热</span></li>
	</ul>
	<div class="head_loading"></div>
	<div class="head_right_icon new_icons"></div>
</div>

<div class="tools_wrap temp_tools_wrap">
	
	<div class="left_sidebar">
		<div class="face_choose face_1 tool_icons active" face='front'>正面</div>
		<div class="face_choose tool_icons face_2" face='back'>反面</div>
	</div>
	<div class="temp_pic">
		<div class="pic_1">
			<div class="pic_wrap">
			</div>
			<div class="pic_tip">
			</div>
		</div>
		<div class="pic_2">
			<div class="pic_wrap">
			</div>
			<div class="pic_tip">
			</div>
		</div>
	</div>

	<div class="wrap_tab wrap_tab_battery active">
		<div class="temp_chart line_chart"></div>
		<div class="compare_two">
			<span class="tool_icons tool_currPhone">{$mobile['name']}</span>
			<div class="tool_compare">
				{widget "selector", array('company' => $company, 'mobile' => $mobile)}
			</div>
		</div>

	</div>
	<div class="wrap_tab wrap_tab_charging">
		<div class="temp_chart line_chart"></div>
		<div class="compare_two">
			<span class="tool_icons tool_currPhone">{$mobile['name']}</span>
			<div class="tool_compare">
				{widget "selector", array('company' => $company, 'mobile' => $mobile)}
			</div>
		</div>
	</div>
	<div class="wrap_tab wrap_tab_weibo">
		<div class="temp_chart line_chart"></div>
		<div class="compare_two">
			<span class="tool_icons tool_currPhone">{$mobile['name']}</span>
			<div class="tool_compare">
				{widget "selector", array('company' => $company, 'mobile' => $mobile)}
			</div>
		</div>
	</div>
	<div class="wrap_tab wrap_tab_game">
		<div class="temp_chart line_chart"></div>
		<div class="compare_two">
			<span class="tool_icons tool_currPhone">{$mobile['name']}</span>
			<div class="tool_compare">
				{widget "selector", array('company' => $company, 'mobile' => $mobile)}
			</div>
		</div>
	</div>
</div>

<!--{scriptPool}-->
<script>
Z.use('data/temp');
</script>
<!--{/scriptPool}-->
