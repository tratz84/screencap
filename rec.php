<?php

$data = file_get_contents($_FILES['data']['tmp_name']);

$fh = fopen(__DIR__.'/output.webm', 'a');
if ($fh) {
    fwrite($fh, $data);
    fclose($fh);
    
    header('Content-type: application/json');
    print json_encode(['success' => true]);
}
else {
    header('Content-type: application/json');
    print json_encode(['success' => false, 'error' => true, 'message' => 'Unable to create output file']);
}
