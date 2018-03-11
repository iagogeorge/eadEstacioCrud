<%@ taglib uri="/WEB-INF/displaytag" prefix="display"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Cadastro de Produtos</title>
<!-- <link rel="shortcut icon" type="image/x-icon" href="http://www.vemgranderecife.com.br/wp-content/themes/vem-wnts-wp/favicon.ico"> -->
<meta name="layout" content="main" />
<!-- *.css -->
<link rel="stylesheet" href="css/style2.css" type="text/css" />
<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />
<!-- *.fim -->

<!-- *.js -->
<script src="js/utilitarios.js" type="text/javascript"></script>
<script src="js/jsapi.js" type="text/javascript"></script>
<script src="js/jquery/jquery-1.12.3.min.js" type="text/javascript"></script>
<script src="js/bootstrap.min.js" type="text/javascript"></script>
<script src="js/bootstrap/bootbox.min.js" type="text/javascript"></script>
<!--fim dos *.js -->


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

	function navegar(acao) {
		var id = ${id};
		formConsCanal.id.value=id;
		formConsCanal.action = acao;
		formConsCanal.submit();
	}
	
	function verificacao(permissao) {

		ValidarPermissaoUsuario(permissao);
	}


	function alterarCan(idCana) {
		var id = "${id}";
		$("#formConsCanal").append("<input type='hidden' name='idCana' value="+idCana+">");
		formConsCanal.id.value=id;
		formConsCanal.alterarCan.value = "true";
		formConsCanal.consultarCan.value = "true";
		formConsCanal.action = "canal";
		formConsCanal.submit();
	}

	function validarCampo() {
		if ((document.formConsCanal.idCanal.value == "") && (document.formConsCanal.filtroStatus.value == "")) {
			bootbox.alert("Para realizar a consulta é obrigatório informar: um dos filtros!",function(){})
			return false;
		}
		
		return true;
	}

	function consultarC() { 
		var id ="${id}";
		if (validarCampo()) {
			formConsCanal.id.value = id;
			formConsCanal.consultarCan.value = "true";
			formConsCanal.action = "consCanal";
			formConsCanal.submit();
		}
	}

	function goHome() {
		formConsCanal.action = "home";
		formConsCanal.submit();
	}

	function limpar() {
		document.getElementById('idCnl').value = "";
		document.getElementById('filtroStatus').value = "";
	}

	function novoCanal() {

		formConsCanal.action = "canal";
		formConsCanal.submit();

	}

	setTimeout(function() {
		bootbox.alert("Prezado Usuário(a), sua sessão foi expirada!",function() {
					formConsCanal.action = "logout";
					formConsCanal.submit();
				})
	}, 900000);

	function sem_acento(e, args) {
		if (document.all) {
			var evt = event.keyCode;
		} // caso seja IE
		else {
			var evt = e.charCode;
		} // do contrário deve ser Mozilla
		var valid_chars = 'abcdefghijlmnopqrstuvxzwykABCDEFGHIJLMNOPQRSTUVXZWYK- '
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
</script>
</head>
<body>
	<%@ include file="header.jsp"%>

	<form name=formConsCanal method="POST" action="formConsCanal"
		id="formConsCanal" onSubmit="return false;">
		<input type="hidden" name="id"> <input type="hidden"
			name="consultarCan" value="false"> <input type="hidden"
			name="alterarCan" value="false">
		<div class="container" style="padding-top: 60px;">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h4>Consultar Produto</h4>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-md-6" style="margin-left: 24%;">
							<div class="input-group" style="padding-top: 20px;">
								<span class="input-group-addon" id="basic-addon1"
									style="padding-left: 30px;">Tipo:</span> <select
									class="form-control" id="idCnl" name="idCanal"
									style="text-align: center;">
									<option value="">.: SELECIONAR :.</option>
									<%-- 									<c:forEach var="canal" items="${lCan}"> --%>
									<%-- 										<option value="${ canal.idCanal}" --%>
									<%-- 											<c:if test="${canal.idCanal==idcan}">selected</c:if>>${canal.nomeCanal}</option> --%>
									<%-- 									</c:forEach> --%>
								</select>
							</div>
						</div>
					</div>
					<div class="row" style="padding-top: 20px;">
						<div class="col-md-6" style="margin-left: 24%;">
							<div class="input-group">
								<span class="input-group-addon" id="basic-addon1">Status:</span>
								<!-- 								<select class="form-control" id="filtroStatus" -->
								<!-- 									name="filtroStatus" style="text-align: center"> -->
								<!-- 									<option value="">.:SELECIONAR:.</option> -->
								<%-- 									<option value="A" <c:if test="${status=='A'}">selected</c:if>>ATIVO</option> --%>
								<%-- 									<option value="I" <c:if test="${status=='I'}">selected</c:if>>INATIVO</option> --%>
								<%-- 									<option value="2" <c:if test="${status=='2'}">selected</c:if>>AMBOS</option> --%>
								<!-- 								</select> -->
							</div>
						</div>
					</div>
					<div class="row" style="padding-top: 20px;">
						<div class="col-md-12" style="text-align: center;"></div>
					</div>
					<!-- 					<div class="row" style="margin: 0 0 0 0;"> -->
					<%-- 						<% --%>
					// if (session.getAttribute("lEntidade") != null) {
					<%-- 						%> --%>
					<!-- 						<div id="div-grid" class="panel panel-primary" -->
					<!-- 							style="margin-top: 20px;"> -->
					<%-- 							<display:table name="sessionScope.lEntidade" id="row" --%>
					<%-- 								class="table table-bordered" requestURI="/consCanal" --%>
					<%-- 								excludedParams="execCons" --%>
					<%-- 								decorator="br.com.pe.urbana.wrapper.ConsultaWrapper"> --%>
					<%-- 								<display:column property="nomeCanal" class="col-lg-3" --%>
					<%-- 									title="Canal" /> --%>

					<%-- 								<display:column property="statusCanal" class="col-lg-2" --%>
					<%-- 									title="Status" /> --%>
					<%-- 								<display:column property="regUser" class="col-md-2" --%>
					<%-- 									title="USUÁRIO" /> --%>

					<%-- 								<display:column property="regDate" class="col-md-3" --%>
					<%-- 									title="Data de Atualização" /> --%>

					<%-- 								<display:column property="acoesCanal" class="col-md-2" --%>
					<%-- 									title="Ação" /> --%>
					<%-- 							</display:table> --%>
					<!-- 						</div> -->
					<%-- 						<% --%>
					// // // }
					<%-- 						%> --%>
					<!-- 					</div> -->
				</div>
				<div class="panel-footer" style="text-align: center;">
						<input type="button" class="btn btn-primary"onclick="javascript:consultarC();" value="CONSULTAR CANAL" /> 
						<input class="btn btn-primary" type="button" onclick="javascript:limpar()" id="clean" value="LIMPAR" readonly="readonly" name="cmdVoltar"> 
						<input type="button" class="btn btn-primary" onclick="javascript:novoCanal();" value="NOVO" /> <br /> <br />
					<p style="font-size: 16px;"><%=request.getAttribute("msgCanal") != null ? request.getAttribute("msgCanal") : ""%></p>
				</div>
			</div>
		</div>
		${footer}
	</form>
</body>
</html>