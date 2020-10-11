<!DOCTYPE html>
<html>

<head>
    
</head>

<body>
    <h1>Screen capture</h1>
    
    <div id="my-container"></div>
    
    <input type="button" id="btnRecord" value="Record" />
    
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="desktoprecord.js?v=<?= filemtime('desktoprecord.js') ?>"></script>

<script>

var streamUploader = null;

$(document).ready(function() {
	var drc = new DesktopRecordController('#my-container');
	drc.start();

	$('#btnRecord').click(function() {
		if (!streamUploader || streamUploader.started == false) {
            if (!streamUploader) {
			    streamUploader = new StreamUploader( drc );
            }
			streamUploader.start();
            
            $(this).val('Recording...');
		} else {
            streamUploader.stop();
            $(this).val('Record');
		}
	});
});

</script>
    
    
</body>


</html>

