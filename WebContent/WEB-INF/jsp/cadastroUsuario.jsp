<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Cadastro de Usuários</title>
<meta name="layout" content="main" />
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script src="js/jquery/jquery-1.12.3.min.js" type="text/javascript"></script>
<script src="js/html5shiv.js"></script>
<script src="js/respond.min.js"></script>
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

<!-- imports do header e do footer -->
<c:import var = "footer" url = "footer.jsp"/>
<c:import var = "header" url = "header.jsp"/>
<!-- fim imports do header e do footer -->


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
		formCadUsuario.action = acao;
		formCadUsuario.submit();
	}
	function mascara(o,f){
   		v_obj=o
    	v_fun=f
    	setTimeout("execmascara()",1)
	}

	function execmascara(){
    	v_obj.value=v_fun(v_obj.value)
	}

	function mtel(v){
    	v=v.replace(/\D/g,"");             //Remove tudo o que não é digito.
    	v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parÃªnteses em volta dos dois primeiros dÃ­gitos
    	v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hÃ­fen entre o quarto e o quinto dÃ­gitos
    	return v;
	}


	function validaCampos() {
		if (document.formCadUsuario.nomeUsuario.value == "") {
			bootbox.alert("Para realizar o cadastro é obrigatório informar: o Nome do Usuário!",function(){})
			document.formCadUsuario.nomeUsuario.focus();
			return false;
		}
		if (document.formCadUsuario.nomeLogin.value == "") {
			bootbox.alert("Para realizar o cadastro é obrigatório informar: o Login!",function(){})
			document.formCadUsuario.nomeLogin.focus();
			return false;
		}
		if (document.formCadUsuario.senha.value == "") {
			bootbox.alert("Para realizar o cadastro é obrigatório informar: a Senha!",function(){})
			document.formCadUsuario.senha.focus();
			return false;
		}
		if (document.formCadUsuario.email.value == "") {
			bootbox.alert("Para realizar o cadastro é obrigatório informar: o Email!",function(){})
			document.formCadUsuario.email.focus();
			return false;
		}
		if (document.formCadUsuario.telefone.value == "") {
			bootbox.alert("Para realizar o cadastro é obrigatório informar: o Numero do Telefone!",function(){})
			document.formCadUsuario.telefone.focus();
			return false;
		}

		return true;
	}


	function voltarHome() {
		formCadUsuario.action = "cadUsuario";
		$("#formCadUsuario").append("<input type='hidden' name='voltar' value='voltar'>");
		formCadUsuario.submit();
	}

	function cadastrarUsuario() {
 		if (validaCampos()) {
 			document.formCadUsuario.cadastroUsuario.value = true;
 			document.formCadUsuario.action = "cadUsuario";
 			document.formCadUsuario.submit();
 		}
 	}

 
	

	function verificacao() {
		var msg = "${msgAlerta}";
		var id = "${id}";

		if (msg == "1") {
			bootbox.alert("usuário cadastrado com sucesso!!", function() {
				$("#formCadUsuario").append("<input type='hidden' name='voltar' value='voltar'>");
				formCadUsuario.action = "cadUsuario";
				formCadUsuario.submit();
			})

		} else if (msg == "2") {
			bootbox.alert("<font color='red'>E-mail já cadastrado para outro usuário.</font>",function() {})
			return false;
		} else if (msg == "3") {
			bootbox.alert("<font color='red'>Não foi possível cadastrar o usuário</font>",function() {})
			return false;
		}

	}

	setTimeout(function() {
		bootbox.alert("Prezado Usuário(a), sua sessão foi expirada!",
				function() {
					document.formCadUsuario.logout.value = true;
					formCadUsuario.action = "logout";
					formCadUsuario.submit();
				})
	}, 300000);
</script>
</head>
<body onload="verificacao();" style="background-color: #dae0e7">
<%@ include file="header.jsp"%>
	 <form name=formCadUsuario method="post" action="CadastroUsuario" id="formCadUsuario">
		<input type="hidden" id="cadastroUsuario" name="cadastroUsuario" value="false">
		<input type="hidden" id="logout" name="logout" value="false">
		
		<div class="container">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h4 class="panel-title" style="text-align: center;">Cadastro do Usuário</h4>
				</div>
				<div class="panel-body">

					<div class="panel panel-primary" id="painelUsuarios">
							<div class="panel-heading">
								<h4 class="panel-title" style="text-align: center;">Dados do Usuário</h4>
							</div>
							<div class="panel-body">
								<div class="row">
									<div class="col-md-6">
										<div class="input-group">
											<span class="input-group-addon" id="basic-addon1">Nome do Usuário:</span>
											<input type="text"	class="form-control" placeholder="Informe o nome do usuário" aria-describedby="basic-addon1"
											  id='nomeUsuario' name="nomeUsuario" value="${nome}">
										</div>
									</div>
									<div class="col-md-6">
										<div class="input-group">
											<span class="input-group-addon" id="basic-addon1">Login:</span>
											<input type="text"	class="form-control" placeholder="Informe o login" aria-describedby="basic-addon1"
											  id='nomeLogin' name="nomeLogin" value="${login}">
										</div>
									</div>
								</div>
								<div class="row" style="padding-top:10px;">

									<div class="col-md-6">
										<div class="input-group">
											<span class="input-group-addon" id="basic-addon1">Senha:</span>
											<input type="password"	class="form-control" placeholder="Informe a senha" aria-describedby="basic-addon1"
											  id='senha' name="senha">
										</div>
									</div>
									<div class="col-md-6">
										<div class="input-group">
											<span class="input-group-addon" id="basic-addon1">E-mail:</span>
											<input type="email"	class="form-control" placeholder="INFORME O EMAIL" aria-describedby="basic-addon1"
											  id='email' name="email" value="${email}">
										</div>
									</div>
<!-- 									<a style="float:left; font-size: 25px;" href="#" data-toggle="tooltip" data-placement="top" title="Pesquisar o Usuário" onclick="javascript:consultar()"><i class="icon-search"></i></a> -->
								</div>
								<div class="row" style="padding-top:10px;">
	
									<div class="col-md-6">
										<div class="input-group">
											<span class="input-group-addon" id="basic-addon1">Telefone:</span>
											<input type="text"	class="form-control" placeholder="Informe o telefone" aria-describedby="basic-addon1"
											  id='telefone' name="telefone" value="${telefone}"
											  onKeyDown="Mascara(this,mtel);" onKeyPress="Mascara(this,mtel);" onKeyUp="Mascara(this,mtel);" maxlength="15" size="15">
										</div>
									</div>
								</div>
							</div>
						</div>
				</div>
				<div class="panel-footer" style="text-align: center;">
					<input type="button" class="btn btn-primary" id="CADASTRAR_USUARIO" onclick="javascript:cadastrarUsuario();" value='CADASTRAR' />
					<input type="button" class="btn btn-primary" onclick="javascript:voltarHome();" value="VOLTAR"/>
					<br/>
				</div>
			</div>
		</div>
			      
      ${footer}
		
	</form>
</body>
</html>
