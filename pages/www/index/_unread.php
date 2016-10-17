<? if( !empty($list) ){ ?>
	<div class="message_arrow account_list_arrow" totalnum="{$list['total_number']}"></div>
	<? if( !empty($list['list']) ){ 
		foreach($list['list'] as $key => $value){
			if($value['type'] == 'reply'){
		?>
		<a class="list_detail" target="_blank" href="/post/{$value['thread_id']}" msgId="{$value['id']}" threadId="{$value['thread_id']}"><span>{$value['username']}</span>&nbsp;引用了你的评论</a>
		<? }else if($value['type'] == 'assist'){
		?>

		<a class="list_detail" target="_blank" href="/post/{$value['thread_id']}" msgId="{$value['id']}" threadId="{$value['thread_id']}"><span>{$value['username']}</span>&nbsp;赞了你的评论</a>
		<? }
		}?>
		<div class="message_btn list_btn">
			<a href="/message?type=discuss">查看全部</a>
			<span>我知道了</span>
		</div>
	<? }
	else{
	?>
	<span class="list_detail">没有新通知</span>
	<div class="list_btn">
		<a class="no_message" href="/message?type=discuss">查看全部</a>
	</div>
	<? } 
} ?>
