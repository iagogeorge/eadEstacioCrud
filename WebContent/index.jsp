<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>

<head>
<meta name="layout" content="main" />

<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />
<link rel="stylesheet" href="css/style2.css" type="text/css" />
<script src="js/utilitarios.js " type="text/javascript"></script>
<script src="js/jsapi.js" type="text/javascript"></script>
<script src="js/jquery/jquery-1.12.3.min.js" type="text/javascript"></script>
<script src="js/bootstrap.min.js" type="text/javascript"></script>
<script src="js/bootstrap/bootbox.min.js" type="text/javascript"></script>


<meta charset="UTF-8">
<title>Login</title>



<link rel="stylesheet" href="outros/css/style.css">


</head>
<script type="text/javascript">
function verificacao() {
var msg = "<%=request.getAttribute("msg")%>";
		if (msg == "2") {
			bootbox
					.alert(
							"email ou senha incorretos, ou usuário ainda não foi cadastrado.",
							function() {
							})
			return false;

		}else if (msg == "3"){
			bootbox
			.alert(
					"Por favor informe seu e-mail e senha cadastrados para ter acesso ao sistema.",
					function() {
					})
	return false;
		}
	}
</script>
<body onload="verificacao();">
	<div class="login">
		<div class="login-triangle"></div>

		<h2 class="login-header">Acesso ao sistema</h2>

		<form method="POST" action="login" class="login-container form-cont"
			>
			<p>
				<input type="email" name="email" placeholder="E-MAIL" value="${email}">
			</p>
			<p>
				<input type="password" name="password" placeholder="Senha" value = "${senha}">
			</p>
			<p>
				<input type="submit" value="Entrar">
			</p>
			<c:url value="/cadUsuario" var="adicionarUsuario"></c:url>
			<p align="center">
				<a href="${adicionarUsuario}">Cadastrar-se</a>
			</p>
			
		</form>
	</div>


	<script
		src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<%@ include file="/WEB-INF/jsp/footer.jsp"%>
</body>

</html>
