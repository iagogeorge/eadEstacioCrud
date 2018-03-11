package br.com.estacio.controller.rep;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.NamingException;

import br.com.estacio.Dao.UsuarioSistemaDao;
import br.com.estacio.bean.UsuarioBean;

public class UsuarioSistemaControllerRep {

	private static UsuarioSistemaControllerRep instance;

	public static UsuarioSistemaControllerRep getInstance() {
		if (instance == null) {
			instance = new UsuarioSistemaControllerRep();
		}
		return instance;
	}

	public String cadastrarUsuarioSistema(UsuarioBean usuario)
			throws NamingException, SQLException, ClassNotFoundException {
		String msg = null;
		UsuarioSistemaDao dao = UsuarioSistemaDao.getInstance();
		try {

			List<UsuarioBean> consultarLogin = consultarLogin(usuario);

			if (!consultarLogin.isEmpty()) {
				msg = "2";
			} else {

				dao.cadastrarUsuarioSistema(usuario);
				msg = "1";

			}

		} catch (Exception e) {
			msg = "3";

		}
		return msg;
	}

	public List<UsuarioBean> consultarLogin(UsuarioBean usuario)
			throws NamingException, SQLException, ClassNotFoundException {
		UsuarioSistemaDao dao = UsuarioSistemaDao.getInstance();
		List<UsuarioBean> lista = null;
		ResultSet rs = dao.consultarLogin(usuario);
		if (rs != null) {
			lista = new ArrayList<UsuarioBean>();
			while (rs.next()) {
				UsuarioBean retorno = new UsuarioBean();

				retorno.setEmail(rs.getString("USU_EMAIL"));

				lista.add(retorno);
			}
		}
		return lista;
	}

	public List<UsuarioBean> consultarLoginValido(UsuarioBean usuario)
			throws NamingException, SQLException, ClassNotFoundException {
		UsuarioSistemaDao dao = UsuarioSistemaDao.getInstance();
		List<UsuarioBean> lista = null;
		ResultSet rs = dao.consultarLoginValido(usuario);
		if (rs != null) {
			lista = new ArrayList<UsuarioBean>();
			while (rs.next()) {
				UsuarioBean retorno = new UsuarioBean();
				
				retorno.setNome(rs.getString("USU_NOME"));
				retorno.setIdUsuario(rs.getString("USU_ID"));
				retorno.setLogin(rs.getString("USU_LOGIN"));
				retorno.setEmail(rs.getString("USU_EMAIL"));
				retorno.setSenha(rs.getString("USU_SENHA"));
				retorno.setFone(rs.getString("USU_TELEFONE"));

				lista.add(retorno);
			}
		}
		return lista;
	}
}
