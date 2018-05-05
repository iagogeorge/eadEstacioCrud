<%@ taglib uri="/WEB-INF/displaytag" prefix="display"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Cadastro de Produtos</title>
<meta name="layout" content="main" />
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script src="js/jquery/jquery-1.12.3.min.js" type="text/javascript"></script>
<script src="js/html5shiv.js"></script>
<script src="js/respond.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap/bootbox.min.js" charset=ISO-8859-1></script>
<link href="" type="text/css" media="screen, projection" rel="stylesheet" />
<link href="css/bootstrap.min.css" rel="stylesheet" charset=ISO-8859-1">
<link href="css/style2.css" rel="stylesheet">
<script language="javascript" src="js/Calendario.js" type=""></script>
<script src="js/jquery.mask.min.js"></script>
<script src="js/jquery.min.js"></script>
<script src="js/jquery.maskedinput.js"></script>
<script language="javascript" src="js/utilitarios.js" charset="utf-8" type=""></script>


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

	function alterarProduto(idProduto) {
		var id = "${id}";
		$("#formConsProduto").append("<input type='hidden' name='idProd' value="+idProduto+">");
		formConsProduto.id.value=id;
		formConsProduto.consultarProd.value = "true";
		formConsProduto.alterarProd.value = "true";
		formConsProduto.action = "produto";
		formConsProduto.submit();
	}


	
	function validarCampo() {
		if ((document.formConsProduto.idProduto.value == "") && (document.formConsProduto.filtroStatus.value == "")) {
			bootbox.alert("Para realizar a consulta é obrigatório informar: um dos filtros!",function(){})
			return false;
		}
		
		return true;
	}

	function goHome() {
		formConsProduto.action = "login";
		formConsProduto.submit();
	}

	function limpar() {
		//document.getElementById('idCnl').value = "";
		document.getElementById('filtroStatus').value = "";
	}

	function novoProduto() {

		formConsProduto.action = "produto";
		formConsProduto.submit();

	}


	function consultarProdutos(){ 
		if (validarCampo()){
			formConsProduto.consultarProd.value = "true";
			formConsProduto.action = "consProduto";
			formConsProduto.submit();
		}
	}

	setTimeout(function() {
		bootbox.alert("Prezado Usuário(a), sua sessão foi expirada!",
				function() {
					document.formConsProduto.logout.value = true;
					formConsProduto.action = "logout";
					formConsProduto.submit();
				})
	}, 300000);
	


	function excluirProduto(idPr) {

	    bootbox.confirm({
	        message: "Tem certeza que deseja excluir o produto?",
	        buttons: {
	            confirm: {
	                label: 'Sim',
	                className: 'btn-success'
	            },
	            cancel: {
	                label: 'Não',
	                className: 'btn-danger'
	            }
	        },
	        callback: function (resultado) {
	    		if (resultado) {
		    		var id = "${id}";
		    		$("#formConsProduto").append("<input type='hidden' name='idProduto' value="+idPr+">");
		    		formConsProduto.id.value=id;
		    		formConsProduto.idProdu.value = idPr;
		    		formConsProduto.consultarProd.value = "true";
		    		formConsProduto.excluirProd.value = "true";
		    		formConsProduto.action = "produto";
		    		formConsProduto.submit();
				} 

	        }
	    });

	}


	function verificacao() {
		var msg = "${msgProduto}";
		var id = "${id}";

		if(msg == 1){
			bootbox.alert("Produto excluído com sucesso!",function(){	
				formConsProduto.consultarProd.value = "true";
				formConsProduto.action = "consProduto";
				formConsProduto.submit();
			})	
		}else if(msg == 2) {
			bootbox.alert("Erro ao tentar realizar a exclusão do produto!",function(){	})	
		}
	
	
	}
	
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

<script type="text/javascript">




</script>
</head>
<body onload="verificacao();">
	<%@ include file="header.jsp"%>

	<form name=formConsProduto method="POST" action="formConsProduto"
		id="formConsProduto" onSubmit="return false;">
		<input type="hidden" name="id">
		<input type="hidden" name="idProdu">  
		<input type="hidden" name="consultarProd" value="false"> 
		<input type="hidden" name="alterarProd" value="false">
		<input type="hidden" name="excluirProd" value="false">
		<input type="hidden" id="logout" name="logout" value="false">
		<div class="container" style="padding-top: 60px;">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h4>Consultar Produto</h4>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-md-12">
							<div class="input-group">
								<span class="input-group-addon" id="basic-addon1">
								Produto:
								</span> 
								<select	class="form-control" id="idProduto" name="idProduto"
									style="text-align: center;">
									<option value="">.: SELECIONAR :.</option>
									<c:forEach var="prod" items="${lProduto}">
										<option value="${ prod.idProduto }"
											<c:if test="${prod.idProduto==idPrd}">selected</c:if>>${prod.nomeProduto}</option>
									</c:forEach>
								</select>
							</div>
						</div>
					</div>
					<div class="row" style="margin-top: 10px">
						<div class="col-md-12">
							<div class="input-group">
								<span class="input-group-addon" id="basic-addon1">Status:</span> 
								<select	class="form-control" id="filtroStatus" name="filtroStatus" style="text-align: center">
									<option value="">.:SELECIONAR:.</option>
									<option value="A"
									<c:if test="${status=='A'}">selected</c:if>>ATIVO</option>
									<option value="I"
									<c:if test="${status=='I'}">selected</c:if>>INATIVO</option>
									<option value="2"
									<c:if test="${status=='2'}">selected</c:if>>AMBOS</option>
								</select>
							</div>
						</div>
					</div>
					<div class="row">
					
					</div>
				<div class="row">
				
				<c:if test="${not empty lEntidade}">
				
				<div id="div-grid" class="panel panel-primary"> 
												<display:table name="sessionScope.lEntidade" id="row" 
													class="table table-bordered" requestURI="/consProduto" excludedParams="execCons"
													decorator="br.com.estacio.wrapper.ConsultaWrapper">
													<display:column property="nomeProduto" class="col-md-2" title="Nome Produto" />
													<display:column property="codProduto" class="col-md-2" title="Cod. identificação" />
													<display:column property="valorProduto" class="col-md-2" title="Valor do produto" format="{0, number, R$ ,##0.00}"/>
													<display:column property="statusProd" class="col-md-2" title="status" />
 													<display:column property="acoesProd" class="col-md-2" title="Ação" />  
												</display:table> 
											</div>
										</c:if>		
									</div> 
				</div>
				<div class="panel-footer" style="text-align: center;">
						<input class="btn btn-primary" type="button"  onclick="javascript:consultarProdutos();" value="CONSULTAR PRODUTO" name = "cons"/> 
						<input class="btn btn-primary" type="button" onclick="javascript:limpar();" id="clean" value="LIMPAR" readonly="readonly" name="cmdVoltar"/> 
						<input type="button" class="btn btn-primary" onclick="javascript:novoProduto();" value="NOVO" /> <br /> <br />
					<p style="font-size: 16px;">${msgProduto}</p>
				</div>
			</div>
		</div>
		${footer}
	</form>
</body>
</html>