<!--{startBlock "afterBody"}-->
	<script>
	var getUrl = null;
	var static_host = '{_STATIC_HOST}';
	var www_host = '{_WWW_HOST}';
	</script>
	<link type="text/css" rel="stylesheet" href="{_STATIC_HOST}css/jquery.Jcrop.min.css?js_version={_JS_VERSION}" />
	<script src="{_STATIC_HOST}js/jquery.Jcrop.min.js?js_version={_JS_VERSION}"></script>
	<script src="{_STATIC_HOST}js/jquery.uploadify.min.js?js_version={_JS_VERSION}"></script>
<!--{endBlock}-->

<!--{scriptPool}-->
<script>
Z.use('page/page');
</script>
<!--{/scriptPool}-->
<?
	/*
	<div class="main_img">
		<div class=img_box>
			<a href="javascript:void(0);">
				<!--{if empty($this->user['profile_image_url'])}-->
				<img src="{_STATIC_HOST}images/mb_pic250.gif" alt="头像" />
				<!--{else}-->
				<img src="{echo ImagesQcloud::image_url($this->user['profile_image_url'],150,150)}" width="150" height="150" alt="头像" />
				<!--{/if}-->

				<span class="wrap_cover">
					<span class="wrap_tip">更换头像</span>
				</span>
			</a>
		</div>
		<p class="wrap_name">{$this->user['username']}</p>
	</div>
	*/
?>
