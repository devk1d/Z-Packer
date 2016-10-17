
<?
//var_dump($rightList);die;
if($isSelf) {
	$isSelfTxt = "我";
	$uid = "";
} else {
	$isSelfTxt = "他";
	$uid = '/'.$uid;
}
if($type == "great") {
	$type = '';
}
?>		
<div class="right_wrap">
	<div class="per_right_wrap clear">
		<ul>
			<a href="#goodat" class="active" >
				{$isSelfTxt}擅长的标签<span class="active_arrow"></span>
			</a>
			<a href="#joinat" >
				{$isSelfTxt}参与过的标签<span class="active_arrow"></span>
			</a>
			<a href="#joingroup" >
				{$isSelfTxt}加入的小组<span class="active_arrow"></span>
			</a>
			<a href="#collect" >
				{$isSelfTxt}的收藏<span class="active_arrow"></span>
			</a>
			<a href="#comment" style="margin-bottom: 0px;">
				{$isSelfTxt}的讨论<span class="active_arrow"></span>
			</a>
			<?/*
			<a href="{_WWW_HOST}personal/getAllComment{$uid}" class="{=($type == 'comment')? 'active': ''}">
				<span class="active_arrow">&gt;</span>{$isSelfTxt}的视频讨论<span class="num">{$rightList['videoDiscuss']}</span>
			</a>
			<a href="{_WWW_HOST}personal/getAllCollect{$uid}" class="{=($type == 'collect')? 'active': ''}">
				<span class="active_arrow">&gt;</span>{$isSelfTxt}的收藏<span class="num">{$rightList['followTotal']}</span>
			</a>
			<a href="{_WWW_HOST}personal/getAllPost{$uid}" class="{=($type == 'post')? 'active': ''}">
				<span class="active_arrow">&gt;</span>{$isSelfTxt}的发帖<span class="num">{$rightList['threadTotal']}</span>
			</a>
			<a href="{_WWW_HOST}personal/getAllReply{$uid}" class="{=($type == 'reply')? 'active': ''}">
				<span class="active_arrow">&gt;</span>{$isSelfTxt}的回帖<span class="num">{$rightList['postTotal']}</span>
			</a>
			<a href="{_WWW_HOST}personal/getAllVote{$uid}" class="{=($type == 'vote')? 'active': ''}">
				<span class="active_arrow">&gt;</span>{$isSelfTxt}的投票<span class="num">{$rightList['voteTotal']}</span>
			</a>
			<a href="{_WWW_HOST}personal/getAllAsk{$uid}" class="{=($type == 'askList')? 'active': ''}">
				<span class="active_arrow">&gt;</span>{$isSelfTxt}的提问<span class="num">{$rightList['askTotal']}</span>
			</a>
			<a href="{_WWW_HOST}personal/getAllAnswer{$uid}" class="{=($type == 'answerList')? 'active': ''}">
				<span class="active_arrow">&gt;</span>{$isSelfTxt}的回答<span class="num">{$rightList['answerTotal']}</span>
			</a>
			*/?>
		</ul>
	</div>
</div>
<!--{scriptPool}-->
<script>
Z.use('personal/personalRight');
</script>
<!--{/scriptPool}-->
