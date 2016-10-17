
		<?
		foreach ($joinGroupList['list'] as $key => $value) {  
			$css = "";	
			if(($key != 0) && (($key+1)%3 == 0)) {
				$css = 'rightNo'; 
			}			
		?>
		<a href="{_PLUS_HOST}group/{$value['id']}" target="_blank" class="{$css} group_{$key} clear">
			<? if($value['cover']) { ?>
				<img class="group_pic" src="{echo ImagesQcloud::image_url($value['cover'], 55, 55)}" />
			<? } else {?>
				<img class="group_pic" src="{_STATIC_HOST}images/plus/group_icon.png" class="group_portrait">
			<? } ?>
			<span class="group_name">
				{=LibBase::substr($value['name'], 12, 12)}	
			</span>
			<?if($value['is_chargeman'] == 'Y') {?>
				<div class="group_charge">组长</div>
			<?}?>
		</a>
		<?}?>
