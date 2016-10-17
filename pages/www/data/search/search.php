<div class="machine_banner">
	<? if( !empty($banner[0]['cover']) ){
		$pic = ImagesQcloud::image_url($banner[0]['cover'], 0, 0);
	} else {
		$pic = '';
	} ?>
	<div class="banner_content"></div>
</div>

