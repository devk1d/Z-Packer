<!-- 屏幕 -->
<div class="tools_head post_screen_head">
	<div class="head_icon tool_icons"></div>
	<span class="head_title">显示效果</span>
	<ul class="head_tabs clear">
		<li class="temp_battery active" data-tab="inch"><span>尺寸</span></li>
		<li class="temp_charging" data-tab="light"><span>亮度</span></li>
		<li class="temp_weibo" data-tab="color"><span>色温</span></li>
		<li class="temp_game" data-tab="show"><span>显示效果</span></li>
	</ul>
	<div class="head_loading"></div>
	<div class="head_right_icon new_icons"></div>
</div>

<div class="tools_wrap screen_tools_wrap">
	<div class="wrap_tab wrap_tab_inch active" data-tab="inch">
		<div class="inch_left screen_way" style="margin-right:20px;">
			<a href="javascript:;" class="screen_tip tool_icons">i</a>
			<div class="screen_tip_content">PPI：每英寸下像素数。<br>PPI越高，画面显示越细腻，<br>400PPI以上为佳。
			</div>
			<div class="left_content way_content">
				<div class="content_width">
					<div>1080</div>
				</div>
				<div class="content_height">
					<div>1920</div>
				</div>
				<div class="content_detail">
					<p style="font-size:18px;">5.00</p>
					<p>441PPI</p>
				</div>
			</div>
			<span class="tool_icons tool_currPhone">{$mobile['name']}</span>
		</div>
		<div class="inch_right screen_way">
			<div class="right_content way_content">
				<div class="content_width">
					<div>1080</div>
				</div>
				<div class="content_height">
					<div>1920</div>
				</div>
				<div class="content_detail">
					<p style="font-size:18px;">5.00</p>
					<p>441PPI</p>
				</div>
			</div>
			<div class="tool_compare">
				{widget "selector", array('company' => $company, 'mobile' => $mobile)}
			</div>
		</div>
	</div>	
	<div class="wrap_tab wrap_tab_light" data-id="light">
		<div class="light_left screen_way" style="margin-right:20px;">
			<a href="javascript:;" class="screen_tip tool_icons">i</a>
			<div class="screen_tip_content">亮度：纯白画面最大亮度，<br>理论上越高越好。最大亮度或<br>瞬时亮度在500nits以上为佳。<br>
			</div>

			<div class="pic_content">
				<div class="mask"></div>
			</div>
			<span class="tool_icons tool_currPhone">{$mobile['name']}</span>
		</div>
		<div class="light_right screen_way" style="float:right">
			<div class="pic_content">
				<div class="mask"></div>
			</div>
			<div class="tool_compare">
				{widget "selector", array('company' => $company, 'mobile' => $mobile)}
			</div>
		</div>
	</div>	
	<div class="wrap_tab wrap_tab_color" data-tab="color">
		<div class="color_left screen_way" style="margin-right:20px;">
			<a href="javascript:;" class="screen_tip tool_icons">i</a>
			<div class="screen_tip_content">色温：白点色温，高则偏冷，<br>低则偏暖。推荐区域6750K-7750K。<br>图为色温示例，仅供参考。<br>
			</div>

			<div class="pic_content">
				<div class="color_bg color_origin"></div>
				<div class="color_bg color_cold"></div>
				<div class="color_bg color_warm"></div>
			</div>
			<span class="tool_icons tool_currPhone">{$mobile['name']}</span>
		</div>
		<div class="color_right screen_way" style="float:right">
			<div class="pic_content">
				<div class="color_bg color_origin"></div>
				<div class="color_bg color_cold"></div>
				<div class="color_bg color_warm"></div>
			</div>
			<div class="tool_compare">
				{widget "selector", array('company' => $company, 'mobile' => $mobile)}
			</div>
		</div>
	</div>	
	<? 
	//canvas的getimagedata不允许跨域请求图片（即使是子域也不行）。该方法把图片内容转成字符串再塞到img标签里解决跨域问题
	$pic = STATIC_HOST . "images/thescream.jpg"; 
	$arr = getimagesize($pic);
	$opic = "data:".$arr['mime'].";base64,".base64_encode(file_get_contents($pic));
	?>
	<div class="wrap_tab wrap_tab_show" data-tab="show">
		<div class="show_left screen_way" style="margin-right:20px;">
			<a href="javascript:;" class="screen_tip tool_icons">i</a>
			<div class="screen_tip_content">色彩还原：屏幕显示各种颜色时的<br>色彩准确度，理论上还原度越高越好。
			</div>

			<div class="pic_content">
				<img src="<?php echo $opic ?>" id="img1" />
				<!--<canvas width="290" height="500" id="canvas1"></canvas>
				<div id="div1"></div>
				<button id="btn" style="position:absolute; z-index:100;">start</button>-->
				<canvas width="290" height="500">不好意思，你的浏览器版本不支持该项功能</canvas>
			</div>
			<span class="tool_icons tool_currPhone">{$mobile['name']}</span>
		</div>
		<div class="show_right screen_way" style="float:right">
			<div class="pic_content">
				<img src="<?php echo $opic ?>" />
				<canvas width="290" height="500">不好意思，你的浏览器版本不支持该项功能</canvas>
			</div>
			<div class="tool_compare">
				{widget "selector", array('company' => $company, 'mobile' => $mobile)}
			</div>
		</div>
	</div>	
</div>

<!--{scriptPool}-->
<script>
Z.use('data/screen');
</script>
<!--{/scriptPool}-->
