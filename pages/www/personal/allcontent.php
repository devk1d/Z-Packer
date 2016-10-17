
{setLayout "www"}
{setTitle "ZEALER - 科技生活方式第一站"}
{setKeywords "手机测评，数码产品测评，科技产品测评"}
{setDescription "ZEALER 是中国权威的科技电子产品测评网站，由王自如等科技达人傾力打造，测评内容涉及手机的 Android，iOS，WP 等周边数码产品，致力于还原科技本质，为用户提供最专业的点评和最客观的资讯"}

<!--{startBlock "content"}-->
<div class="personal_main clear">
	<!-- personal_header-->
	{widget "personalHeader", array('isSelf' => $isSelf, 'headerList' => $headerList, 'uid' => $uid)}
	<!-- personal_right-->
	{widget "personalRight", array('isSelf' => $isSelf, 'uid' => $uid, 'rightList' => $rightList, 'type' => $type)}
	<div class="per_main_wrap clear">	
		<!-- personal_hotTag-->
		<a name="goodat" class="goodat margintop1"></a>
		{widget "hotTag", array('isSelf' => $isSelf, 'tagList' => $tagList)}
		
		<a name="joinat" class="joinat margintop"></a>
		<!-- personal_useTag-->
		{widget "useTag", array('isSelf' => $isSelf, 'tagList' => $tagList)}
		
		<a name="joingroup" class="joingroup margintop"></a>
		<!-- personal_joinGroup-->
		{widget "joinGroup", array('isSelf' => $isSelf, 'uid' => $uid, 'joinGroupList' => $joinGroupList, 'groupRecList' => $groupRecList)}

		<a name="collect" class="collect margintop"></a>
		<!-- personal_collect-->
		{widget "collect", array('isSelf' => $isSelf, 'uid' => $uid, 'collectList' => $collectList)}
		
		<a name="comment" class="comment margintop"></a>
		<div class="personal_inner_wrap" data-page="{$page}" data-pos="yes" data-totalnum ="{$list['total_number']}">
			<?
				$css = '';
				$is_active = "";
				if($no_great) {
					$css = 'display: none';	
					$is_active = "active";
				} 
			?>
			<div class="various_post_wrap" onload="document.body.scrollTop = document.body.scrollHeight"  data-uid="{$uid}">
				<h2 class="clear">
					<a class="sub_title {=($type == 'great')? 'active':''}" style="{$css}" data-type="great" href="/personal/great/{$uid}">精华帖</a>	
					<a class="sub_title {=($type == 'post')? 'active':''}" data-type="post" href="/personal/post/{$uid}">发帖</a>	
					<a class="sub_title {=($type == 'reply')? 'active':''}" data-type="reply" href="/personal/reply/{$uid}">回帖</a>	
					<a class="sub_title {=($type == 'vote')? 'active':''}" data-type="vote" href="/personal/vote/{$uid}">投票</a>	
					<a class="sub_title {=($type == 'videocom')? 'active':''}" data-type="videocom" href="/personal/videocom/{$uid}">视频讨论</a>	
					<a class="sub_title {=($type == 'ask')? 'active':''}" data-type="ask" href="/personal/ask/{$uid}">提问</a>	
					<a class="sub_title {=($type == 'answer')? 'active':''}" data-type="answer" href="/personal/answer/{$uid}">回答</a>	
				</h2>
			</div>
	
		<? 
		switch($type) {
			case 'great':	
		 		echo $this->getTemplate('_record_inner', array('greatPostList' => $greatPostList, 'type' => $type, 'isSelf' => $isSelf, 'page' => $page, 'list' => $list, 'uid' => $uid), 'variousPost', 'personal');
			break;	
			case 'post':	
		 		echo $this->getTemplate('_record_inner', array('greatPostList' => $greatPostList, 'type' => $type, 'isSelf' => $isSelf, 'page' => $page, 'list' => $list, 'uid' => $uid), 'variousPost', 'personal');
			break;	
			case 'reply':	
		 		echo $this->getTemplate('_record_inner', array('greatPostList' => $greatPostList, 'type' => $type, 'isSelf' => $isSelf, 'page' => $page, 'list' => $list, 'uid' => $uid), 'variousPost', 'personal');
			break;	
			case 'vote':	
		 		echo $this->getTemplate('_record_inner', array('greatPostList' => $greatPostList, 'type' => $type, 'isSelf' => $isSelf, 'page' => $page, 'list' => $list, 'uid' => $uid), 'variousPost', 'personal');
			break;	
			case 'videocom':
		 		echo $this->getTemplate('_videocom', array('greatPostList' => $greatPostList, 'type' => $type, 'isSelf' => $isSelf, 'page' => $page, 'videoCommentList' => $list, 'uid' => $uid), 'variousPost', 'personal');
			break;
			case 'ask':
		 		echo $this->getTemplate('_asklist', array('isSelf' => $isSelf, 'page' => $page, 'type'=>'post', 'isShow'=> true,  'list' => $list), 'variousPost', 'personal');
			break;
			case 'answer':
		 		echo $this->getTemplate('_asklist', array('isSelf' => $isSelf, 'page' => $page, 'type'=>'answer',  'isShow'=> true, 'list' => $list), 'variousPost', 'personal');

			break;
			default:
		 		echo $this->getTemplate('_record_inner', array('isSelf' => $isSelf, 'type' => $type, 'page' => $page, 'show' => true, 'list' => $list, 'uid' => $uid), 'variousPost', 'personal');
			break;
		}?>
		</div>
	</div>
</div>
<!--{endBlock}-->
{widget "page"}
