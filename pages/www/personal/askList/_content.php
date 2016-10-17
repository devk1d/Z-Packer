<? 
if($isSelf) {
	$isSelfTxt = "我";
	$uid = "";
} else {
	$isSelfTxt = "他";
}

 $title = $type =='post'? '提问':'回答';
 if($isShow) {

?>
	<h2 class="clear getAllAskTitle">
		{$isSelfTxt}的{$title}
		<a class="" href="/personal/{$uid}" style="float:right; font-size: 14px; color:#999">返回个人中心 &gt;</a>	
	</h2>
<?
 }
?>
	
	<? if(!empty($list['list'])){?>
	<div class="ask_comment_wrap clear">
		<? 
			foreach ($list['list'] as $key => $value) {  
		?>
			<div class="ask_list clear">
				<div class="left">
					问答</br>
					{$value['comment_total']}
				</div>
				<div class="middle">
					<a href="{_ASK_HOST}question/{$value['id']}.html" target="_blank">{=LibBase::substr($value['title'], 60, 63)}</a>
				</div>
				<div class="right">
					<span class="global_grey_icons time_icons"></span> <? echo LibBase::changeDate($value['created_at'])?>
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
			</div>
		</div>	
	<?}?>	
