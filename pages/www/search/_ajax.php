<? 
	$status = STATUS_200;
	$html = '获取数据失败';
	$total_number = 0;
	//var_dump($list);die;

	if($list && !isset($list['error'])) {
		if(empty($list['list'])) { 
			$html = '';
		} else {
			$html = $this->getTemplate('_'.$type, array('list' => $list), 'ajax');
			$total_number = $list['total_number'];
		}
	}

	$this->ajaxJson($status, array('html' => $html,  'total_number' => $total_number, 'num' => $num));
?>
