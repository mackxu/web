<?php

    header('Access-Control-Allow-Origin: *');
    // echo "good work";
    // 传递done参数，如果为0则是未完成
    // 如果为1是已完成
    $todos = array(array('aaaaa', 'bbbbb', 'cccccc'), array('11111', '22222', '333333'));

    $todos = array(
        array('title'=>'aaaaa', 'done' => 0),
        array('title'=>'bbbbb', 'done' => 1),
        array('title'=>'ccccc', 'done' => 0)
    );

    $done = $_GET['done'];
    // $done = 1;
    echo json_encode($todos);