
<?
//var_dump($videoCommentList);die;
if($isSelf) {
	$isSelfTxt = "我";
} else {
	$isSelfTxt = "他";
}?>		
<div class="comment_wrap comment_all_wrap" data-page="{$page}" data-totalnum ="{$videoCommentList['total_number']}">
	<h2>
		视频讨论	
		<a class="" onclick="window.history.back();return false;" href="javascript:;" target="_blank">返回个人中心 &gt;</a>	
	</h2>
	<? if(!empty($videoCommentList['comments'])){?>
	<div class="video_comment_wrap clear">
		<? 
			foreach ($videoCommentList['comments'] as $key => $value) {  
		?>
		<div class="comment_item">
			<div class="comment_action">
				{$value['action']}：
				<a href="{_WWW_HOST}post/{$value['post_id']}.html" target="_blank">
					<span class="title">{$value['title']}</span>
				</a>
			</div>
			<div class="comment_message">
				{$value['message']}
			</div>
			<div class="comment_time">	
				<s class="global_grey_icons grey_time">
				</s>	
				<? echo LibBase::changeDate($value['created_at'])?>
			</div>	
		</div>
		<?}?>
	</div>
	<div class="index_page page_center"></div>
	<?} else {?>
		<div class="empty_collect clear">
			<div class="empty_left personal_logo">
				<div class="collect_tip">
					暂无记录！	
				</div>	
				<div class="collect_text">
					快去 ZEALER 官网看视频！	
				</div>	
			</div>
		</div>	
	<?}?>	
</div>
