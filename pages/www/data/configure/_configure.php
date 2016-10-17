<? 
if( !empty($list) ){
	$current = $list[0][0];
	$other = $list[1][0];
	
	//针对媒体内容的'等'字
	function mediaElse($arr){
		foreach ($arr as $key => $value) { 
			if( $key == 0 || trim($value) == '等' ){
				echo $value;
			} else {
				echo '/'.$value;
			}
		}
	}

	//SIM卡规格处理
	function simShow($sim){
		$show = ( empty($sim) || $sim == '无' || $sim == '不支持' ) ? '/' : $sim;
		return $show;
	} 
	//sim卡隐藏相同项
	function sameNone($sim1, $sim2){
		$sim_1 = simShow($sim1);
		$sim_2 = simShow($sim2);
		if( $sim_1 != '/' || $sim_2 != '/' ){
			$show = '<dd>'.
						'<span class="des_center">&nbsp;</span>'.
						'<span class="des_left">'.$sim_1.'</span>'.
						'<span class="des_right">'.$sim_2.'</span>'.
					'</dd>';
		} else {
			$show = '';
		}
		echo $show;
	}
?>
<div class="compare_show">
	<dl>
		<dt>上市日期</dt>
		<dd>
			<span class="des_center">&nbsp;</span>
			<span class="des_left">{$current['release_date']}</span>
			<span class="des_right">{$other['release_date']}</span>
		</dd>
	</dl>
	<dl>
		<dt>尺寸与重量</dt>
		<dd>
			<span class="des_center">长度</span>
			<span class="des_left">{$current['height']}mm</span>
			<span class="des_right">{$other['height']}mm</span>
		</dd>
		<dd>
			<span class="des_center">宽度</span>
			<span class="des_left">{$current['width']}mm</span>
			<span class="des_right">{$other['width']}mm</span>
		</dd>
		<dd>
			<span class="des_center">厚度</span>
			<span class="des_left">{$current['thickness']}mm</span>
			<span class="des_right">{$other['thickness']}mm</span>
		</dd>
		<dd>
			<span class="des_center">重量</span>
			<span class="des_left">{$current['weight']}g</span>
			<span class="des_right">{$other['weight']}g</span>
		</dd>
	</dl>
	<dl>
		<dt>屏幕</dt>
		<dd>
			<span class="des_center">尺寸</span>
			<span class="des_left">{$current['inch']}英寸</span>
			<span class="des_right">{$other['inch']}英寸</span>
		</dd>
		<dd>
			<span class="des_center">分辨率</span>
			<span class="des_left">{$current['resolution']}</span>
			<span class="des_right">{$other['resolution']}</span>
		</dd>
		<dd>
			<span class="des_center">PPI</span>
			<span class="des_left">{$current['ppi']}</span>
			<span class="des_right">{$other['ppi']}</span>
		</dd>
		<dd>
			<span class="des_center">屏幕材质</span>
			<span class="des_left">{$current['material']}</span>
			<span class="des_right">{$other['material']}</span>
		</dd>
		<dd>
			<span class="des_center">触摸屏工艺</span>
			<span class="des_left">{$current['technics']}</span>
			<span class="des_right">{$other['technics']}</span>
		</dd>
		<dd>
			<span class="des_center">边框宽度</span>
			<span class="des_left">{$current['border_width']}mm</span>
			<span class="des_right">{$other['border_width']}mm</span>
		</dd>
		<dd>
			<span class="des_center">屏占比</span>
			<span class="des_left">{$current['screen_proportion']}%</span>
			<span class="des_right">{$other['screen_proportion']}%</span>
		</dd>
	</dl>
	<dl>
		<dt>主摄像头</dt>
		<dd>
			<span class="des_center">像素</span>
			<span class="des_left">{$current['camera_pixels']}万像素</span>
			<span class="des_right">{$other['camera_pixels']}万像素</span>
		</dd>
		<dd>
			<span class="des_center">镜头玻璃材质</span>
			<span class="des_left">{$current['camera_material']}</span>
			<span class="des_right">{$other['camera_material']}</span>
		</dd>
		<dd>
			<span class="des_center">光圈大小</span>
			<span class="des_left">{=($current['camera_aperture'] == '—') ? '—' : 'f/'.$current['camera_aperture'].'光圈';}</span>
			<span class="des_right">{=($other['camera_aperture'] == '—') ? '—' : 'f/'.$other['camera_aperture'].'光圈';}</span>
		</dd>
		<!-- <dd style="display:none;">
			<span class="des_center">相机镜头</span>
			<span class="des_left">{$current['camera_lens']}</span>
			<span class="des_right">{$other['camera_lens']}</span>
		</dd>-->
		<dd>
			<span class="des_center">光学防抖</span>
			<span class="des_left">{$current['camera_shake']}</span>
			<span class="des_right">{$other['camera_shake']}</span>
		</dd>
		<dd>
			<span class="des_center">闪光灯</span>
			<span class="des_left">{$current['camera_flash']}</span>
			<span class="des_right">{$other['camera_flash']}</span>
		</dd>
		<dd>
			<span class="des_center">感光元件</span>
			<span class="des_left">{$current['camera_cmos']}</span>
			<span class="des_right">{$other['camera_cmos']}</span>
		</dd>
	</dl>
	<dl>
		<dt>前置摄像头</dt>
		<dd>
			<span class="des_center">像素</span>
			<span class="des_left">{=empty($current['front_camera_pixels']) ? '不支持' : $current['front_camera_pixels'].'万像素';}</span>
			<span class="des_left">{=empty($other['front_camera_pixels']) ? '不支持' : $other['front_camera_pixels'].'万像素';}</span>
		</dd>
		<dd>
			<span class="des_center">光圈大小</span>
			<span class="des_left">{=($current['front_camera_aperture'] == '—') ? '—' : 'f/'.$current['front_camera_aperture'].'光圈';}</span>
			<span class="des_right">{=($other['front_camera_aperture'] == '—') ? '—' : 'f/'.$other['front_camera_aperture'].'光圈';}</span>
		</dd>
	</dl>
	<dl>
		<dt>处理器与内存</dt>
		<dd>
			<span class="des_center">CPU</span>
			<span class="des_left">{$current['cpu']}</span>
			<span class="des_right">{$other['cpu']}</span>
		</dd>
		<dd>
			<span class="des_center">GPU</span>
			<span class="des_left">{$current['gpu']}</span>
			<span class="des_right">{$other['gpu']}</span>
		</dd>
		<dd>
			<span class="des_center">RAM</span>
			<span class="des_left">{$current['ram']}</span>
			<span class="des_right">{$other['ram']}</span>
		</dd>
		<dd>
			<span class="des_center">ROM</span>
			<span class="des_left">{$current['rom']}</span>
			<span class="des_right">{$other['rom']}</span>
		</dd>
	</dl>
	<dl>
		<dt>电池</dt>
		<dd>
			<span class="des_center">电池容量</span>
			<span class="des_left">{$current['battery_capacity']}</span>
			<span class="des_right">{$other['battery_capacity']}</span>
		</dd>
		<dd>
			<span class="des_center">电池类型</span>
			<span class="des_left">{$current['battery_type']}</span>
			<span class="des_right">{$other['battery_type']}</span>
		</dd>
		<dd>
			<span class="des_center">快速充电</span>
			<span class="des_left">{$current['battery_quick_charge']}</span>
			<span class="des_right">{$other['battery_quick_charge']}</span>
		</dd>
	</dl>
	<? $current_sim = LibBase::changeMobileSim($current['sim']); 
	$other_sim = LibBase::changeMobileSim($other['sim']); ?>
	<dl>
		<dt>SIM 卡1</dt>
		<dd>
			<span class="des_center">规格</span>
			<span class="des_left">{=empty($current_sim[0]) ? '不支持' : $current_sim[0];}</span>
			<span class="des_right">{=empty($other_sim[0]) ? '不支持' : $other_sim[0];}</span>
		</dd>
		<dd>
			<span class="des_center">网络制式</span>
			<span class="des_left">{$sim_1 =  simShow($current['sim_one_chinamobile']); }</span>
			<span class="des_right">{$sim_2 = simShow($other['sim_one_chinamobile']); }</span>
		</dd>
		<? sameNone($current['sim_one_chinaunicom'], $other['sim_one_chinaunicom']); 
		sameNone($current['sim_one_chinatelecom'], $other['sim_one_chinatelecom']); ?>

		<dt>SIM 卡2</dt>
		<dd>
			<span class="des_center">规格</span>
			<span class="des_left">{=isset($current_sim[1]) ? $current_sim[1] : '不支持';}</span>
			<span class="des_right">{=isset($other_sim[1]) ? $other_sim[1] : '不支持';}</span>
		</dd>
		<dd>
			<span class="des_center">网络制式</span>
			<span class="des_left">{$sim_1 = simShow($current['sim_tow_chinamobile']); }</span>
			<span class="des_right">{$sim_2 = simShow($other['sim_tow_chinamobile']); }</span>
		</dd>
		<? sameNone($current['sim_tow_chinaunicom'], $other['sim_tow_chinaunicom']); 
		sameNone($current['sim_tow_chinatelecom'], $other['sim_tow_chinatelecom']); ?>
	</dl>
	<dl>
		<dt>储存卡</span>
		<dd>
			<span class="des_center">&nbsp;</span>
			<span class="des_left">{$current['memory_card']}</span>
			<span class="des_right">{$other['memory_card']}</span>
		</dd>
	</dl>
	<dl>
		<dt>WLAN功能</span>
		<dd>
			<span class="des_center">&nbsp;</span>
			<span class="des_left">{$current['wlan']}</span>
			<span class="des_right">{$other['wlan']}</span>
		</dd>
		<!--<dd style="display:none;">
			<span class="des_center">&nbsp;</span>
			<span class="des_left">{$current['wlan_network']}</span>
			<span class="des_right">{$other['wlan_network']}</span>
		</dd>-->
	</dl>
	<?if(!empty($current['nfc']) || !empty($other['nfc'])) {?>
	<dl>
		<dt>NFC</dt>
		<dd>
			<span class="des_center">&nbsp;</span>
			<span class="des_left">{=empty($current['nfc']) ? '不支持' : $current['nfc'];}</span>
			<span class="des_right">{=empty($other['nfc']) ? '不支持' : $other['nfc'];}</span>
		</dd>
	</dl>
	<?}?>
	<dl>
		<dt>蓝牙</dt>
		<dd>
			<span class="des_center">&nbsp;</span>
			<span class="des_left">{$current['bluetooth']}</span>
			<span class="des_right">{$other['bluetooth']}</span>
		</dd>
	</dl>
	<dl>
		<dt>传感器</dt>
		<dd>
			<span class="des_center">&nbsp;</span>
			<div class="des_left">
			<? foreach ($current['sensor'] as $key => $value) { ?>
				<p class="arr_left">{$value}</p>
			<? } ?>
			</div>
			<div class="des_right">
			<? foreach ($other['sensor'] as $key => $value) { ?>
				<p class="arr_right">{$value}</p>
			<? } ?>
			</div>
		</dd>
	</dl>
	<dl>
		<dt>指纹识别</dt>
		<dd>
			<span class="des_center">解锁机制</span>
			<span class="des_left">{$current['unlock']}</span>
			<span class="des_right">{$other['unlock']}</span>
		</dd>
		<dd>
			<span class="des_center">位置</span>
			<span class="des_left">{$current['unlock_position']}</span>
			<span class="des_right">{$other['unlock_position']}</span>
		</dd>
	</dl>
	<dl>
		<dt>导航定位</dt>
		<dd>
			<span class="des_center">&nbsp;</span>
			<div class="des_left">
			<? foreach ($current['navigation'] as $key => $value) { ?>
				<p class="arr_left">{$value}</p>
			<? } ?>
			</div>
			<div class="des_right">
			<? foreach ($other['navigation'] as $key => $value) { ?>
				<p class="arr_right">{$value}</p>
			<? } ?>
			</div>
		</dd>
	</dl>
	<dl>
		<dt>多媒体</dt>
		<dd>
			<span class="des_center">视频</span>
			<span class="des_left">
			<? mediaElse($current['media_video']) ?>
			</span>
			<span class="des_right">
			<? mediaElse($other['media_video']) ?>
			</span>
		</dd>
		<dd>
			<span class="des_center">音频</span>
			<span class="des_left">
			<? mediaElse($current['media_audio']) ?>
			</span>
			<span class="des_right">
			<? mediaElse($other['media_audio']) ?>
			</span>
		</dd>
		<dd>
			<span class="des_center">图片</span>
			<span class="des_left">
			<? mediaElse($current['media_picture']) ?>
			</span>
			<span class="des_right">
			<? mediaElse($other['media_picture']) ?>
			</span>
		</dd>
	</dl>
	<dl>
		<dt>数据接口</dt>
		<dd>
			<span class="des_center">&nbsp;</span>
			<span class="des_left">{$current['data_interface']}</span>
			<span class="des_right">{$other['data_interface']}</span>
		</dd>
	</dl>
	<dl>
		<dt>附件</dt>
		<dd>
			<span class="des_center">&nbsp;</span>
			<div class="des_left">
			<? foreach ($current['accessories'] as $key => $value) { ?>
				<p class="arr_left">{$value}</p>
			<? } ?>
			</div>
			<div class="des_right">
			<? foreach ($other['accessories'] as $key => $value) { ?>
				<p class="arr_right">{$value}</p>
			<? } ?>
			</div>
		</dd>
	</dl>
	<dl>
		<dt>卖点</dt>
		<dd>
			<span class="des_center">&nbsp;</span>
			<span class="des_left">{$current['selling_point']}</span>
			<span class="des_right">{$other['selling_point']}</span>
		</dd>
	</dl>
	<dl>
		<dt>测试固件版本</dt>
		<dd>
			<span class="des_center">&nbsp;</span>
			<span class="des_left">{$current['system']}</span>
			<span class="des_right">{$other['system']}</span>
		</dd>
	</dl>
</div>
<? } ?>
