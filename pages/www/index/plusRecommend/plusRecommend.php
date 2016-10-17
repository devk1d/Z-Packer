<? if(isset($plus['list']['Z_RECOMMEND']) && isset($plus['list']['Z_TEST'])){
	$recommend = $plus['list']['Z_RECOMMEND'];	
	$test = $plus['list']['Z_TEST'];

	//处理帖子详情页面跳转链接
	function getPostUrl($type, $theme, $id) {
		$postUrl = '';
		switch($type) {
			 case 'normal':
			 case 'vote':
				$postUrl = 'post/' . $id . '.html';
				break;
			case 'barrage':
				$postUrl = 'video/' . $id . '.html';
				break;
			case 'pubtest':
				if($theme == 'Y') {
					$postUrl = 'test/' . $id . '.html';
				}else {
					$postUrl = 'report/' . $id . '.html';
				}
				break;
		}

		return $postUrl;
	}
}
?>

<div class="recommend_left">
	<div class="wrap_title clear">
		<a class="title_name" href="{_PLUS_HOST}" target="_blank"><h2>精品推荐</h2></a>
	</div>
	<div class="main_title">
		<a href="{_PLUS_HOST}{=getPostUrl($recommend[0]['postType'], $recommend[0]['is_theme'], $recommend[0]['target'])}" class="small_title" target="_blank">
			<img class="recommend_img" src="{echo ImagesQcloud::image_url($recommend[0]['cover'], 550, 225)}" alt="{$recommend[0]['title']}" />
			<div class="title_inside">
				<? if(empty($recommend[0]['sub_title'])) {
					echo LibBase::substr(strip_tags(htmlspecialchars_decode($recommend[0]['title'])), 59, 57);
				} else {
					echo LibBase::substr(strip_tags(htmlspecialchars_decode($recommend[0]['sub_title'])), 59, 57);
				}?>
			</div>
		</a>
	</div>
	<ul class="left_list plus_titleList">
<? 
		foreach($recommend as $key => $value){
			if($key != 0) {
				$title = empty($value['sub_title']) ? $value['title'] : $value['sub_title'];
?>
		<li class="clear">
			<a href="{_PLUS_HOST}{=getPostUrl($value['postType'], $value['is_theme'], $value['target'])}" class="small_title small_lTitle" target="_blank">
				{=LibBase::substr(strip_tags(htmlspecialchars_decode($title)), 40, 38)}
			</a>
			<a href="{_PLUS_HOST}post/{$value['target']}.html" class="small_title small_mTitle" target="_blank">
				{=LibBase::substr(strip_tags(htmlspecialchars_decode($title)), 36, 34)}
			</a>
			<a href="{_PLUS_HOST}user?id={$value['user_id']}" class="plus_user plus_lUser" rel="nofollow">
				{=LibBase::substr(strip_tags(htmlspecialchars_decode($value['nickname'])), 20, 18)}
			</a>
			<!-- 小尺寸屏幕上截取更多字段 -->
			<a href="{_PLUS_HOST}user?id={$value['user_id']}" class="plus_user plus_mUser" rel="nofollow">
				{=LibBase::substr(strip_tags(htmlspecialchars_decode($value['nickname'])), 12, 10)}
			</a>
		</li>
<?
			}
		}
?>
	</ul>
</div>


<div class="recommend_right">
	<div class="wrap_title clear">
		<a class="title_name" href="{_PLUS_HOST}test" target="_blank"><h2>全民测评</h2></a>
	</div>
	<div class="main_title">
		<a href="{_PLUS_HOST}{=getPostUrl($test[0]['postType'], $test[0]['is_theme'], $test[0]['target'])}" class="small_title" target="_blank">
			<img class="recommend_img" src="{echo ImagesQcloud::image_url($test[0]['cover'], 550, 225)}" alt="{$test[0]['title']}" />
			<div class="title_inside">
				<? if(empty($test[0]['sub_title'])) {
					echo LibBase::substr(strip_tags(htmlspecialchars_decode($test[0]['title'])), 59, 57);
				} else {
					echo LibBase::substr(strip_tags(htmlspecialchars_decode($test[0]['sub_title'])), 59, 57);
				}?>
			</div>
		</a>
	</div>
	<ul class="left_list plus_titleList">
<? 
		foreach($test as $key => $value){
			if($key != 0) {
				$title = empty($value['sub_title']) ? $value['title'] : $value['sub_title'];
?>
		<li class="clear">
			<a href="{_PLUS_HOST}{=getPostUrl($value['postType'], $value['is_theme'], $value['target'])}" class="small_title small_lTitle" target="_blank">
				{=LibBase::substr(strip_tags(htmlspecialchars_decode($title)), 40, 38)}
			</a>
			<a href="{_PLUS_HOST}{=getPostUrl($value['postType'], $value['is_theme'], $value['target'])}" class="small_title small_mTitle" target="_blank">
				{=LibBase::substr(strip_tags(htmlspecialchars_decode($title)), 36, 34)}
			</a>
			<a href="{_PLUS_HOST}user?id={$value['user_id']}" class="plus_user plus_lUser" rel="nofollow">
				{=LibBase::substr(strip_tags(htmlspecialchars_decode($value['nickname'])), 20, 18)}
			</a>
			<!-- 小尺寸屏幕上截取更多字段 -->
			<a href="{_PLUS_HOST}user?id={$value['user_id']}" class="plus_user plus_mUser" rel="nofollow">
				{=LibBase::substr(strip_tags(htmlspecialchars_decode($value['nickname'])), 12, 10)}
			</a>
		</li>
<?
			}
		}
?>
	</ul>
</div>

