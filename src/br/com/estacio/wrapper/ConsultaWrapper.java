package br.com.estacio.wrapper;

import org.displaytag.decorator.TableDecorator;

import br.com.estacio.bean.ProdutoBean;


public class ConsultaWrapper extends TableDecorator {



	public String getStatusProd() {
		Object obj = this.getCurrentRowObject();
		String situacao = "";
		String status = "";
		if (obj instanceof ProdutoBean) {
			ProdutoBean beanProduto = (ProdutoBean) obj;
			status = beanProduto.getStatus();
			if (status != null) {
				switch (status) {
				case "A":
					situacao = "<p class=\"atendimento\">ATIVO</p>";
					break;
				case "I":
					situacao = "<p class=\"cancelado\">INATIVO</p>";
					break;

				}

			}
		}
		return situacao;
	}
	
	
	public String getValorProd() {
		Object obj = this.getCurrentRowObject();
		double valor = 0;
		if (obj instanceof ProdutoBean) {
			ProdutoBean beanProduto = (ProdutoBean) obj;
			valor = beanProduto.getValorProduto();

		}
		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append("<fmt:formatNumber value = \"${");
		stringBuilder.append(valor);
		stringBuilder.append("}\" type = \"currency\"/>");
		return stringBuilder.toString();
	}

	
	public String getAcoesProd() throws Exception {

		Object obj = this.getCurrentRowObject();
		String funcaoAlterar = "";
		int idProduto = 0;
		String msgRetorno = "";
		String funcaoExcluir = "";
		if (obj instanceof ProdutoBean) {
			ProdutoBean ent = (ProdutoBean) obj;
			idProduto = ent.getIdProduto();

			funcaoAlterar = "href ='javascript:alterarProduto(\"" + idProduto + "\")'";
			funcaoExcluir  = "href ='javascript:excluirProduto(\"" + idProduto + "\")'" ;
			msgRetorno = "<a " + funcaoAlterar + "><p>Alterar</p></a>"+"<a " + funcaoExcluir + "><p>Excluir</p></a>";
		}

		return msgRetorno;
	}

}