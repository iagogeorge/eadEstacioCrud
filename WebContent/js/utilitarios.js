function validarNumero(obj) {
	var valor = obj.value;
	var reInteger = /^\d+$/;
	var resultado = reInteger.test(valor);

	if (!resultado && obj.value != "") {
		alert("O campo só aceita números!");
		obj.value = valor.replace(/[a-zA-Z]/g, "");
		return false;
	}
	return true;
}

function validarData(obj) {

	var valor = obj.value;
	var reDate = /^((0[1-9]|[12]\d)\/(0[1-9]|1[0-2])|30\/(0?[13-9]|1[0-2])|31\/(0[13578]|1[02]))\/(19|20)\d{2}$/;
	var resultado = reDate.test(valor);

	if (!resultado && obj.value != "") {
		alert("Data inv�lida!");
		return false;
	}
	return true;
}

function validandoCPF(strCPF) {
	var Soma;
	var Resto;
	Soma = 0;
	if (strCPF == "00000000000")
		return false;

	for (i = 1; i <= 9; i++)
		Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
	Resto = (Soma * 10) % 11;

	if ((Resto == 10) || (Resto == 11))
		Resto = 0;
	if (Resto != parseInt(strCPF.substring(9, 10)))
		return false;

	Soma = 0;
	for (i = 1; i <= 10; i++)
		Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
	Resto = (Soma * 10) % 11;

	if ((Resto == 10) || (Resto == 11))
		Resto = 0;
	if (Resto != parseInt(strCPF.substring(10, 11)))
		return false;
	return true;
}

function intervaloCorreto(objetoIni, objetoFim) {
	var retorno = true;
	var diaI, diaF, mesI, mesF, anoI, anoF, mensagemD;

	if (objetoIni.value != "" && objetoFim.value != "") {
		mensagemD = "Intervalo das Datas incorreto!";
		diaI = objetoIni.value.substring(0, 2)
		mesI = objetoIni.value.substring(3, 5)
		anoI = objetoIni.value.substring(6, 10)

		diaF = objetoFim.value.substring(0, 2)
		mesF = objetoFim.value.substring(3, 5)
		anoF = objetoFim.value.substring(6, 10)

		if (anoI > anoF) {
			alert(mensagemD);
			retorno = false;
		} else if (anoI == anoF) {
			if (mesI > mesF) {
				alert(mensagemD);
				retorno = false;
			} else if (mesI == mesF) {
				if (diaI > diaF) {
					alert(mensagemD);
					retorno = false;
				}
			}
		}
	}

	if (!retorno) {
		objetoIni.focus();
	}
	return retorno;
}

function FormataData(event, objeto) {

	var tecla, tamanho;

	tecla = event.keyCode ? event.keyCode : event.which;

	if (tecla != 8) {
		tamanho = objeto.value.length;
		if (tamanho == 2 || tamanho == 5) {

			objeto.value = objeto.value + "/";
		}
	}

}

function FormataHrMM(event, objeto) {

	var tecla, tamanho;

	tecla = event.keyCode ? event.keyCode : event.which;
	if (tecla != 8) {
		tamanho = objeto.value.length;
		if (tamanho == 2) {
			objeto.value = objeto.value + ":";
		} else if (tamanho == 5) {
			objeto.value = objeto.value + " as ";
		} else if (tamanho == 11) {
			objeto.value = objeto.value + ":";
		}
	}

}

function isValidoCNPJ(obj) {
	var cnpj = obj.value;
	cnpj = cnpj.replace(".", "");
	cnpj = cnpj.replace(".", "");
	cnpj = cnpj.replace("-", "");
	cnpj = cnpj.replace("/", "");
	var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
	digitos_iguais = 1;
	if (cnpj.length < 14 && cnpj.length < 15)
		return false;
	for (i = 0; i < cnpj.length - 1; i++)
		if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
			digitos_iguais = 0;
			break;
		}
	if (!digitos_iguais) {
		tamanho = cnpj.length - 2
		numeros = cnpj.substring(0, tamanho);
		digitos = cnpj.substring(tamanho);
		soma = 0;
		pos = tamanho - 7;
		for (i = tamanho; i >= 1; i--) {
			soma += numeros.charAt(tamanho - i) * pos--;
			if (pos < 2)
				pos = 9;
		}
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(0))
			return false;
		tamanho = tamanho + 1;
		numeros = cnpj.substring(0, tamanho);
		soma = 0;
		pos = tamanho - 7;
		for (i = tamanho; i >= 1; i--) {
			soma += numeros.charAt(tamanho - i) * pos--;
			if (pos < 2)
				pos = 9;
		}
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(1))
			return false;
		return true;
	} else
		return false;
}

function isValidoCPF(cpf) {

	cpf = cpf.replace(/[^\d]+/g, '');

	if (cpf == '')
		return false;

	// Elimina CPFs invalidos conhecidos
	if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111"
			|| cpf == "22222222222" || cpf == "33333333333"
			|| cpf == "44444444444" || cpf == "55555555555"
			|| cpf == "66666666666" || cpf == "77777777777"
			|| cpf == "88888888888" || cpf == "99999999999")
		return false;

	// Valida 1o digito
	add = 0;
	for (i = 0; i < 9; i++)
		add += parseInt(cpf.charAt(i)) * (10 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11)
		rev = 0;
	if (rev != parseInt(cpf.charAt(9)))
		return false;

	// Valida 2o digito
	add = 0;
	for (i = 0; i < 10; i++)
		add += parseInt(cpf.charAt(i)) * (11 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11)
		rev = 0;
	if (rev != parseInt(cpf.charAt(10)))
		return false;

	return true;

}

function Mascara(o, f) {
	v_obj = o;
	v_fun = f;
	setTimeout("execmascara()", 1);
}

function execmascara() {
	v_obj.value = v_fun(v_obj.value)
}
function apenasNumeroseVirgulas(v) {
	return v.replace(/[^0-9,]/g, "");
}

function apenasNumerosDatas(v) {
	return v.replace(/[^0-9]/g, "");
}

function apenasNumeros(v) {
	return v.replace(/\D/g, "");
}
// $(document).ready(function() {
// 	$("input").bind('paste', function(e) {
// 			e.preventDefault();
// 	});
// });

function exportarCSV(idTable,data,tipo){
  var textRange; var j=0;
  var tab = document.getElementById(idTable); // id da tabela
    if(document.getElementById(idTable).rows.length < 2){
    alert("Por favor, realizar uma pesquisa antes de exportar.");
    }
    else{
      var a=[], csv='', LF='\r\n', r, c, rs, cs, row, cell, i, j, v;

    for (r=0; r<tab.rows.length; r++){
      row = tab.rows[r];

        for (c=0; c<row.cells.length; c++){
          cell = row.cells[c];
          rs = cell.rowSpan+r;
          cs = cell.colSpan+c;

            for (i=r; i<rs; i++){
              if (!a[i]){
                a[i]=[];
              }

              for (j=c; j<cs; j++){
                a[i].push(i>r || j>c ? '' : "" + cell.innerHTML);
              }
            }
          }
        }
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // Se for Internet Explorer
      {
        for (r=0; r<a.length; r++){
          v = '';
          for (c=0; c<a[r].length; c++){
            csv += (v + a[r][c]);
            v = ";";
          }
          csv += '\r\n';
        }

        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(csv);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs",true,"Socilita��es.csv");
      }
    else
      for (r=0; r<a.length; r++){
        v = '';
        for (c=0; c<a[r].length; c++){
          csv += (v + a[r][c]);
          v = ";";
        }
        csv += "%0A";
      }
      var a = document.createElement('a');
      a.href = 'data:text/csv;charset=UTF-8,' + csv;
      a.target = '_blank';
      a.download = data + '_' + tipo +'.csv';
      document.body.appendChild(a);
      a.click();
    //sa = window.open('data:attachment/csv,' + encodeURIComponent(csv));
      return (true);
    }
}

function cep_(e,args)
{
	if (document.all){var evt=event.keyCode;} // caso seja IE
	else{var evt = e.charCode;}	// do contrário deve ser Mozilla
	var valid_chars = '0123456789-'+args;	// criando a lista de teclas permitidas
	var chr= String.fromCharCode(evt);	// pegando a tecla digitada
	if (valid_chars.indexOf(chr)>-1 ){return true;}	// se a tecla estiver na lista de permissão permite-a
	// para permitir teclas como <BACKSPACE> adicionamos uma permissão para
	// códigos de tecla menores que 09 por exemplo (geralmente uso menores que 20)
	if (valid_chars.indexOf(chr)>-1 || evt < 9){return true;}	// se a tecla estiver na lista de permissão permite-a
	return false;	// do contrário nega
}

function maiuscula(z){
    v = z.value.toUpperCase();
    z.value = v;
}