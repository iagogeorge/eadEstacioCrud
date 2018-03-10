package br.com.estacio.Dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

import javax.naming.NamingException;

import br.com.estacio.bean.UsuarioBean;
import br.com.estacio.factory.ConnectionFactoryDB;
import br.com.estacio.factory.util.ParamDAO;

public class UsuarioSistemaDao extends ConnectionFactoryDB {
	private static UsuarioSistemaDao instance;

	public static UsuarioSistemaDao getInstance() {
		if (instance == null) {
			instance = new UsuarioSistemaDao();
		}
		return instance;
	}

	public void cadastrarUsuarioSistema(UsuarioBean usuario) throws Exception {
		try {
			StringBuilder sb = new StringBuilder();

			sb.append("INSERT INTO EAD_CAD_USER");
			sb.append("(USU_EMAIL, USU_SENHA,");
			sb.append(" USU_NOME, USU_LOGIN, USU_TELEFONE)");
			sb.append(" VALUES (?,?,?,?,?) ");

			ParamDAO[] params = new ParamDAO[5];

			params[0] = new ParamDAO(usuario.getEmail().trim().toLowerCase(), Types.VARCHAR);
			params[1] = new ParamDAO(usuario.getSenha().trim().toLowerCase(), Types.VARCHAR);
			params[2] = new ParamDAO(usuario.getNome().trim().toLowerCase(), Types.VARCHAR);
			params[3] = new ParamDAO(usuario.getLogin().trim().toLowerCase(), Types.VARCHAR);
			params[4] = new ParamDAO(usuario.getFone().trim().toLowerCase(), Types.VARCHAR);

			super.executeUpdate(sb.toString(), params);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public ResultSet consultarLogin(UsuarioBean usuario) throws NamingException, SQLException, ClassNotFoundException {
		StringBuilder sb = new StringBuilder();

		sb.append("SELECT * FROM EAD_CAD_USER WHERE USU_EMAIL = ? ");

		ParamDAO[] params = new ParamDAO[1];

		params[0] = new ParamDAO(usuario.getEmail().trim().toLowerCase(), Types.VARCHAR);

		ResultSet rs = super.executeQuery(sb.toString(), params);

		return rs;
	}

	public ResultSet consultarLoginValido(UsuarioBean usuario)
			throws NamingException, SQLException, ClassNotFoundException {
		StringBuilder sb = new StringBuilder();

		sb.append("SELECT * FROM EAD_CAD_USER WHERE USU_EMAIL = ? AND USU_SENHA = ?");

		ParamDAO[] params = new ParamDAO[2];

		params[0] = new ParamDAO(usuario.getEmail().trim().toLowerCase(), Types.VARCHAR);
		params[1] = new ParamDAO(usuario.getSenha().trim().toLowerCase(), Types.VARCHAR);
		ResultSet rs = super.executeQuery(sb.toString(), params);

		return rs;
	}

}
