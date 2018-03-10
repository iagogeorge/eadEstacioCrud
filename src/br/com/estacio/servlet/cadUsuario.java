package br.com.estacio.servlet;

import java.io.IOException;
import java.sql.SQLException;

import javax.naming.NamingException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.estacio.bean.UsuarioBean;
import br.com.estacio.controller.rep.UsuarioSistemaControllerRep;

@WebServlet(urlPatterns = "/cadUsuario")
public class cadUsuario extends HttpServlet {

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String voltar = req.getParameter("voltar");
		boolean cadastrar = "true".equals(req.getParameter("cadastroUsuario"));
		boolean logout = "true".equals(req.getParameter("logout"));

		if (cadastrar) {

			String nome = req.getParameter("nomeUsuario");
			String login = req.getParameter("nomeLogin");
			String senha = req.getParameter("senha");
			String email = req.getParameter("email");
			String fone = req.getParameter("telefone");

			UsuarioBean usuario = new UsuarioBean();
			usuario.setEmail(email);
			usuario.setFone(fone);
			usuario.setLogin(login);
			usuario.setSenha(senha);
			usuario.setNome(nome);

			UsuarioSistemaControllerRep rep = new UsuarioSistemaControllerRep();

			try {
				String resposta = rep.cadastrarUsuarioSistema(usuario);
				req.setAttribute("msgAlerta", resposta);

				System.out.println(resposta);
			} catch (ClassNotFoundException | NamingException | SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (logout) {
			req.getSession().removeAttribute("usuarioLogado");
			RequestDispatcher dispatcher = req.getRequestDispatcher("/index.jsp");
			dispatcher.forward(req, resp);

		}

		if (voltar != null) {

			RequestDispatcher dispatcher = req.getRequestDispatcher("/index.jsp");
			dispatcher.forward(req, resp);

		} else {
			RequestDispatcher dispatcher = req.getRequestDispatcher("/WEB-INF/jsp/cadastroUsuario.jsp");
			dispatcher.forward(req, resp);
		}

	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		doPost(req, resp);

	}

}
