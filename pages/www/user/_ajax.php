<? 
	$status = STATUS_200;
	$html = '操作失败';
	$total_number = 0;
	$binding = $arr['binding'];
	$social = $arr['social'];
	$from = $arr['from'];
	$redirect = $arr['redirect'];

	switch($arr['pagetype']) { 
		case "setbasic": 
			$html = $this->getTemplate('_setbasic', array(), 'page');
			break;
		case "setmail": 
			$html = $this->getTemplate('_setmail', array('binding' => $binding), 'page');
			break;
		case "setpsd": 
			$html = $this->getTemplate('_setpsd', array('binding' => $binding), 'page');
			break;
		case "setaccount": 
			$html = $this->getTemplate('_setaccount', array('binding' => $binding, 'social' => $social, 'from' => $from, 'redirect' => $redirect), 'page');
			break;
		case "mycom": 
			$html = $this->getTemplate('_mycom', array(), 'page');
			break;
		case "appro": 
			$html = $this->getTemplate('_appro', array(), 'page');
			break;

	}
	$this->ajaxJson($status, array('html' => $html));
?>
	
