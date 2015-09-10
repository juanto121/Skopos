
    $(function(){
      $('#profiletabs ul li a').on('click', function(e){
        e.preventDefault();
        var newcontent = $(this).attr('href');
        
        $('#profiletabs ul li a').removeClass('sel');
        $(this).addClass('sel');
        
        $('#content section').each(function(){
          if(!$(this).hasClass('hidden')) { $(this).addClass('hidden'); }
        });
        
        $(newcontent).removeClass('hidden');
      });
    });

    function cambiarEstado()
    {
       $('#profile p').each(function(){
          if(!$(this).hasClass('hidden')) { $(this).addClass('hidden'); }
          else { $(this).removeClass('hidden');}
        });

       $('#cambios').removeClass('hidden');
       $('#actualizarInfo').addClass('hidden');

    }

     function estadoInicial()
    {
       $('#profile p').each(function(){
          if(!$(this).hasClass('hidden')) { $(this).addClass('hidden'); }
          else { $(this).removeClass('hidden');}
        });

       $('#cambios').addClass('hidden');
       $('#actualizarInfo').removeClass('hidden');

    }
