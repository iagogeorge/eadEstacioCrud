package br.com.estacio.controller;

import br.com.estacio.controller.rep.UsuarioSistemaControllerRep;
import br.com.estacio.bean.UsuarioBean;
import java.sql.SQLException;
import java.util.List;
import javax.naming.NamingException;

public class UsuarioSistemaController {
	private static UsuarioSistemaController instance;

	public static UsuarioSistemaController getInstance() {
		if (instance == null) {
			instance = new UsuarioSistemaController();
		}
		return instance;
	}

	public String cadastrarUsuarioSistema(UsuarioBean usuario)
			throws ClassNotFoundException, NamingException, SQLException {
		String msg = null;
		UsuarioSistemaControllerRep controllerRep = UsuarioSistemaControllerRep.getInstance();

		msg = controllerRep.cadastrarUsuarioSistema(usuario);

		return msg;
	}

	public List<UsuarioBean> consultarLoginValido(UsuarioBean usuario)
			throws ClassNotFoundException, NamingException, SQLException {
		UsuarioSistemaControllerRep controllerRep = UsuarioSistemaControllerRep.getInstance();
		return controllerRep.consultarLoginValido(usuario);
	}

}
