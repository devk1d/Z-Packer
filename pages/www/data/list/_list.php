<?  
//制作每个手机的对比条
//$arr 是每个对比手机（共三个），$str是对比内容
function makeTab($arr, $str, $key_company) {
	$html = '';
	foreach($arr as $key => $item_0){
		if( !empty($item_0) ){ 
			$left = intval($item_0[$str])/100 * 500;
			$style = ($key==1) ? 'color: #0087ff;' : '';

			//$company = empty($item_0['company']) ? '' : $key_company[$item_0['company']];
			$company = '';
			
			$name = $company.' '.$item_0['name'];
			
			$html = $html.	
				'<li class="clear">
					<p style="'.$style.'">'.$name.'</p>
					<div class="tab_process">
						<span style="left:'.$left.'px;"></span>
					</div>
					<span class="tab_percent">'.intval($item_0[$str]).'%</span>
				</li>';
		}
	}
	echo $html;
} 

foreach($phone as $key => $value){ ?>
	<li class="list_li">
		<div class="li_bg"></div>
		<div class="li_checkbox" data-id="{$value['id']}">
			<div class="checkbox_on list_icons"></div>
		</div>
		<div class="list_content">
			<a class="content_img" href="{_WWW_HOST}data/detail/{$value['id']}">
				<img src="{echo ImagesQcloud::image_url($value['cover'], 260, 0)}" />
				<span></span>
			</a>
		</div>
		<div class="list_configure">
			<h2>{$value['name']}</h2>

			<? 
			$o_price = intval($value['now_price']);
			if( !empty($o_price) ){ ?>
			<span class="configure_price">{$value['now_price']}</span>
			<span class="configure_price_logo">￥</span>

			<? } else { ?>
			<span class="configure_price">暂无报价</span>
			<? } ?>

			<p class="configure_sell">
			<? if( !empty($value['specs']) ){
				$data = explode('/', $value['specs']['selling_point']); ?>
			{=empty($data[0]) ? '' : $data[0]} {=empty($data[1]) ? '' : $data[1]}
			<? } ?>
			</p>
			<ul class="configure_content">
			<? if( !empty($value['specs']) ){ 
				$specs = $value['specs']; ?>
				<li style="width:300px;">
					<p>主屏幕尺寸：{$specs['inch']} 英寸 {$specs['resolution']} 像素</p>
					<p>网络类型：
						<? $mobile = LibBase::changeMobileNetwork( $specs['sim_one_chinamobile'] );  
						$unicom = LibBase::changeMobileNetwork( $specs['sim_one_chinaunicom'] );  
						$telecom = LibBase::changeMobileNetwork( $specs['sim_one_chinatelecom'] ); 
						$all = $mobile.' '.$unicom.' '.$telecom;
						echo LibBase::substr($all, 25, 25); ?>
					</p>
					<p>CPU 型号：
					<? $cpu = preg_replace( '/（(.*)）/', '', $specs['cpu']);
					echo LibBase::substr($cpu, 25, 25); ?>
					</p>
				</li>
				<li style="width:200px;">
					<p>后置摄像头：{$specs['camera_pixels']}万像素</p>
					<p>前置摄像头：{$specs['front_camera_pixels']}万像素</p>
					<p>电池容量：{$specs['battery_capacity']}</p>
				</li>
				<li>
					<p>上市时间：{$value['release_date']}</p>
					<p>RAM容量：{$specs['ram']}</p>
					<p>操作系统：{=empty($value['company']) ? '无' : $key_system[$value['system']]}</p>
				</li>
				<li class="content_more">
					<p>&nbsp;</p>
					<p>&nbsp;</p>
					<p><a href="{_WWW_HOST}data/detail/{$value['id']}">更多参数 ></a></p>
				</li>
			<? } ?>
			</ul>
		</div>

		<div class="list_compare">
			<div class="compare_btn">
				<ul class="clear">
					<li class="active">续航</li>
					<? if(false){ ?>
					<li>性能</li>
					<? } ?>
					<li>拍照</li>
				</ul>
			</div>

			<ul class="compare_tab" style="display: block;">
				<? $arr = [$value['battery_score_contrast'][0], $value, $value['battery_score_contrast'][1]];
				makeTab($arr, 'battery_score', $key_company); ?>
			</ul>
			
			<? if(false){ ?>
			<ul class="compare_tab">
				<? $arr = [$value['system_score_contrast'][0], $value, $value['system_score_contrast'][1]];
				makeTab($arr, 'system_score', $key_company); ?>
			</ul>
			<? } ?>
			
			<ul class="compare_tab">
				<? $arr = [$value['camera_score_contrast'][0], $value, $value['camera_score_contrast'][1]];
				makeTab($arr, 'camera_score', $key_company); ?>
			</ul>
		</div>
	</li>
<? } ?>
