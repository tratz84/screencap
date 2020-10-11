
/**
 * 
 */


function DesktopRecordController( container, opts ) {
	
	this.container = container;
	this.opts = opts || { };
	
	this.stream = null;
	
	this.start = async function() {
		$(this.container).show();
		
		var displayMediaOptions = {
			'cursor': 'always',
			logicalSurface: true
		};
		
		try {
			this.stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

			$(this.container).empty();
			
			var vid = $('<video />');
			vid.css('width', 400);
			vid.css('height', 400);
			// vid.attr('autoplay', 'true');
			$(this.container).append( vid );
			
			vid.get(0).srcObject = this.stream;
			vid.get(0).play();
			
		} catch ( err ) {
			this.reportError( err.message );
		}
	}
	
	this.reportError = function(msg) {
		var ec;
		if ($(this.container).find('.errors').length == 0) {
			ec = $('<div class="errors error-list"><ul></ul></div>');
			$(this.container).prepend( ec );
		} else {
			ec = $(this.container).find('.errors');
		}
		
		ec.find('li').remove();
		
		var li = $('<li />');
		li.text( 'Error: ' + msg );
		
		ec.append( li );
	}
	
	this.init = function() {
	}
	
	this.init();
}


function StreamUploader( controller ) {
	
	this.controller = controller;
	
	this.url = 'rec.php';
	
	this.recorder = null;
	this.intervalReqData = null;
	
    this.started = false;
	this.uploading = false;
	
	this.start = function() {
        if (this.started == true) {
            return;
        }
        
        this.started = true;
		
		if (this.recorder == null) {
			console.log('lets go');	
			this.recorder = new MediaRecorder( this.controller.stream, {
				mimeType: 'video/webm; codecs=vp9'
				// , videoBitsPerSecond : 2500000
			});
			this.recorder.ondataavailable = function(e) {
				//console.log( e.data.text() );
				console.log('yeah');
				this.uploadData( e.data );
			}.bind(this);
		}
		this.recorder.start();
        console.log(this.recorder.state);

		this.intervalReqData = setInterval(function() {
			this.recorder.requestData();
		}.bind(this), 500);
	};
	
	this.uploadData = function(data) {
		if (this.uploading) {
			return;
		}
		this.uploading = true;

		var fd = new FormData();
		fd.append('data', data);
		
		$.ajax({ 
			type: 'POST',
			url: 'rec.php',
			data: fd,
			processData: false,
			contentType: false,
			complete: function() {
				this.uploading = false;
			}.bind(this)
		});
	};
	
	this.stop = function() {
		if (this.recorder == null) {
			console.err('Recorder not initiated');
			return;
		}
        if (this.started == false) {
            return;
        }
        this.started = false;
		
		this.recorder.stop();
		clearInterval( this.intervalReqData );
	};
	
	this.init = function() {
		
	};
	
	
	this.init();
}







