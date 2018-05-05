package br.com.estacio.servlet;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import br.com.estacio.bean.ProdutoBean;
import br.com.estacio.bean.UsuarioBean;
import br.com.estacio.controller.ProdutoController;


/**
 * @author iago silva
 */
@WebServlet("/produto")
public class Produto extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static final Logger LOG = Logger.getLogger(Produto.class);

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Produto() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		String page = "WEB-INF/jsp/cadProduto.jsp";
		String msg = "";
		try {
			boolean cadastramento = "true".equals(request.getParameter("cadastrar"));
			boolean alterarProd = "true".equals(request.getParameter("alterarProd"));
			boolean excluirProd = "true".equals(request.getParameter("excluirProd"));
			boolean consultarProd = "true".equals(request.getParameter("consultarProd"));
			HttpSession session = request.getSession();
			ProdutoController prodCtr = ProdutoController.getInstance();

			if (cadastramento) {

				ProdutoBean prod = new ProdutoBean();

				String nomeProd = request.getParameter("nomeProd");
				String filtroStatus = request.getParameter("filtroStatus");
				ArrayList<UsuarioBean> regUser = (ArrayList<UsuarioBean>) session.getAttribute("usuarioLogado");
				String usuario = recuperaLogin(regUser);
				String codigoProduto = request.getParameter("codigoProd");
				String valor = request.getParameter("valorProd");
				prod.setNomeProduto(nomeProd);
				prod.setStatus(filtroStatus);
				prod.setValorProduto(Double.valueOf(valor));
				prod.setUsuarioIncl(usuario);
				prod.setCodProduto(codigoProduto);

				msg = prodCtr.cadastrarProduto(prod);

			} else if (alterarProd && consultarProd) {

				String idProd = request.getParameter("idProd");
				ProdutoBean entd = prodCtr.consultarProdPorID(idProd);

				if (entd != null) {
					request.setAttribute("prod", entd);
				}
				request.setAttribute("idProd", idProd);
				page = "WEB-INF/jsp/alterarProd.jsp";
				
			} else if (alterarProd && !consultarProd) {

				ProdutoBean prd = new ProdutoBean();

				String idProduto = request.getParameter("idProduto");

				String nomeProd = request.getParameter("nomeProd");
				String filtroStatus = request.getParameter("filtroStatus");
				String valor = request.getParameter("valorProd");
				prd.setNomeProduto(nomeProd);
				prd.setStatus(filtroStatus);
				prd.setIdProduto(Integer.parseInt(idProduto));
				prd.setValorProduto(Double.valueOf(valor));

				ProdutoBean prod = prodCtr.consultarProduto(prd);
				if (prod == null) {

					msg = prodCtr.alterarProd(prd);
				} else {
					msg = "3";
				}
				page = "WEB-INF/jsp/alterarProd.jsp";
				request.setAttribute("prod", prod);	

			} else if (excluirProd && consultarProd  && !alterarProd) {
				ProdutoBean prd = new ProdutoBean();

				String idProduto = request.getParameter("idProdu");
				prd.setIdProduto(Integer.parseInt(idProduto));
				
				prd = prodCtr.consultarProdPorID(idProduto);
				if (prd!=null) {
					msg = prodCtr.excluir(prd);
					
				} else {
					msg="2";
				}
				
				request.setAttribute("msg", msg);
				page = "WEB-INF/jsp/consProduto.jsp";
			}
			
			
		} catch (Exception e) {
			LOG.error("Erro: " + e.getMessage());
			msg = "Util.ERRO";

		}
		request.setAttribute("msgProduto", msg);
		request.getRequestDispatcher(page).forward(request, response);
	}
	
	
	public String recuperaLogin(ArrayList<UsuarioBean> usuarioBean) {
		
		String usuario = "";
		if (!usuarioBean.isEmpty()) {
			
			for (UsuarioBean usuarios : usuarioBean) {
				usuario = usuarios.getLogin();
			}
			
		}

		return usuario;
	}
	


}
