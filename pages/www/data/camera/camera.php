<!-- 相机  -->
<div class="tools_head post_camera_head">
	<div class="head_icon tool_icons"></div>
	<span class="head_title">相机成像</span>
	<ul class="head_tabs clear">
		<li class="camera_example active" data-tab="example"><span>样张对比</span></li>
		<li class="camera_shed" data-tab="shed"><span>棚拍对比</span></li>
		<!--
		<li class="camera_analyse" data-tab="analyse"><span>成像分析</span></li>
		-->
	</ul>
	<div class="head_loading"></div>
	<div class="head_right_icon new_icons"></div>
</div>

<div class="tools_wrap camera_tools_wrap">

	<div class="camera_chart_wrap wrap_tab wrap_tab_analyse" data-tab="analyse">
		<div class="chart_opt">
			<div class="type_select">
				<a href="javascript:;" class="photo_details active">解析力</a>
				<a href="javascript:;" class="noise_density" style="background-position:82px -896px;">噪点</a>
				<a href="javascript:;" class="color_performance" style="background-position:82px -852px;">色彩</a>
				<a href="javascript:;" class="exposure_value" style="background-position:82px -940px;">曝光</a>
			</div>
			
		</div>

		<div class="chart_pic_left chart_pic">
			<div class="pic_content camera_slide">
				<img src="jiexili_l.jpg" width="100%" height="100%" alt="解析力"/>
				<canvas></canvas>
				<div class="mask"></div>
			</div>
		</div>
		<div class="chart_pic_right chart_pic">
			<div class="pic_content camera_slide">
				<img src="jiexili_l.jpg" width="100%" height="100%" alt="解析力"/>
				<canvas></canvas>
				<div class="mask"></div>
			</div>
		</div>
		<div class="camera_chart">
			 <div class="line_chart"></div>
		</div>

		<div class="compare_two">
			<span class="data_icons tool_currPhone">{$mobile['name']}</span>
			<div class="tool_compare mobile_selector">
				{widget "selector", array('company' => $company, 'mobile' => $mobile)}
			</div>
		</div>

	</div>
	<div class="camera_compare_wrap wrap_tab wrap_tab_shed" data-tab="shed">
		<div class="light_select">
			<a href="javascript:;" class="light active" lux="light">明亮</a>
			<span class="light_line"></span>
			<a href="javascript:;" class="half" lux="half" style="background-position:60px -546px;">较暗</a>
			<span class="light_line"></span>
			<a href="javascript:;" class="weak" lux="weak" style="background-position:60px -595px;">弱光</a>
		</div>
		<div class="left_w">
			<div class="big_pic">
				<div class="handler">
				</div>
			</div>

			<div class="pic_1"></div>
			<div class="current_phone phone_exif">
				<span class="tool_currPhone tool_icons">{$mobile['name']}</span>
				<div class="exif current">Exif</div>
				<div class="detail detail1">
					<div class="system">Android 4.4</div>
					<div class="iso">200</div>
					<div class="aperture">F/2.2</div>
					<div class="wb">自动</div>
					<div class="shutter">1/640</div>
				</div>
				
			</div>
			<div class="pic_2"></div>
			<div class="other_phone phone_exif">

				<div class="tool_compare mobile_selector">
					{widget "selector", array('company' => $company, 'mobile' => $mobile)}
				</div>

				<div class="exif">Exif</div>
				<div class="detail detail2">
					<div class="system">Android 4.4</div>
					<div class="iso">200</div>
					<div class="aperture">F/2.2</div>
					<div class="wb">自动</div>
					<div class="shutter">1/640</div>
				</div>
			</div>
		</div>
	</div>
	<div class="real_pic_wrap wrap_tab wrap_tab_example active" data-tab="example">
		<div class="real_pic">
			<div class="pic_1">
				<a class="tip_icon">
				</a>
				<div class="exif detail">
					<div class="system"></div>
					<div class="iso"></div>
					<div class="aperture"></div>
					<div class="wb"></div>
					<div class="shutter"></div>
				</div>
			</div>
			<div class="pic_2">
				<a class="tip_icon">
				</a>
				<div class="exif detail">
					<div class="system"></div>
					<div class="iso"></div>
					<div class="aperture"></div>
					<div class="wb"></div>
					<div class="shutter"></div>
				</div>
			</div>
		</div>
		<div class="pic_nav">
			<a href="#" class="nav_prev">
			</a>
			<ul>
			</ul>
			<a href="#" class="nav_next">
			</a>
		</div>
		<div class="real_pic_detail">
			<div class="compare_two">
				<span class="tool_currPhone tool_icons">{$mobile['name']}</span>
				<a href="javascript:;" class="download dl_pic1"></a>
				<div class="tool_compare mobile_selector" style="width: 526px; padding-left:8px;">
					{widget "selector", array('company' => $company, 'mobile' => $mobile)}
					<a href="javascript:;" class="download dl_pic2" style="display:none;">原图下载</a>
					<a href="#" class="big_btn" >放大</a>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="big_real_pic_wrap">
	<div class="big_inner">
		<div class="big_real_pic">
			<div class="big_pic_1"><img width=100% height=100% alt="样张对比大图" /></div>
			<div class="big_pic_2"><img width=100% height=100% alt="样张对比大图" /></div>
		</div>
		<div class="real_pic_detail">
			<div class="compare_two">
				<span class="tool_currPhone tool_icons">{$mobile['name']}</span>
				<a href="javascript:;" class="download dl_pic1">原图下载</a>
				<div class="tool_compare mobile_selector">
					{widget "selector", array('company' => $company, 'mobile' => $mobile)}
					<a href="javascript:;" class="download dl_pic2">原图下载</a>
					<a href="#" class="resume_btn" >缩小</a>
				</div>
			</div>
		</div>
	</div>
</div>

<!--{scriptPool}-->
<script>
Z.use('data/camera');
</script>
<!--{/scriptPool}-->
