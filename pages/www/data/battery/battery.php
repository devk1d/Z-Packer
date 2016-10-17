
<!-- 续航  -->
<div class="tools_head post_battery_head">
	<div class="head_icon tool_icons"></div>
	<span class="head_title">电池续航</span>
	<ul class="head_tabs clear">
		<li class="battery_5h active" data-tab="5h"><span>5小时续航</span></li>
		<li class="battery_8h" data-tab="8h"><span>8小时待机</span></li>
		<li class="battery_charge" data-tab="charge"><span>充电</span></li>
	</ul>
	<div class="head_loading"></div>
	<div class="head_right_icon new_icons"></div>
</div>
<? $no_support = '*你的浏览器不支持该功能。'; ?>

<div class="tools_wrap battery_tools_wrap">
	<div class="battery_5h_wrap wrap_tab wrap_tab_5h active">
		<a href="javascript:;" class="batt_tip tool_icons"></a>
		<div class="batt_tip_content">纵轴表示 5h 续航测试包含的测试<br>项，以及该测试项在 30mins 中消<br>耗电量的百分比。</div>
		<div class="battery_current_wrap">
			<div class="current_scale"></div>
			<div class="current_data">

			<canvas class="batt_clock" id="curr_5hClock" width="110" height="110">{$no_support}</canvas>
			<!--
				<div class="batt_timer batt_5htimer">05:00</div>
				-->
				<div class="battery_battery">
					<div class="batt_top"></div>
					<div class="batt_body">
						<div class="batt_leftWrap">
							<div class="batt_used"></div>
						</div>
					</div>
				</div>
				<div class="batt_resultLeft curr_5hLeft"></div>
			</div>
			<div class="tool_icons tool_currPhone">{echo $mobile['name']}</div>
		</div>
		<div class="battery_compare_wrap">
			<div class="compare_scale"></div>
			<div class="compare_data">
				<canvas class="batt_clock" id="comp_5hClock" width="110" height="110">{$no_support}</canvas>
				<div class="battery_battery">
					<div class="batt_top"></div>
					<div class="batt_body">
						<div class="batt_leftWrap">
							<div class="batt_used"></div>
						</div>
					</div>
				</div>
				<div class="batt_resultLeft comp_5hLeft"></div>
			</div>
			<div class="tool_compare mobile_selector tool_compare5h">
				{widget "selector", array('mobile' => $mobile, 'company' => $company)}
			</div>
		</div>
	</div>

	<div class="battery_8h_wrap wrap_tab wrap_tab_8h clear">
		<div class="battery_current_wrap">
			<div class="current_scale"></div>
			<div class="current_data">
				<canvas class="batt_clock" id="curr_8hClock" width="110" height="110">{$no_support}</canvas>
				<div class="battery_battery">
					<div class="batt_top"></div>
					<div class="batt_body">
						<div class="batt_leftWrap">
							<div class="batt_used"></div>
						</div>
					</div>
				</div>
				<div class="batt_resultLeft curr_8hLeft"></div>
			</div>
			<div class="tool_icons tool_currPhone">{echo $mobile['name']}</div>
		</div>
		<div class="battery_compare_wrap">
			<div class="compare_scale"></div>
			<div class="compare_data">
				<canvas class="batt_clock" id="comp_8hClock" width="110" height="110">{$no_support}</canvas>
				<div class="battery_battery">
					<div class="batt_top"></div>
					<div class="batt_body">
						<div class="batt_leftWrap">
							<div class="batt_used"></div>
						</div>
					</div>
					<div class="batt_resultLeft comp_8hLeft"></div>
				</div>
			</div>
			<div class="tool_compare mobile_selector tool_compare8h">
				{widget "selector", array('mobile' => $mobile, 'company' => $company)}
			</div>
		</div>
	</div>

	<div class="battery_charge_wrap wrap_tab wrap_tab_charge">
		<div class="battery_current_wrap battery_wrap">
			<div class="current_scale"></div>
			<div class="current_data">
				<div class="current_dataY batt_dataY">
					<span class="batt_data curr_life"></span>
				</div>
				<canvas class="batt_clock" id="curr_chargeClock" width="110" height="110">{$no_support}</canvas>
				<div class="battery_battery">
					<div class="batt_top"></div>
					<div class="batt_body">
						<div class="tool_icons charge_icon"></div>
						<div class="batt_leftWrap">
							<div class="batt_used"></div>
							<div class="batt_left"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="tool_icons tool_currPhone">{echo $mobile['name']}</div>
		</div>
		<div class="battery_compare_wrap battery_wrap">
			<div class="compare_scale"></div>
			<div class="compare_data">
				<div class="compare_dataY batt_dataY">
					<span class="batt_data comp_life"></span>
				</div>
				<canvas class="batt_clock" id="comp_chageClock" width="110" height="110">{$no_support}</canvas>
				<div class="battery_battery">
					<div class="batt_top"></div>
					<div class="batt_body">
						<div class="tool_icons charge_icon"></div>
						<div class="batt_leftWrap">
							<div class="batt_used"></div>
							<div class="batt_left"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="tool_compare mobile_selector tool_compareCharge">
				{widget "selector", array('mobile' => $mobile, 'company' => $company)}
			</div>
		</div>
	</div>
</div>

<!--{scriptPool}-->
<script>
Z.use('data/battery');
</script>
<!--{/scriptPool}-->
