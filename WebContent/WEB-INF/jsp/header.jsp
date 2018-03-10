<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script src="js/html5shiv.js"></script>
<script src="js/respond.js"></script>
<link href="css/header.css" rel="stylesheet">
<!-- Avisando ao navegador sobre responsividade -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- /Avisando ao navegador sobre responsividade -->
<div class="header1">
	<section class="header2">
		<header>
			<div class="container">
				<div class="row">
					<c:forEach var="lista" items="${usuarioLogado}">
						<h6 style="color: white; text-align: right;">Usuario Logado:
							${lista.nome}</h6>

					</c:forEach>



					<div>
						<h3 style="color: white; text-align: center;">Projeto E
							Implementação Orientado A Objetos</h3>
					</div>
				</div>




			</div>
		</header>
	</section>
	<script type="text/javascript" src="js/header.js"></script>


</div>
