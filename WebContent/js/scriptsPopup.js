
var janela
var HTML = ''
 function visualizar()
    {
    
        if(janela)
            janela.focus()
            var dataAtual = new Date();
        	var numeroProd = $(this).attr('id').substring(14);
        	
            janela = window.open('', 'login.jsp', 'top=50,left=50,width=800,height=500,scrollbars=yes,status=yes');
            var HTML = '<html><head>';
            HTML += '<LINK rel=\"STYLESHEET\" href=\"css/nfe-vis.css\" type=\"text/css\">';
            HTML += '<LINK rel=\"STYLESHEET\" href=\"css/xslt.css\" type=\"text/css\">';
            HTML += '<style type"text/css" media="print">';
            HTML +=     '.notprint {overflow: hidden;display: none;}';
            HTML += '</style>';
            HTML += '<style type="text/css">';
            HTML +=     '.toggle { background-image:none !important; }';
            HTML +=     '.toggable { display: block !important; }';
            HTML += '</style>';
            HTML += '<title>Urbana-Pe</title></head><body><hr noshade></div>';
            HTML += ''
            HTML += '<br />';
            HTML += '</body></html>';
            janela.document.write(HTML);
            janela.document.close();
       
        
    }
    
    function finaliza()
    {
        janela.close();
    }
        
 

