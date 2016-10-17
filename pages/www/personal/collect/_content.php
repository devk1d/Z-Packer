<?
//var_dump($collectList);die;
if($isSelf) {
	$isSelfTxt = "我";
	$uid = "";
} else {
	$isSelfTxt = "他";
}?>		
<div class="collect_wrap collect_all_wrap" >
	<h2>
		{$isSelfTxt}的收藏
		<a class="" href="/personal/{$uid}">返回个人中心 &gt;</a>	
	</h2>
	<? if(!empty($collectList['list'])){?>
	<div class="collec_post_wrap clear">
		<? 
			foreach ($collectList['list'] as $key => $value) {  
		?>	
		<a href="{_PLUS_HOST}post/{$value['source_id']}.html" target="_blank">
			<span class="title"><? echo LibBase::substr($value['title'], 70, 70)?></span>
			<span class="collect_time">
				<s class="global_grey_icons grey_time">
				</s>	
				<? echo LibBase::changeDate($value['created_at'])?>
			</span>
		</a>
		<?}?>
	</div>
	<div class="index_page page_center"></div>
	<?} else {?>
		<div class="empty_collect clear">
			<div class="empty_left personal_logo">
				<div class="collect_tip">
					暂无收藏！	
				</div>	
				<div class="collect_text">
					好贴不易，且行且珍惜！	
				</div>	
			</div>
		</div>	
	<?}?>	
</div>
