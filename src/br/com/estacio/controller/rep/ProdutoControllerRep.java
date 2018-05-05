package br.com.estacio.controller.rep;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.NamingException;

import br.com.estacio.Dao.ProdutoDao;
import br.com.estacio.bean.ProdutoBean;

public class ProdutoControllerRep {

	private static ProdutoControllerRep instance;

	public static ProdutoControllerRep getInstance() {
		if (instance == null) {
			instance = new ProdutoControllerRep();
		}
		return instance;
	}

	public String cadastrarProduto(ProdutoBean produto)
			throws NamingException, SQLException, ClassNotFoundException {
		String msg = null;
		ProdutoDao dao = ProdutoDao.getInstance();
		try {

			List<ProdutoBean> consultarProduto = consultarProdutoPorCodigo(produto);

			if (!consultarProduto.isEmpty()) {
				msg = "2";
			} else {

				msg = dao.cadastrarProduto(produto); 

			}

		} catch (Exception e) {
			msg = "3";

		}
		return msg;
	}

	public List<ProdutoBean> consultarProdutoPorCodigo(ProdutoBean produto)
			throws NamingException, SQLException, ClassNotFoundException {
		ProdutoDao dao = ProdutoDao.getInstance();
		List<ProdutoBean> lista = null;
		ResultSet rs = dao.consultarProduto(produto);
		if (rs != null) {
			lista = new ArrayList<ProdutoBean>();
			while (rs.next()) {
				ProdutoBean retorno = new ProdutoBean();
				retorno.setIdProduto(rs.getInt("PROD_ID"));
				retorno.setNomeProduto(rs.getString("PROD_NOME"));
				retorno.setValorProduto(rs.getDouble("PROD_VALOR"));
				retorno.setStatus(rs.getString("PROD_STATUS"));
				retorno.setCodProduto(rs.getString("PROD_COD_ID"));
				lista.add(retorno);
			}
		}
		return lista;
	}
	
	public List<ProdutoBean> listarProdutoPorStatus(
			String idProduto, String status) {
		ProdutoDao dao = ProdutoDao.getInstance();
		List<ProdutoBean> lista = null;
		try {

			ResultSet rs = dao
					.listarProdutoPorStatus(idProduto, status);

			if (rs != null) {
				lista = new ArrayList<ProdutoBean>();
				while (rs.next()) {
					ProdutoBean entd = new ProdutoBean();

					entd.setIdProduto(rs.getInt("PROD_ID"));
					entd.setNomeProduto(rs.getString("PROD_NOME"));
					entd.setDataHoraIncl(rs.getString("PROD_DT_INCL"));
					entd.setUsuarioIncl(rs.getString("PROD_CAD_USER"));
					entd.setStatus(rs.getString("PROD_STATUS"));
					entd.setValorProduto(rs.getDouble("PROD_VALOR"));
					entd.setCodProduto(rs.getString("PROD_COD_ID"));
					
					lista.add(entd);
				}

			}

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return lista;
	}

	public ProdutoBean consultarProdPorID(String id) {
		ProdutoDao dao = ProdutoDao.getInstance();
		ProdutoBean entd = null;
		try {

			ResultSet rs = dao.consultarProdPorID(id);

			if (rs != null) {

				while (rs.next()) {
					entd = new ProdutoBean();

					entd.setIdProduto(rs.getInt("PROD_ID"));
					entd.setNomeProduto(rs.getString("PROD_NOME"));
					entd.setDataHoraIncl(rs.getString("PROD_DT_INCL"));
					entd.setUsuarioIncl(rs.getString("PROD_CAD_USER"));
					entd.setStatus(rs.getString("PROD_STATUS"));
					entd.setValorProduto(rs.getDouble("PROD_VALOR"));
					entd.setCodProduto(rs.getString("PROD_COD_ID"));

				}

			}

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return entd;
	}

	public String alterarProd(ProdutoBean entd) {
		String msg = null;
		ProdutoDao dao = ProdutoDao.getInstance();
		try {

			dao.alterarProd(entd);
			msg = "1";
		} catch (Exception ex) {
			
			msg = "2";
		}
		return msg;
	}

	
	public String excluir(ProdutoBean entd) {
		String msg = null;
		ProdutoDao dao = ProdutoDao.getInstance();
		try {

			dao.excluir(entd);
			msg = "1";
		} catch (Exception ex) {
			
			msg = "2";
		}
		return msg;
	}

	
	public List<ProdutoBean> listarProdutoPorStatus() {
		ProdutoDao dao = ProdutoDao.getInstance();
		List<ProdutoBean> lista = null;
		try {

			ResultSet rs = dao.listarProdutoPorStatus();

			if (rs != null) {
				lista = new ArrayList<ProdutoBean>();
				while (rs.next()) {
					ProdutoBean entd = new ProdutoBean();

					entd.setIdProduto(rs.getInt("PROD_ID"));
					entd.setNomeProduto(rs.getString("PROD_NOME"));
					entd.setDataHoraIncl(rs.getString("PROD_DT_INCL"));
					entd.setDataHoraIncl(rs.getString("PROD_CAD_USER"));
					entd.setStatus(rs.getString("PROD_STATUS"));
					entd.setValorProduto(rs.getDouble("PROD_VALOR"));
					entd.setCodProduto(rs.getString("PROD_COD_ID"));

					lista.add(entd);
				}

			}

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return lista;
	}
	

	public ProdutoBean consultarProduto(ProdutoBean prod) {
		ProdutoDao dao = ProdutoDao.getInstance();
		ProdutoBean entd = null;
		try {

			ResultSet rs = dao.consultarProduto(prod);

			if (rs != null) {

				while (rs.next()) {
					entd = new ProdutoBean();

					entd.setIdProduto(rs.getInt("PROD_ID"));
					entd.setNomeProduto(rs.getString("PROD_NOME"));
					entd.setDataHoraIncl(rs.getString("PROD_DT_INCL"));
					entd.setUsuarioIncl(rs.getString("PROD_CAD_USER"));
					entd.setStatus(rs.getString("PROD_STATUS"));
					entd.setValorProduto(rs.getDouble("PROD_VALOR"));
					entd.setCodProduto(rs.getString("PROD_COD_ID"));

				}

			}

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return entd;
	}


}
