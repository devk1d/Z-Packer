
			<?
			foreach($list as $k => $value) {
				$css = "";	
				if(($k != 0) && (($k+1)%2 == 0)) {
					$css = 'rightNo'; 
				}			
			?>
			<div class="rec_item {$css} clear">
				<div class="group_img clear">
					<a href="{_PLUS_HOST}group/{$value['id']}" target="_blank">
						<? if($value['cover']) { ?>
							<img src="{echo ImagesQcloud::image_url($value['cover'], 55, 55)}" />
						<? } else {?>
							<img src="{_STATIC_HOST}images/plus/group_icon.png" class="group_portrait">
						<? } ?>
					</a>
				</div>
				
				<div class="group_info clear">
						
					<div class="rec_title">
						<a  class="rec_title_name" href="{_PLUS_HOST}group/{$value['id']}" target="_blank">
							{=LibBase::substr($value['name'], 35, 35)}	
						</a>
						<div class="add_group">
							<a data-groupid="{$value['id']}" class="no_add" href="javascript:;" target="_blank">
								+ 加入小组 	
							</a>
							<a  data-groupid="{$value['id']}" class="unvisible yes_add" href="{_PLUS_HOST}group/{$value['id']}" target="_blank">
								进入小组 &gt; 
							</a>
						</div>
					</div>	
					
					<div class="rec_info">
						<a href="{_PLUS_HOST}group/{$value['id']}" target="_blank">
							<span class="group_num global_nums ">{$value['user_total']}</span><span>人聚集在此</span>
							<span class="group_post global_nums ">{$value['thread_total']}</span><span> 帖子</span>
						</a>
					</div>	
					
				</div>

				<div class ="group_des">
					<a href="{_PLUS_HOST}group/{$value['id']}" target="_blank">
						{=LibBase::substr($value['description'], 72, 72)}	
					</a>	
				</div>
			</div>
			<?}?>
