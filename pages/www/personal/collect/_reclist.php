
			<? 
				//var_dump($list);die;
				foreach ($list as $key => $value) {  
			?>	
			<a href="{_PLUS_HOST}post/{$value['id']}.html" target="_blank">
				<span class="title">
					{=LibBase::substr($value['title'], 62, 62)}	
				</span>
				<span class="collect_time">
					<span class="collect_logo">
					</span>	
						{$value['follow_num']}	
				</span>
			</a>
			<?}?>
			<div class="" style="border-bottom: 1px solid #e5e6e8; margin-top: 10px;"></div>
