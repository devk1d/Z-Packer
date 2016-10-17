<? 
	$status = STATUS_200;
	$html = '操作失败';
	$total_number = 0;
	switch ($type){ 
		case 'configure':
			$html = $this->getTemplate('_configure', array('list' => $list), 'configure');
			break;
	}
	$this->ajaxJson($status, array('html' => $html));
?>
