<!-- 参数, 前缀post_configure  -->
<? if(!empty($specs)){
	$list = $specs[0];
?>
<div class="tools_head post_configure_head">
	<div class="head_confIcon head_icon tool_icons"></div>
	<span class="head_title">配置参数</span>
	<!--
	<span>{$list['os_version']}</span>
	-->
	<div class="head_loading"></div>
	<div class="head_right_icon new_icons"></div>
</div>

<div class="tools_wrap post_configure_wrap J_post_configure_wrap">

	<? //暂不显示配置参数的概括	
		if( false ){ ?>
	<div class="wrap_info" >
		<dl>
			<dt class="tool_icons" style="background-position: 3px -2011px;"></dt>
			<dd>
				<p>长度&nbsp;&nbsp; {$list['height']}mm</p>
				<p>宽度&nbsp;&nbsp; {$list['width']}mm</p>
				<p>厚度&nbsp;&nbsp; {$list['thickness']}mm</p>
				<p>重量&nbsp;&nbsp; {$list['weight']}g</p>
			</dd>
		</dl>
		<dl>
			<dt class="tool_icons" style="height:103px; margin-top:-10px; background-position: 21px -2196px;"></dt>
			<dd>
				<p>尺寸&nbsp;&nbsp; {$list['inch']}英寸</p>
				<p>分辨率&nbsp;&nbsp; {$list['resolution']}（{$list['ppi']}PPI）</p>
				<p>屏幕材质&nbsp;&nbsp; {$list['material']}</p>
				<p>边框宽度&nbsp;&nbsp; {$list['border_width']}mm</p>
			</dd>
		</dl>
		<dl>
			<dt class="tool_icons" style="background-position: 21px -2398px;"></dt>
			<dd>
				<p>主摄像头&nbsp;&nbsp; {$list['camera_pixels']} 万像素</p>
				<p>光圈&nbsp;&nbsp; {=($list['camera_aperture'] == '—') ? $list['camera_aperture'] : 'f/'.$list['camera_aperture'].' 光圈';}</p>
				<p>前置摄像头&nbsp;&nbsp; {$list['front_camera_pixels']} 万像素</p>
				<p>光圈&nbsp;&nbsp; {=($list['front_camera_aperture'] == '—') ? $list['front_camera_aperture'] : 'f/'.$list['front_camera_aperture'].' 光圈';}</p>
			</dd>
		</dl>
		<dl>
			<dt class="tool_icons" style="background-position: 8px -3055px;"></dt>
			<dd>
				<p>CPU&nbsp;&nbsp; <?echo LibBase::substr($list['cpu'], 30, 28)?></p>
				<p>GPU&nbsp;&nbsp; {$list['gpu']}</p>
				<p>RAM&nbsp;&nbsp; {$list['ram']}</p>
				<p>ROM&nbsp;&nbsp; {$list['rom']}</p>
			</dd>
		</dl>
		<dl>
			<dt class="tool_icons" style="background-position: 23px -2846px;"></dt>
			<dd>
				<p>电池容量&nbsp;&nbsp; {$list['battery_capacity']}</p>
				<p>电池类型&nbsp;&nbsp; {$list['battery_type']}</p>
				<p>快速充电&nbsp;&nbsp; {$list['battery_quick_charge']}</p>
			</dd>
		</dl>
		<? function simShow($sim){
			$show = ( empty($sim) || $sim == '无' || $sim == '不支持' ) ? '/' : $sim;
			return $show;
		} ?>
		<dl>
			<dt class="tool_icons" style="width:95px; background-position: -2px -2627px;"></dt>
			<dd style="padding-top:8px;">
				<p>{$sim = simShow($list['sim_one_chinamobile']); }</p>
				<p>{$sim = simShow($list['sim_one_chinaunicom']); }</p>
				<p>{$sim = simShow($list['sim_one_chinatelecom']); }</p>
			</dd>
		</dl>
		<div class="info_more">
			<div class="tool_icons info_arrowIcon"></div>
		</div>
	</div>
	<? } ?>
	<div class="wrap_compare conf_compareMore">
		<div class="compare_two">
			<span class="data_icons tool_currPhone">{$list['mobile_phone']}</span>
			<div class="tool_compare">
				{widget "selector", array('mobile' => $mobile, 'company' => $company)}
			</div>
			<a href="javascript:;" class="hide_same">隐藏相同参数</a>
		</div>
		<div class="compare_configure"></div>
	</div>
</div>
<? } ?>
<!--{scriptPool}-->
<script>
Z.use('data/configure');
</script>
<!--{/scriptPool}-->
