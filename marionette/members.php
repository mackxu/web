<?php

	$members = array(
		array('id'=> 1, 'firstName'=> 'aaa', 'lastName'=> '111'),
		array('id'=> 2, 'firstName'=> 'bbb', 'lastName'=> '222'),
		array('id'=> 5, 'firstName'=> 'eee', 'lastName'=> '555'),
	);

	echo json_encode($members);