package br.com.estacio.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.naming.NamingException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import br.com.estacio.bean.UsuarioBean;
import br.com.estacio.controller.rep.UsuarioSistemaControllerRep;

@WebServlet(urlPatterns = "/login")
public class Login extends HttpServlet {

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String msg = null;
		String email = req.getParameter("email");
		String senha = req.getParameter("password");

		if ((email != null && !email.equals("")) && (senha != null && !senha.equals(""))) {
			UsuarioBean usuario = null;
			UsuarioSistemaControllerRep usuarioRep = new UsuarioSistemaControllerRep();
			List<UsuarioBean> listaLogin = null;
			
			usuario = new UsuarioBean();
			usuario.setEmail(email);
			usuario.setSenha(senha);

			try {
				listaLogin = usuarioRep.consultarLoginValido(usuario);

				if (listaLogin.isEmpty()) {
					msg = "2";

					req.setAttribute("msg", msg);

					RequestDispatcher dispatcher = req.getRequestDispatcher("/index.jsp");
					dispatcher.forward(req, resp);

				} else {

					HttpSession session = req.getSession();
					session.setAttribute("usuarioLogado", listaLogin);
					RequestDispatcher dispatcher = req.getRequestDispatcher("/WEB-INF/jsp/consProduto.jsp");
					dispatcher.forward(req, resp);

				}

			} catch (ClassNotFoundException | NamingException | SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}else {
			
			msg  = "3";
			req.setAttribute("msg", msg);
			req.setAttribute("email", email);
			req.setAttribute("password", senha);
			RequestDispatcher dispatcher = req.getRequestDispatcher("/index.jsp");
			dispatcher.forward(req, resp);
			
		}

	}

}
