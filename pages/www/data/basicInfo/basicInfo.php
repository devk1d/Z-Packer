<? $select = 'yes'; ?>

<div class="basicInfo_header">
	<span class="header_bg new_icons"><a href="/data/list">手机</a></span>
	<? if(false){ ?>
	<span><a href="/data/list/{$basicData['company']}">{$basicData['company_name']}</a></span>	
	<? } ?>
	<span>{$basicData['name']}</span>	
	<div class="header_choose">
		<span style="float:left;">选择对比机型</span>
		<div class="tool_compare" data-switch="1">
			{widget "selector", array('company' => $company, 'mobile' => $mobile, 'select' => $select)}
		</div>
	</div>
</div>

<div class="detail_basicInfo">
	
	<div class="basicInfo_left">
		<div class="left_wrap colorImgWrap">
			<? foreach($cover['list'] as $key => $val) { 
				if( $key > 0 ){
					break;
				}?>
			<img class="left_phoneImg {=($key == 0 ? 'active' : '')}" src="{echo ImagesQcloud::image_url($val['cover'], 340, 340)}" />
			<? } ?>
		</div>
		<div class="left_os">*基于 {$specs[0]['os_version']} 固件测试</div>
		<div class="left_bottom colorSelector">
			<? foreach($cover['list'] as $key => $val) {
				if($key == 0) {
					$currMobileId = $val['mobile_id'];
					$currColorId = $val['id'];
					$currColorRgb = $val['color_rgb'];
				} ?>
			<!-- 颜色选择暂时不上 -->	
			<span class="{=($key == 0 ? 'active' : '')}" style="background: {=('#'.$val['color_rgb'])}" data-id={$val['mobile_id']} data-cid={$val['id']}></span>
			<? } ?>
		</div>
	</div>
	<div class="basicInfo_right">
		<div class="right_wrap">
			<div class="" id="basicInfo_sevenStar"style="width: 400px; height: 400px; margin: 0 auto"></div>
			<div class="star_point"></div>
		</div>
		<div class="right_phone">
			<span class="curr_name">
				<span class="name_show">{$basicData['name']}</span>
				<span class="name_point"></span>
			</span>
			<span class="comp_name">
				<span class="name_point"></span>
				<span class="name_show">{$mobile['compName']}</span>
			</span>
		</div>

		<!--暂时不上的部分-->
		<? if(false) { ?>
		<div class="right_bottom">
			<div class='tool_current'>
				<div class="curr_colorWrap basic_colorSel">
					<span class="curr_defaultColor defaultColor {=(count($cover['list']) <= 1 ? 'unclickable' : '')}" style="background: {=('#'.$currColorRgb)}"></span>
					<div class="curr_colorSel colorSel">
					<?foreach($cover['list'] as $key => $val) {?>
						<span class="{=($key == 0 ? 'active' : '')} color_selItem" style="background: {=('#'.$val['color_rgb'])}" data-id={$val['mobile_id']} data-cid={$val['id']} data-rgb={$val['color_rgb']} data-type='curr'></span>
					<?}?>
					</div>
				</div>
			</div>
			
			<div class="comp_colorWrap basic_colorSel">
				<span class="comp_defaultColor defaultColor" style="background: {=('#'.$mobile['compCid'])}"></span>
				<!-- 颜色区分第一版不上 -->
				<?if(false) {?>
				<div class="comp_colorSel colorSel">
				<?
				//var_dump($contrastList['contrast']['list']);die;
				foreach($compColor as $key => $val) {
				?>
					<span class="{=($key == 0 ? 'active' : '')} color_selItem" style="background: {=('#'.$val['color_rgb'])}" data-id={$compMobileId} data-cid={$val['color_id']} data-rgb={$val['color_rgb']} data-type='comp'></span>
				<?}?>
				</div>
				<?}?>
			</div>
		</div>
		<? } ?>
	</div>
</div>

<!--{scriptPool}-->
<script>
Z.use('data/basicInfo');
</script>
<!--{/scriptPool}-->
