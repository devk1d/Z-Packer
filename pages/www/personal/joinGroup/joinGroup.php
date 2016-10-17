
<?
//var_dump($groupRecList);die;
if($isSelf) {
	$isSelfTxt = "我";
	$isSelfT = "您";
} else {
	$isSelfTxt = "他";
	$isSelfT = "他";
}?>		
<div class="joinGroup_wrap">
	
	<? if(!empty($joinGroupList['list'])) {
	//加入的小组	
		//var_dump($joinGroupList);die;	
	?>
	<h2>
		{$isSelfTxt}加入的小组
		<? if($isSelf) {
			$uid = '';	
			}
		?>
	</h2>
	<div class="join_groups clear">
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
	</div>
	<?if($joinGroupList['total_number'] > 6) {
		//var _max_page = Math.ceil(self.total_num/self.opts.count); //多请求了一次,加载更多
		$max_page = $joinGroupList['total_number'] / 6;	
	?>
		<div class="load_more_btn" data-uid="{$uid}" data-maxpage="{$max_page}">
			<span>加载更多</span>
			<div class="load_more_logo">
			</div>
		</div>
	<?}?>
	<?} 
	//elseif ($isSelf && !empty($groupRecList)){ 
	//推荐小组	 
		else {
	?>
	<h2>
		{$isSelfTxt}的小组
		<? if($isSelf) {
			$uid = '';	
			}
		?>
		<a href="{_PLUS_HOST}home/digital" target="_blank">查看全部 &gt;</a>	
	</h2>
	<div class="rec_groups clear">
		<div class="empty_title clear">
			{$isSelfT}
			还没有加入任何小组。为您推荐一些有意思的小组~ 
			<div class="tab_change">换一批</div>
		</div>	
		<div class="empty_con">
			<?
			foreach($groupRecList as $k => $value) {
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
							{=LibBase::substr($value['name'], 25, 25)}	
						</a>
						<div class="add_group">
							<?if($isSelf) {?>
								<a data-groupid="{$value['id']}" class="no_add" href="javascript:;" target="_blank">
									+ 加入小组 	
								</a>
								<a  data-groupid="{$value['id']}" class="unvisible yes_add" href="{_PLUS_HOST}group/{$value['id']}" target="_blank">
									进入小组 &gt; 
								</a>
							<?} else {?>
								<a  data-groupid="{$value['id']}" class="yes_add" href="{_PLUS_HOST}group/{$value['id']}" target="_blank">
									进入小组 &gt; 
								</a>
							<?}?>
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
		</div>
	</div>
	<?} 
	//else {
	//客态情况，显示记录为空	
	?>
</div>
<!--{scriptPool}-->
<script>
Z.use('personal/joinGroup');
</script>
<!--{/scriptPool}-->
