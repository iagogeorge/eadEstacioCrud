package br.com.estacio.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import br.com.estacio.bean.ProdutoBean;
import br.com.estacio.controller.ProdutoController;



/**
 * Servlet implementation class ConsCredenciado
 */
@WebServlet("/consProduto")
public class ConsProduto extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ConsProduto() {
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

		HttpSession session = request.getSession();
		String page = "WEB-INF/jsp/consProduto.jsp";
		boolean consultar = "true".equals(request.getParameter("consultarProd"));
		ProdutoController ctr = ProdutoController.getInstance();
		String msg = null;
		List<ProdutoBean> lEntidade = null;
		try {

			List<ProdutoBean> lProduto = ctr.listarProdutoPorStatus();

			request.setAttribute("lProduto", lProduto);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (consultar) {

			String idProduto = request.getParameter("idProduto");
			String status = request.getParameter("filtroStatus");

			try {
				lEntidade = ctr.listarProdutoPorStatus(idProduto, status);

			} catch (Exception e) {
				e.printStackTrace();
			}

			if (lEntidade.size() > 0) {
				session.setAttribute("lEntidade", lEntidade);
			} else {
				msg = "Produto não encontrado!";
				session.removeAttribute("lEntidade");
				request.setAttribute("msgProduto", msg);
			}

			request.setAttribute("idPrd", idProduto);
			request.setAttribute("status", status);

		} else {

			session.removeAttribute("lEntidade");
			request.removeAttribute("idProduto");
			request.removeAttribute("filtroStatus");

		}

		request.getRequestDispatcher(page).forward(request, response);
	}
}
