<? if( !empty($list) ){ 
	?>
	<div class="sms_arrow account_list_arrow" totalnum="{$total_num['total']}"></div>
	<? if( $total_num['total'] != 0  && !empty($list)){
		foreach($list['messages'] as $key => $value){
			if( $value['user_id'] == $value['recipient_id'] && $value['reading_date'] == 0 ){ ?>
	<a class="list_detail" target="_blank" href="/message?type=dialog&a={$value['recipient_id']}&s={$value['sender_id']}" sid="{$value['sender_id']}" rid="{$value['recipient_id']}"><span>{$value['sender_user_name']}</span>&nbsp;私信了你</a>
	<? } else if( $value['recipient_id'] == 0 ){ ?>
	<a class="list_detail" target="_blank" href="/message?type=dialog&a={$value['recipient_id']}&s={$value['sender_id']}" sid="{$value['sender_id']}" rid="{$value['recipient_id']}"><span>{$value['recipient']['username']}</span>&nbsp;私信了你</a>
	<? } } ?>
	<div class="sms_btn list_btn">
		<a href="/message?type=inbox">查看全部</a>
		<span>我知道了</span>
	</div>
	<? }else {
	?>
	<span class="list_detail">没有新私信</span>
	<div class="list_btn">
		<a class="no_message" href="/message?type=inbox">查看全部</a>
	</div>
	<? } 
} ?>


