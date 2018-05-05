package br.com.estacio.Dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import javax.naming.NamingException;

import br.com.estacio.bean.ProdutoBean;
import br.com.estacio.factory.ConnectionFactoryDB;
import br.com.estacio.factory.util.ParamDAO;

public class ProdutoDao extends ConnectionFactoryDB {
	private static ProdutoDao instance;

	public static ProdutoDao getInstance() {
		if (instance == null) {
			instance = new ProdutoDao();
		}
		return instance;
	}

	public String cadastrarProduto(ProdutoBean produto) throws Exception {
		try {
			StringBuilder sb = new StringBuilder();
			
			sb.append("INSERT INTO EAD_CAD_PRODUTOS ");
			sb.append("(PROD_NOME,");
			sb.append("PROD_VALOR, ");
			sb.append("PROD_STATUS,");
			sb.append("PROD_DT_INCL,");
			sb.append("PROD_CAD_USER,");
			sb.append("PROD_COD_ID)");
			sb.append("VALUES(?, ?, ? , SYSDATE, ?,?)");

			ParamDAO[] params = new ParamDAO[5];

			params[0] = new ParamDAO(produto.getNomeProduto().trim(), Types.VARCHAR);
			params[1] = new ParamDAO(produto.getValorProduto(), Types.DECIMAL);
			params[2] = new ParamDAO(produto.getStatus(), Types.CHAR);
			params[3] = new ParamDAO(produto.getUsuarioIncl(), Types.VARCHAR);
			params[4] = new ParamDAO(produto.getCodProduto().trim(), Types.VARCHAR);

			super.executeUpdate(sb.toString(), params);
		} catch (Exception ex) {
			return "3";
		}
		return "1";
	}

	public ResultSet consultarProdutoPorCodigo(ProdutoBean produto) throws NamingException, SQLException, ClassNotFoundException {
		StringBuilder sb = new StringBuilder();

		sb.append("SELECT * FROM EAD_CAD_PRODUTOS WHERE PROD_COD_ID = ? ");

		ParamDAO[] params = new ParamDAO[1];

		params[0] = new ParamDAO(produto.getCodProduto(), Types.VARCHAR);

		ResultSet rs = super.executeQuery(sb.toString(), params);

		return rs;
	}
	
	public ResultSet listarProdutoPorStatus(String idProduto,
			String status) throws NamingException, SQLException,
			ClassNotFoundException {

		List<ParamDAO> listParam = new ArrayList<ParamDAO>();
		StringBuilder sb = new StringBuilder();

		sb.append(" SELECT PROD_ID, PROD_VALOR, PROD_COD_ID, PROD_NOME, PROD_STATUS, PROD_CAD_USER, ");
		sb.append("        TO_CHAR(PROD_DT_INCL,'DD/MM/YYYY HH24:MI:SS') PROD_DT_INCL");
		sb.append("   FROM EAD_CAD_PRODUTOS");
		if (idProduto != null && !idProduto.equals("")) {
			sb.append("  WHERE PROD_ID =  ?");
			listParam.add(new ParamDAO(Integer.parseInt(idProduto),
					Types.INTEGER));
			if (status != null && !status.equals("")
					&& !status.equals("2")) {
				sb.append("    AND PROD_STATUS = ?");
				listParam.add(new ParamDAO(status, Types.VARCHAR));
			}
		} else {
			if (!status.equals("2")) {
				sb.append(" WHERE PROD_STATUS = ?");
				listParam.add(new ParamDAO(status, Types.VARCHAR));
			}else{
				sb.append(" WHERE PROD_STATUS NOT IN (?)");
				listParam.add(new ParamDAO(status, Types.VARCHAR));
			}
		}

		ParamDAO[] params = new ParamDAO[1];
		params = listParam.toArray(params);

		ResultSet rs = super.executeQuery(sb.toString(), params);

		return rs;
	}

	public ResultSet consultarProdPorID(String id) throws NamingException,
			SQLException, ClassNotFoundException {

		StringBuilder sb = new StringBuilder();

		sb.append(" SELECT PROD_ID, PROD_VALOR, PROD_COD_ID, PROD_NOME, PROD_STATUS, PROD_CAD_USER, ");
		sb.append("        TO_CHAR(PROD_DT_INCL,'DD/MM/YYYY HH24:MI:SS') PROD_DT_INCL");
		sb.append("   FROM EAD_CAD_PRODUTOS");
		sb.append("  WHERE PROD_ID =  ?");

		ParamDAO[] params = new ParamDAO[1];

		params[0] = new ParamDAO(Integer.parseInt(id), Types.INTEGER);

		ResultSet rs = super.executeQuery(sb.toString(), params);

		return rs;
	}

	public ResultSet alterarProd(ProdutoBean entd) throws NamingException,
			SQLException, ClassNotFoundException {

		String query = "UPDATE EAD_CAD_PRODUTOS SET  PROD_NOME = ?,PROD_VALOR = ?, PROD_STATUS = ? WHERE PROD_ID = ?";

		ParamDAO[] params = new ParamDAO[4];
		params[0] = new ParamDAO(entd.getNomeProduto(), Types.VARCHAR);
		params[1] = new ParamDAO(entd.getValorProduto(), Types.DECIMAL);
		params[2] = new ParamDAO(entd.getStatus(),  Types.CHAR);
		params[3] = new ParamDAO(entd.getIdProduto(), Types.INTEGER);
		
		ResultSet rs = super.executeQueryConnected(query, params); 
		return rs;
	}

	
	public ResultSet excluir(ProdutoBean entd) throws NamingException,
	SQLException, ClassNotFoundException {

	String query = " DELETE FROM EAD_CAD_PRODUTOS WHERE PROD_ID  = ?";
	
	ParamDAO[] params = new ParamDAO[1];
	params[0] = new ParamDAO(entd.getIdProduto(), Types.INTEGER);
	
	
	ResultSet rs = super.executeQueryConnected(query, params); 
	return rs;
	}
	
	public ResultSet listarProdutoPorStatus()
			throws ClassNotFoundException, NamingException, SQLException {

		StringBuilder sb = new StringBuilder();

		sb.append(" SELECT PROD_ID, PROD_NOME, PROD_VALOR, PROD_COD_ID, PROD_STATUS, PROD_CAD_USER, ");
		sb.append("        TO_CHAR(PROD_DT_INCL,'DD/MM/YYYY HH24:MI:SS') PROD_DT_INCL");
		sb.append("   FROM EAD_CAD_PRODUTOS");

		ResultSet rs = super.executeQuery(sb.toString());

		return rs;
	}

	public ResultSet consultarProduto(ProdutoBean prod)
			throws NamingException, SQLException, ClassNotFoundException {

		StringBuilder sb = new StringBuilder();

		sb.append(" SELECT PROD_ID, PROD_NOME, PROD_VALOR, PROD_COD_ID, PROD_STATUS, PROD_CAD_USER, ");
		sb.append("        TO_CHAR(PROD_DT_INCL,'DD/MM/YYYY HH24:MI:SS') PROD_DT_INCL");
		sb.append("   FROM  EAD_CAD_PRODUTOS");
		sb.append("  WHERE PROD_NOME =  ?");
		sb.append("    AND PROD_STATUS = ?");

		ParamDAO[] params = new ParamDAO[2];

		params[0] = new ParamDAO(prod.getNomeProduto(), Types.VARCHAR);
		params[1] = new ParamDAO(prod.getStatus(), Types.VARCHAR);

		ResultSet rs = super.executeQuery(sb.toString(), params);

		return rs;
	}
	
	

}
