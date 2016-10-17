
<?
//var_dump($videoCommentList);die;
if($isSelf) {
	$isSelfTxt = "我";
} else {
	$isSelfTxt = "他";
}
$title = $type == 'post'? '提问': '回答';
$url = $type == 'post' ? '/personal/getAllAsk':'/personal/getAllAnswer';

?>		

<div class="comment_wrap">
	<h2 style="margin-bottom: 0; margin-top: 40px;">
		{$isSelfTxt}的{$title}
		<? if($isSelf) {
			$uid = '';	
			}
		?>
		<a class="" href="/personal/{$uid}">返回个人中心 &gt;</a>	
	</h2>
		<? echo $this->getTemplate('_content', array('isSelf' => $isSelf, 'page' => 1, 'type'=>$type,  'isShow'=> false,'list' => $list), 'askList', 'personal');
		?>
</div>
<!--{scriptPool}-->
<script>
Z.use('personal/askList');
</script>
<!--{/scriptPool}-->
