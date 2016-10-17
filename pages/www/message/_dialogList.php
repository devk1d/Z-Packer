<? 
if(!empty($list)){ ?>
{eval $lastDate = 0;}
<? foreach($list['messages'] as $key=>$val) { 
	$css = $val['user_id']==$val['recipient']['id']?"talk_r":"";
	$url = $val['user_id']==$val['recipient']['id']?"/personal":"/personal/".$val['recipient']['id'];
    if( empty($a) ){ 
		$url ='javascript:;';
	}

	$totalNum = $list['total_number'];
?>
<div class="dialog_list clear "totalNum="{$totalNum}">
	<!--{if date('Y-m-d', $val['created_at']) != $lastDate}-->
	{eval $lastDate = date('Y-m-d', $val['created_at'])}
	<div class="split_line">
		<span>{$lastDate}</span>
	</div>
	<!--{/if}-->
	<div class="list_talk {$css} clear">
		<a class="talk_left" href="{$url}" target="_blank">
			<!--{if empty($val['recipient']['profile_image_url'])}-->
			<img src="{_STATIC_HOST}images/mb_pic50.gif" class="pic_radius" alt="会员头像" />
			<!--{else}-->
			<img src="{echo ImagesQcloud::image_url($val['recipient']['profile_image_url'],40,40)}" class="pic_radius" alt="头像" />
			<!--{/if}-->
		</a>
		<div class="talk_right clear">
			<!--{if empty($css)}-->
			 <span class="talk_title">
				 <a href="{$url}" target="_blank" >{$val['recipient']['username']} </a>
				 <span class="talk_time">&nbsp;<em>|</em>&nbsp;{echo date('H:i:s', $val['created_at'])}</span>
			 </span>
			<!--{else}-->
			 <span class="talk_title">
				 <span class="talk_time">{echo date('H:i:s', $val['created_at'])}&nbsp;&nbsp;<em>|</em>&nbsp;</span>
				 <a href="{$url}" target="_blank" >
					 <? if( empty($a) ){ ?>
					 系统站内信
					 <? } else { ?>
					 {$val['recipient']['username']}
					 <? } ?>
				 </a>
			 </span>
			<!--{/if}-->
			 <span class="talk_content">
				 {$val['message']}
			 </span>
			 <span class="talk_arrow">
			 </span>
		</div>
	</div>
</div>
<? } } ?>

