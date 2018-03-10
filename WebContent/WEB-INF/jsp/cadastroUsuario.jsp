<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Cadastro de Usuários</title>
<!-- <link rel="shortcut icon" type="image/x-icon" href="http://www.vemgranderecife.com.br/wp-content/themes/vem-wnts-wp/favicon.ico"> -->
<meta name="layout" content="main" />
<link rel="stylesheet" href="css/style2.css" type="text/css" />
<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />

<script  src="js/utilitarios.js"type="text/javascript"></script>
<script src="js/jsapi.js" type="text/javascript"></script>
<script src="js/jquery/jquery-1.12.3.min.js" type="text/javascript"></script>
<script src="js/bootstrap.min.js" type="text/javascript"></script>
<script src="js/bootstrap/bootbox.min.js" type="text/javascript"></script>

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
		var id = "<%=request.getAttribute("id")%>";

		 if(msg != "null"){

				bootbox.alert(msg,
						function(){
					$("#formCadUsuario").append("<input type='hidden' name='voltar' value='voltar'>");
					formCadUsuario.action = "cadUsuario";
					formCadUsuario.submit();
				})
			}
	}
	

 	setTimeout(function(){
		bootbox.alert("Prezado Usuário(a), sua sessão foi expirada!",function(){
			document.formCadUsuario.logout.value = true;
			formCadUsuario.action = "cadUsuario";
			formCadUsuario.submit();
		})
	}, 900000);

</script>
</head>
<body onload="verificacao();" style="background-color: #dae0e7">
<%@ include file="header.jsp"%>
	 <form name=formCadUsuario method="post" action="CadastroUsuario" id="formCadUsuario">
		<input type="hidden" id="cadastroUsuario" name="cadastroUsuario" value="false">
		<input type="hidden" id="alterarUsuario" name="alterarUsuario" value="false">
		<input type="hidden" id="vincularClinicas" name="vincularClinicas" value="false">
		<input type="hidden" id="consultar" name="consultar" value="false">
		<input type="hidden" id="vincular" name="vincular" value="false">
		<input type="hidden" id="logout" name="logout" value="false">
		<input type="hidden" id="status2" name="status2" value="false">
		<div class="container">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h4 class="panel-title" style="text-align: center;">Cadastro do Usuário</h4>
				</div>
				<div class="panel-body">

					<div class="panel panel-primary" id="painelUsuarios"">
							<div class="panel-heading">
								<h4 class="panel-title" style="text-align: center;">Dados do Usuário</h4>
							</div>
							<div class="panel-body">
								<div class="row">
									<div class="col-md-6">
										<div class="input-group">
											<span class="input-group-addon" id="basic-addon1">Nome do Usuário:</span>
											<input type="text"	class="form-control" placeholder="Informe o nome do usuário" aria-describedby="basic-addon1"
											  id='nomeUsuario' name="nomeUsuario" value="<%=request.getAttribute("nomeUsuario") != null ? request.getAttribute("nomeUsuario") : ""%>">
										</div>
									</div>
									<div class="col-md-6">
										<div class="input-group">
											<span class="input-group-addon" id="basic-addon1">Login:</span>
											<input type="text"	class="form-control" placeholder="Informe o login" aria-describedby="basic-addon1"
											  id='nomeLogin' name="nomeLogin" value="<%=request.getAttribute("nomeLogin") != null ? request.getAttribute("nomeLogin") : ""%>">
										</div>
									</div>
								</div>
								<div class="row" style="padding-top:10px;">

									<div class="col-md-6">
										<div class="input-group">
											<span class="input-group-addon" id="basic-addon1">Senha:</span>
											<input type="password"	class="form-control" placeholder="Informe a senha" aria-describedby="basic-addon1"
											  id='senha' name="senha" value="<%=request.getAttribute("senha") != null ? request.getAttribute("senha") : ""%>">
										</div>
									</div>
									<div class="col-md-6">
										<div class="input-group">
											<span class="input-group-addon" id="basic-addon1">E-mail:</span>
											<input type="email"	class="form-control" placeholder="INFORME O EMAIL" aria-describedby="basic-addon1"
											  id='email' name="email" value="<%=request.getAttribute("email") != null ? request.getAttribute("email") : ""%>">
										</div>
									</div>
<!-- 									<a style="float:left; font-size: 25px;" href="#" data-toggle="tooltip" data-placement="top" title="Pesquisar o Usuário" onclick="javascript:consultar()"><i class="icon-search"></i></a> -->
								</div>
								<div class="row" style="padding-top:10px;">
	
									<div class="col-md-6">
										<div class="input-group">
											<span class="input-group-addon" id="basic-addon1">Telefone:</span>
											<input type="text"	class="form-control" placeholder="Informe o telefone" aria-describedby="basic-addon1"
											  id='telefone' name="telefone" value="<%=request.getAttribute("telefone") != null ? request.getAttribute("telefone") : ""%>"
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
		<%@ include file="footer.jsp"%>
	</form>
</body>
</html>
