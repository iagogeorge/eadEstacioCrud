package br.com.estacio.factory.util;

import java.sql.Types;


public class ParamDAO {
	private Object valor;

	private int tipo;

	private boolean saida;

	public ParamDAO() {
		this(null, Types.INTEGER);
	}

	public ParamDAO(Object valor, int tipo) {
		this(valor, tipo, false);
	}

	public ParamDAO(Object valor, int tipo, boolean saida) {
		super();
		this.valor = valor;
		this.tipo = tipo;
		this.saida = saida;
	}

	public int getTipo() {
		return tipo;
	}

	public void setTipo(int tipo) {
		this.tipo = tipo;
	}

	public Object getValor() {
		return valor;
	}

	public void setValor(Object valor) {
		this.valor = valor;
	}

	public boolean isSaida() {
		return saida;
	}

	public void setSaida(boolean saida) {
		this.saida = saida;
	}
}