<?
	//var_dump($mobile);die;
			$compMobileId = $mobile['compId'];
			$compColorId = $mobile['compCid'];

			//$compColorRgb = $compColor[0]['color_rgb'];

			$currMobileId = $mobile['id'];
			$currColorId = $mobile['colorid'];
			//$currColorRgb = $val['color_rgb'];
?>

<div class="tools_head post_surface_head">
	<div class="head_icon tool_icons"></div>
	<span class="head_title">结构&外观</span>
	<ul class="head_tabs clear">
		<li class="p_show360 active" data-tab="show360"><span>360°展示</span></li>
		<li class="p_singleHand" data-tab="singleHand"><span>单手易用性</span></li>
		<li class="p_unbox" data-tab="unbox"><span>开箱动画</span></li>
		<li class="p_parts" data-tab="parts"><span>局部特写</span></li>
	</ul>
	<div class="head_loading"></div>
	<div class="head_right_icon new_icons"></div>
</div>

<div class="tools_wrap surface_tools_wrap J_surface_tools_wrap">
	<div class="wrap_tab wrap_tab_show360 surface_tabItem active clear">
		<div class="wrap_left J_wrap_left wrap_curr_left">
			<div class="pic_0 J_pic_0 opt_0"></div>
			<div class="score_wrap current">
				<div class="score">
					<span class="right_currPhone tool_icons tool_currPhone">{$mobile['name']}</span>
					<div class="score_num current">0.0</div>
					<div class="score_bar">
						<div class="total_num"><span style="color:#008cff; font-size: 13px;">0</span> 人</div>
						<div class="five J_five">
							<span class="text">0%</span>
							<span class="score_star tool_icons active first_star"></span>
							<span class="score_star tool_icons active"></span>
							<span class="score_star tool_icons active"></span>
							<span class="score_star tool_icons active"></span>
							<span class="score_star tool_icons active"></span>
						</div>
						<div class="four J_four">
							<span class="text">0%</span>
							<span class="score_star tool_icons active first_star"></span>
							<span class="score_star tool_icons active"></span>
							<span class="score_star tool_icons active"></span>
							<span class="score_star tool_icons active"></span>
						</div>
						<div class="three J_three">
							<span class="text">0%</span>
							<span class="score_star tool_icons active first_star"></span>
							<span class="score_star tool_icons active"></span>
							<span class="score_star tool_icons active"></span>
						</div>
						<div class="two J_two">
							<span class="text">0%</span>
							<span class="score_star tool_icons active first_star"></span>
							<span class="score_star tool_icons active"></span>
						</div>
						<div class="one J_one">
							<span class="text">0%</span>
							<span class="score_star tool_icons active first_star"></span>
						</div>
					</div>
				</div>
				|
				<div class="myscore">
					我的评分
					<span class="do_score do_score_curr" data-mobileid={$currMobileId} data-colorid={$currColorId}></span>
					<span class="process_tip current"></span>
				</div>
			</div>
		</div>

		<div class="wrap_right J_wrap_right surface_tabItem">
			<div class="pic_1 J_pic_1 opt_1"></div>
			<div class="score_wrap compare">
				<div class="score">
					<div class="tool_compare mobile_selector tool_compare360">
						{widget "selector", array('mobile' => $mobile, 'company' => $company)}
					</div>
					<div class="score_num compare">0.0</div>
					<div class="score_bar compare">
						<div class="total_num compare"><span style="color: #ffd200; font-size: 13px;">0</span> 人</div>
						<div class="five J_five">
							<span class="text">0%</span>
							<span class="score_star tool_icons comp_active first_star"></span>
							<span class="score_star tool_icons comp_active"></span>
							<span class="score_star tool_icons comp_active"></span>
							<span class="score_star tool_icons comp_active"></span>
							<span class="score_star tool_icons comp_active"></span>
						</div>
						<div class="four J_four">
							<span class="text">0%</span>
							<span class="score_star tool_icons comp_active first_star"></span>
							<span class="score_star tool_icons comp_active"></span>
							<span class="score_star tool_icons comp_active"></span>
							<span class="score_star tool_icons comp_active"></span>
						</div>
						<div class="three J_three">
							<span class="text">0%</span>
							<span class="score_star tool_icons comp_active first_star"></span>
							<span class="score_star tool_icons comp_active"></span>
							<span class="score_star tool_icons comp_active"></span>
						</div>
						<div class="two J_two">
							<span class="text">0%</span>
							<span class="score_star tool_icons comp_active first_star"></span>
							<span class="score_star tool_icons comp_active"></span>
						</div>
						<div class="one J_one">
							<span class="text">0%</span>
							<span class="score_star tool_icons comp_active first_star"></span>
						</div>
					</div>
				</div>
				|
				<div class="myscore">
					我的评分
					<span class="do_score do_score_comp" data-mobileid={$compMobileId} data-colorid={$compColorId}></span>
					<span class="process_tip compare"></span>
				</div>
			</div>
		</div>
	</div>
	<div class="wrap_tab wrap_tab_singleHand clear">
		<div class="J_wrap_left surface_tabItem">
			<div class="pic_0 J_pic_0 opt_0"></div>
			<div class="surface_itemBottom">
				<span class="right_currPhone tool_icons tool_currPhone">{$mobile['name']}</span>
			</div>
		</div>

		<div class="J_wrap_right surface_tabItem">
			<div class="pic_1 J_pic_1 opt_1"></div>
			<div class="tool_compare mobile_selector tool_compareSingle">
				{widget "selector", array('mobile' => $mobile, 'company' => $company)}
			</div>
		</div>
	</div>

	<div class="wrap_tab wrap_tab_unbox">
		<div class="wrap_unbox J_wrap_unbox">
			<div class="unbox_mask J_unbox_mask"></div>
			<div class="loading_logo"></div>
			<div class="loading_bar J_loading_bar">
				<span class="loading_text J_loading_text"></span>
				<div class="loading_process J_loading_process"></div>
			</div>
		</div>
	</div>
	<div class="wrap_tab wrap_tab_parts">
		<div class="wrap_parts J_wrap_parts clear">
			<img src="{_STATIC_HOST}libs/img/none.png" class="parts_bigPic" width="100%" height="100%" alt="none"/>
			<div class="items J_items">
				<a href="javascript:;" class="nav_prev tool_icons"></a>
				<div class="parts_dotWrap"></div>
				<a href="javascript:;" class="nav_next tool_icons"></a>
			</div>
		</div>
	</div>
</div>

<!--{scriptPool}-->
<script>
Z.use('data/surface');
</script>
<!--{/scriptPool}-->
