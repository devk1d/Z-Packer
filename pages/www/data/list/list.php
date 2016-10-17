<? //var_dump($list['company']);die; 
$company = $list['company']['list'];
$system = $list['system']['list'];
$phone = $list['phone']['list'];
$banner = $list['banner']['list'];

$cid = empty($cid) ? 0 : $cid;
$sid = empty($sid) ? 0 : $sid;
//id对应公司名称
$key_company = array();
$key_system = array();

$c_system = array();
?>

{widget "search", array('banner' => $banner)}

<div class="wrap_phone" data-cid="{$cid}" data-sid="{$sid}">
	<div class="phone_choose">
		<h2>机型列表</h2>
		<div class="choose_content">

			<div class="content_company clear">
				<h3>手机品牌</h3>
				<a class="content_all company_item {=empty($cid) ? 'active' : ''}" href="{_WWW_HOST}data/list" data-id="0">全部</a>
				<div class="content_show clear">
				<? foreach($company as $key => $value){ 
					$key_company[$value['id']] = $value['name'];
					$no_click = '';
					$active = '';

					if( $value['id'] == $cid ){
						$active = 'active';
						foreach( $value['check'] as $key_1 => $value_1 ){
							$c_system[] = $value_1['system'];
						}
					} else {
						//判断是否有筛选系统
						if( !empty($sid) ){
							$no_click = 'no_click';
							foreach( $value['check'] as $key_1 => $value_1 ){
								if( $value_1['system'] == $sid ){
									$no_click = '';
									break;
								}
							}
						}
					} ?>
					<a class="company_item {$active} {$no_click}" href="{_WWW_HOST}data/list/{$value['id']}" data-id="{$value['id']}" data-data='{=CJSON::encode($value['check'])}'>{$value['name']}</a>
				<? } ?>
				</div>
			</div>

			<div class="content_system clear">
				<h3>手机系统</h3>
				<a class="content_all system_item {=empty($sid) ? 'active' : ''}" href="{_WWW_HOST}data/list/{$cid}" data-id="0">全部</a>
				<div class="content_show clear">
				<? foreach($system as $key => $value){ 
					$key_system[$value['id']] = $value['name'];
					$active = ($value['id']==$sid) ? 'active' : ''; 
					if( !empty($cid) ){
						$no_click = 'no_click';
						foreach( $c_system as $key_1 => $value_1 ){
							if( $value['id'] == $value_1 ){
								$no_click = '';
							}
						} 
					} else {
						$no_click = '';
					} ?>
					<a class="system_item {$active} {$no_click}" href="{_WWW_HOST}data/list/{$cid}?sid={$value['id']}" data-id="{$value['id']}">{$value['name']}</a>
				<? } ?>
				</div>
			</div>

			<div class="content_sort clear">
				<ul class="clear">
					<li class="sort_down" data-type="sort" data-order="desc">综合排序</li>
					<li class="" data-type="release_date" data-order="asc">上市时间</li>
					<li class="" data-type="price" data-order="asc">售卖价格</li>
				</ul>
				<div class="sort_num">
					共筛选出 <span>{$list['phone']['total_number']}</span> 件手机
				</div>
			</div>
		</div>
	</div>

	<p class="phone_str">勾选对比机型</p>
	<ul class="phone_list">

	<? $html = $this->getTemplate('_list', array('phone' => $phone, 'key_company' => $key_company, 'key_system' => $key_system), 'list');
	echo $html;
	?>
	</ul>

	<div class="phone_load"></div>

	<div class="phone_compare">
		<p>机型对比</p>
		<ul>
			<li>
				<img src="" />
				<span class="compare_del">删除</span>
			</li>
			<li>
				<img src="" />
				<span class="compare_del">删除</span>
			</li>
		</ul>
		<a class="compare_go" href="javascript:;" target="_blank">对比</a>
	</div>
</div>

<!--{scriptPool}-->
<script>
Z.use('data/list');
</script>
<!--{/scriptPool}-->
