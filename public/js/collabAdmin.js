window.onload = function(){
	var downloadButton = $('.download-collab');
	downloadButton.on('click', function(){
		var url = downloadButton.attr('value');
		$.get('/collab/download/'+url, function(response){
			if(response){
				var iframe;
				iframe = document.getElementById("download-container");
				if (iframe === null)
				{
					iframe = document.createElement('iframe');
					iframe.id = "download-container";
					iframe.style.visibility = 'hidden';
					document.body.appendChild(iframe);
				}
				iframe.src = response;
			}
		});
	});
};