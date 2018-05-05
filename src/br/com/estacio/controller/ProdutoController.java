package br.com.estacio.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.naming.NamingException;

import br.com.estacio.bean.ProdutoBean;
import br.com.estacio.controller.rep.ProdutoControllerRep;

public class ProdutoController {
	private static ProdutoController instance;

	public static ProdutoController getInstance() {
		if (instance == null) {
			instance = new ProdutoController();
		}
		return instance;
	}

	public String cadastrarProduto(ProdutoBean produto)
			throws ClassNotFoundException, NamingException, SQLException {
		String msg = null;
		ProdutoControllerRep controllerRep = ProdutoControllerRep.getInstance();

		msg = controllerRep.cadastrarProduto(produto);

		return msg;
	}
	
	
	public List<ProdutoBean> listarProdutoPorStatus(String idProduto,
			String status) throws NamingException, SQLException, IOException,
			ClassNotFoundException {

		List<ProdutoBean> lista = null;
		ProdutoControllerRep rep = ProdutoControllerRep.getInstance();

		lista = rep.listarProdutoPorStatus(idProduto, status);

		return lista;
	}

	public ProdutoBean consultarProdPorID(String id) throws NamingException,
			SQLException, IOException, ClassNotFoundException {

		ProdutoBean entd = null;
		ProdutoControllerRep rep = ProdutoControllerRep.getInstance();

		entd = rep.consultarProdPorID(id);

		return entd;
	}

	public String alterarProd(ProdutoBean ent) {
		ProdutoControllerRep rep = ProdutoControllerRep.getInstance();
		String msg = null;

		msg = rep.alterarProd(ent);

		return msg;
	}
	
	
	public String excluir(ProdutoBean ent) {
		ProdutoControllerRep rep = ProdutoControllerRep.getInstance();
		String msg = null;

		msg = rep.excluir(ent);

		return msg;
	}
	
	
	
	public List<ProdutoBean> listarProdutoPorStatus() throws NamingException, SQLException, IOException,
			ClassNotFoundException {

		List<ProdutoBean> lista = null;
		ProdutoControllerRep rep = ProdutoControllerRep.getInstance();

		lista = rep.listarProdutoPorStatus();

		return lista;
	}
	
	public ProdutoBean consultarProduto(ProdutoBean prd)
			throws NamingException, SQLException, IOException,
			ClassNotFoundException {

		ProdutoBean produto = null;
		ProdutoControllerRep rep = ProdutoControllerRep.getInstance();

		produto = rep.consultarProduto(prd);

		return produto;
	}

}
