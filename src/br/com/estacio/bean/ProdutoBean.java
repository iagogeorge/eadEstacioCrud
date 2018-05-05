package br.com.estacio.bean;

public class ProdutoBean {

/**
 * @author Iago silva
 */

	private int idProduto;
	private String nomeProduto;
	private double valorProduto;
	private String status;
	private String dataHoraIncl;
	private String usuarioIncl;
	private String codProduto;
	
	
	public ProdutoBean() {
		super();
	}
	
	public int getIdProduto() {
		return idProduto;
	}

	public void setIdProduto(int idProduto) {
		this.idProduto = idProduto;
	}

	public String getNomeProduto() {
		return nomeProduto;
	}

	
	
	public String getUsuarioIncl() {
		return usuarioIncl;
	}
	
	
	public String getCodProduto() {
		return codProduto;
	}

	public void setCodProduto(String codProduto) {
		this.codProduto = codProduto;
	}

	public void setUsuarioIncl(String usuarioIncl) {
		this.usuarioIncl = usuarioIncl;
	}

	public void setNomeProduto(String nomeProduto) {
		this.nomeProduto = nomeProduto;
	}

	public double getValorProduto() {
		return valorProduto;
	}

	public void setValorProduto(double valorProduto) {
		this.valorProduto = valorProduto;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDataHoraIncl() {
		return dataHoraIncl;
	}

	public void setDataHoraIncl(String dataHoraIncl) {
		this.dataHoraIncl = dataHoraIncl;
	}

}
