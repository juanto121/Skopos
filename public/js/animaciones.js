var max_videos_transc = 0;
var max_collabs_go = 0;
var max_leng_sopor =0;
window.onscroll = function()
{
   
	var body = document.body; // For Chrome, Safari and Opera
	var html = document.documentElement; // Firefox and IE places the overflow at the <html> level, unless else is specified. Therefore, we use the documentElement property for these two browsers
	var inter;
    var y = html.scrollTop;
    var y_ = body.scrollTop;

    if(y > 250 || y_>250)
    {
    	inter = setInterval(aumentarContadores, 1);
    }
    
};

function aumentarContadores ()
{
	if(max_videos_transc != 1500  )
	{
 		max_videos_transc= max_videos_transc +5 ;
		document.getElementById("videos_transc").innerHTML = max_videos_transc;
	}

	if(max_collabs_go != 20000 )
	{
 		max_collabs_go= max_collabs_go+50;
		document.getElementById("collabs_go").innerHTML = max_collabs_go;
	}

	if(max_leng_sopor != 2 )
	{
 		max_leng_sopor++;
		document.getElementById("leng_sopor").innerHTML = max_leng_sopor;
	}

	if(max_videos_transc == 1500 && max_collabs_go == 20000 && max_leng_sopor == 2)
	{
		clearInterval(inter);
	}

}