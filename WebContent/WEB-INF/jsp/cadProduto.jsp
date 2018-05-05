<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Cadastro de Produto</title>
<meta name="layout" content="main" />
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script src="js/jquery/jquery-1.12.3.min.js" type="text/javascript"></script>
<script src="js/html5shiv.js"></script>
<script src="js/respond.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap/bootbox.min.js" charset=ISO-8859-1></script>
<link href="" type="text/css" media="screen, projection"
	rel="stylesheet" />
<link href="css/bootstrap.min.css" rel="stylesheet" charset=ISO-8859-1">
<link href="css/style2.css" rel="stylesheet">
<script language="javascript" src="js/Calendario.js" type=""></script>
<script src="js/jquery.mask.min.js"></script>
<script src="js/jquery.min.js"></script>
<script src="js/jquery.maskedinput.js"></script>
<script language="javascript" src="js/utilitarios.js" charset="utf-8"
	type=""></script>
<script language="JavaScript" type="text/JavaScript" charset="utf-8">

	bootbox.setDefaults({
		  locale: "br",
		  show: true,
		  backdrop: true,
		  closeButton: true,
		  animate: true,
		  className: "my-modal"
		  
	});

	function navegar(acao){
		var id = "${id}";
		$("#formCadProduto").append("<input type='hidden' name='id' value='"+id+"'>");
		formCadProduto.action = acao;
		formCadProduto.submit();
	}
	
	function verificacao(permissao) {
		var msg = "${msgProduto}";
		var id = "${id}";

		if(msg == 1){
			bootbox.alert("Produto cadastrado com sucesso!",function(){	
				formCadProduto.action = "consProduto";
				formCadProduto.submit();
			})	
		}else if(msg == 2) {
			bootbox.alert("Este Produto já existe!",function(){	})	
		}else if (msg == 3) {
			bootbox.alert("Erro ao tentar realizar o cadastro!",function(){	})
		}
	
		ValidarPermissaoUsuario(permissao);
	}

	function validaCampos() {
		if (document.formCadProduto.nomeProd.value == "") {
			bootbox.alert("Para realizar o cadastro é obrigatório informar: o Nome do Produto!",function(){	})
			return false;
		}
		if (document.formCadProduto.valorProd.value == "") {
			bootbox.alert("Para realizar o cadastro é obrigatório informar: o valor do Produto!",function(){	})
			return false;
		}

		if (document.formCadProduto.codigoProd.value == "") {
			bootbox.alert("Para realizar o cadastro é obrigatório informar: o código do Produto!",function(){	})
			return false;
		}
		
		if (document.formCadProduto.filtroStatus.value == "") {
			bootbox.alert("Para realizar o cadastro é obrigatório informar: o Status do Produto!",function(){	})
			return false;
		}
		
		return true;

	}


	function cadProduto() {
		var id = "${id}";
		if (validaCampos()) {
			formCadProduto.id.value = id;
			formCadProduto.cadastrar.value = "true";
			formCadProduto.action = "produto";
			formCadProduto.submit();
		}
	}


	function goHome() {
			formCadProduto.action = "consProduto";
			formCadProduto.submit();
		}

	
	function sem_acento(e, args) {
		if (document.all) {
			var evt = event.keyCode;
		} // caso seja IE
		else {
			var evt = e.charCode;
		} // do contrário deve ser Mozilla
		var valid_chars = 'abcdefghijlmnopqrstuvxzwykABCDEFGHIJLMNOPQRSTUVXZWYK '
				+ args; // criando a lista de teclas permitidas
		var chr = String.fromCharCode(evt); // pegando a tecla digitada
		if (valid_chars.indexOf(chr) > -1) {
			return true;
		} // se a tecla estiver na lista de permissão permite-a
		// para permitir teclas como <BACKSPACE> adicionamos uma permissão para 
		// códigos de tecla menores que 09 por exemplo (geralmente uso menores que 20)
		if (valid_chars.indexOf(chr) > -1 || evt < 9) {
			return true;
		} // se a tecla estiver na lista de permissão permite-a
		return false; // do contrário nega
	}

	function maiuscula(z) {
		v = z.value.toUpperCase();
		z.value = v;
	}
	setTimeout(function() {
		bootbox.alert("Prezado Usuário(a), sua sessão foi expirada!",
				function() {
					formCadProduto.action = "logout";
					formCadProduto.submit();
				})
	}, 900000);
</script>
</head>
<body onload="verificacao()">
	<%@ include file="../jsp/header.jsp"%>
	<form name=formCadProduto method="POST" action="cadastramento">
		<input type="hidden" name="id"> <input type="hidden"
			name="consultar" value="false"> <input type="hidden"
			name="cadastrar">
		<div class="container" style="padding-top: 40px;">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h4>Cadastro de Produto</h4>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-md-6">
							<div class="input-group" style="padding-top: 20px;">
								<span class="input-group-addon" id="basic-addon1"
									style="padding-left: 65px;">Nome:</span> <input type="text"
									class="form-control" placeholder="Informe o nome do produto"
									value="${ prod.nomeProd }" aria-describedby="basic-addon1"
									id='nomeProd' name="nomeProd" onkeyup="maiuscula(this)"
									onkeypress="return sem_acento(event)">
							</div>
						</div>
					<div class="col-md-6">
							<div class="input-group" style="padding-top: 20px;">
								<span class="input-group-addon" id="basic-addon1"
									style="padding-left: 65px;">Valor:</span> <input type="text"
									class="form-control" placeholder="Informe o valor do produto"
									value="${ prod.nomeProd }" aria-describedby="basic-addon1"
									id='valorProd' name="valorProd">
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group" style="padding-top: 20px;">
								<span class="input-group-addon" id="basic-addon1"
									style="padding-left: 65px;">Código de indentificação:</span> <input type="text"
									class="form-control" placeholder="Informe o código do produto"
									value="${ prod.nomeProd }" aria-describedby="basic-addon1"
									id='codigoProd' name="codigoProd">
							</div>
						</div>	
						<div class="col-md-6">
							<div class="input-group" style="padding-top: 20px;">
								<span class="input-group-addon" id="basic-addon1"
									style="padding-left: 30px;">Status:</span> <select
									class="form-control" id="filtroStatus" name="filtroStatus"
									style="text-align: center;">
									<option value="">.:SELECIONAR:.</option>
									<option value="A">ATIVO</option>
									<option value="I">INATIVO</option>
								</select>
							</div>
						</div>

					</div>
				</div>
				<br /> <br />
				<div class="panel-footer" style="text-align: center;">
					<input class="btn btn-primary" type="button" onclick="javascript:cadProduto();" readonly="readonly" value='CADASTRAR' name="cmdCadastrar" /> 
						<input class="btn btn-primary" type="button" onclick="javascript:goHome()" id="voltar" value='VOLTAR'readonly="readonly" name="cmdGoHome" />
				</div>
			</div>
		</div>
	</form>
</body>
</html>