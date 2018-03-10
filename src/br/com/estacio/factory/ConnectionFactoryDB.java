package br.com.estacio.factory;

import java.io.ByteArrayInputStream;
import java.io.UnsupportedEncodingException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Time;
import java.sql.Timestamp;
import java.sql.Types;

import javax.naming.NamingException;
import javax.sql.rowset.CachedRowSet;



import com.sun.rowset.CachedRowSetImpl;

import br.com.estacio.factory.util.ParamDAO;


public abstract class ConnectionFactoryDB {

	protected Connection getConexao() throws NamingException, SQLException, ClassNotFoundException {

		Connection conexao = null;

		String strServer = "127.0.0.1";
		String strUsuario = "system";
		String strDatabase = "xe";
		String strSenha = "admin";

		try {
			DriverManager.registerDriver(new oracle.jdbc.driver.OracleDriver());
			conexao = DriverManager.getConnection("jdbc:oracle:thin:@" + strServer + ":1521/" + strDatabase, strUsuario,
					strSenha);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return conexao;
	}

	public CachedRowSet executeQuery(String strStatment) throws NamingException, SQLException, ClassNotFoundException {
		return executeQuery(strStatment, null);
	}

	public CachedRowSet executeQuery(String strStatment, ParamDAO[] params)
			throws NamingException, SQLException, ClassNotFoundException {

		CachedRowSet crs = null;

		Connection conn = getConexao();
		try {

			PreparedStatement psmt = conn.prepareStatement(strStatment);
			try {

				setStatementParams(params, psmt);

				ResultSet rs;
				try {
					rs = psmt.executeQuery();
				} catch (SQLException e) {
					tratarExcecao(strStatment, params);
					throw e;
				}

				try {
					crs = new CachedRowSetImpl();
					crs.populate(rs);
				} finally {
					rs.close();
				}

			} finally {
				psmt.close();
			}

		} finally {
			conn.close();
		}

		return crs;
	}

	public ResultSet executeQueryConnected(String strStatment, ParamDAO[] params)
			throws NamingException, SQLException, ClassNotFoundException {

		Connection conn = getConexao();

		PreparedStatement psmt = conn.prepareStatement(strStatment);
		setStatementParams(params, psmt);

		ResultSet rs;
		try {
			rs = psmt.executeQuery();
		} catch (SQLException e) {
			tratarExcecao(strStatment, params);
			throw e;
		}

		return rs;
	}

	public void executeQueryNoResult(String strStatment, ParamDAO[] params)
			throws NamingException, SQLException, ClassNotFoundException {

		Connection conn = getConexao();
		try {

			PreparedStatement psmt = conn.prepareStatement(strStatment);
			try {
				setStatementParams(params, psmt);

				try {
					psmt.execute();
				} catch (SQLException e) {
					tratarExcecao(strStatment, params);
					throw e;
				}

			} finally {
				psmt.close();
			}

		} finally {
			conn.close();
		}
	}

	public int executeUpdate(String strStatment, ParamDAO[] params)
			throws NamingException, SQLException, ClassNotFoundException {
		int linhasAfetadas = 0;

		Connection conn = getConexao();
		try {

			PreparedStatement psmt = conn.prepareStatement(strStatment);
			try {

				setStatementParams(params, psmt);

				try {
					linhasAfetadas = psmt.executeUpdate();
				} catch (SQLException e) {
					tratarExcecao(strStatment, params);
					throw e;
				}

			} finally {
				psmt.close();
			}

		} finally {
			conn.close();
		}

		return linhasAfetadas;
	}

	public long executeUpdateAutoInc(String strStatment, ParamDAO[] params)
			throws NamingException, SQLException, ClassNotFoundException {

		Connection conn = getConexao();
		long autoInc = 0;

		try {

			PreparedStatement psmt = conn.prepareStatement(strStatment, Statement.RETURN_GENERATED_KEYS);
			try {

				setStatementParams(params, psmt);
				psmt.execute();

				ResultSet rs;
				try {
					rs = psmt.getGeneratedKeys();
				} catch (SQLException e) {
					tratarExcecao(strStatment, params);
					throw e;
				}

				try {
					rs.next();
					autoInc = rs.getLong(1);
				} finally {
					rs.close();
				}

			} finally {
				psmt.close();
			}

		} finally {
			conn.close();
		}

		return autoInc;
	}

	public boolean executeCallable(String strStatment, ParamDAO[] params)
			throws NamingException, SQLException, ClassNotFoundException {

		boolean sucesso = false;

		Connection conn = getConexao();
		try {

			CallableStatement csmt = conn.prepareCall(strStatment);
			try {

				setStatementParams(params, csmt);
				if (csmt.execute()) {
					sucesso = true;
					setStatementOutParams(params, csmt);
				}

			} finally {
				csmt.close();
			}

		} finally {
			conn.close();
		}

		return sucesso;
	}

	private void setStatementParams(ParamDAO[] params, PreparedStatement psmt) throws SQLException {

		if (params != null) {

			for (int i = 0; i < params.length; i++) {
				ParamDAO p = params[i];
				if ((p != null) && p.isSaida()) {
					((CallableStatement) psmt).registerOutParameter(i + 1, p.getTipo());
				} else {
					setInParamValue(psmt, i + 1, p);
				}
			}

		}
	}

	private void setInParamValue(PreparedStatement psmt, int parameterIndex, ParamDAO p) throws SQLException {

		if (p.getValor() == null) {
			psmt.setNull(parameterIndex, p.getTipo());
		} else {

			switch (p.getTipo()) {
			case Types.INTEGER:
				psmt.setInt(parameterIndex, (Integer) p.getValor());
				break;
			case Types.SMALLINT:
			case Types.TINYINT:
				psmt.setShort(parameterIndex, (Short) p.getValor());
				break;
			case Types.BIGINT:
			case Types.NUMERIC:
				psmt.setLong(parameterIndex, (Long) p.getValor());
				break;
			case Types.FLOAT:
				psmt.setFloat(parameterIndex, (Float) p.getValor());
				break;
			case Types.DOUBLE:
			case Types.REAL:
			case Types.DECIMAL:
				psmt.setDouble(parameterIndex, (Double) p.getValor());
				break;
			case Types.VARCHAR:
			case Types.CHAR:
				if (p.getValor() instanceof Character) {
					psmt.setString(parameterIndex, ((Character) p.getValor()).toString());
				} else {
					psmt.setString(parameterIndex, (String) p.getValor());
				}
				break;
			case Types.DATE:
				if (p.getValor() instanceof java.util.Date) {
					psmt.setDate(parameterIndex, new Date(((java.util.Date) p.getValor()).getTime()));
				} else {
					psmt.setDate(parameterIndex, (Date) p.getValor());
				}
				break;
			case Types.TIME:
				psmt.setTime(parameterIndex, (Time) p.getValor());
				break;
			case Types.TIMESTAMP:
				if (p.getValor() instanceof java.util.Date) {
					psmt.setTimestamp(parameterIndex, new Timestamp(((java.util.Date) p.getValor()).getTime()));
				} else {
					psmt.setTimestamp(parameterIndex, (Timestamp) p.getValor());
				}
				break;
			case Types.ARRAY:
			case Types.BINARY:
			case Types.BLOB:
			case Types.CLOB:
			case Types.LONGVARBINARY:
			case Types.LONGVARCHAR:
			case Types.VARBINARY:

				byte[] bytesValor;
				if (p.getValor() instanceof String) {
					try {
						bytesValor = ((String) p.getValor()).getBytes("UTF-8");
					} catch (UnsupportedEncodingException e) {
						throw new SQLException(e.getMessage());
					}
				} else {
					bytesValor = (byte[]) p.getValor();
				}
				ByteArrayInputStream inStream = new ByteArrayInputStream(bytesValor);
				psmt.setBinaryStream(parameterIndex, inStream, bytesValor.length);
				break;
			case Types.BIT:
			case Types.BOOLEAN:
				psmt.setBoolean(parameterIndex, (Boolean) p.getValor());
				break;
			}
		}
	}

	private void setStatementOutParams(ParamDAO[] params, CallableStatement csmt) throws SQLException {

		if (params != null) {
			for (int i = 0; i < params.length; i++) {
				ParamDAO p = params[i];
				if (p.isSaida()) {
					setOutParamValue(csmt, i + 1, p);
				}
			}
		}
	}

	private void setOutParamValue(CallableStatement csmt, int parameterIndex, ParamDAO p) throws SQLException {

		switch (p.getTipo()) {
		case Types.INTEGER:
			p.setValor(csmt.getInt(parameterIndex));
			break;
		case Types.SMALLINT:
		case Types.TINYINT:
			p.setValor(csmt.getShort(parameterIndex));
		case Types.BIGINT:
		case Types.NUMERIC:
		case Types.DECIMAL:
			p.setValor(csmt.getLong(parameterIndex));
			break;
		case Types.FLOAT:
			p.setValor(csmt.getFloat(parameterIndex));
			break;
		case Types.DOUBLE:
		case Types.REAL:
			p.setValor(csmt.getDouble(parameterIndex));
			break;
		case Types.VARCHAR:
		case Types.CHAR:
			p.setValor(csmt.getString(parameterIndex));
			break;
		case Types.DATE:
			p.setValor(csmt.getDate(parameterIndex));
			break;

		case Types.TIME:
			p.setValor(csmt.getTime(parameterIndex));
			break;
		case Types.TIMESTAMP:
			p.setValor(csmt.getTimestamp(parameterIndex));
			break;
		case Types.ARRAY:
		case Types.BINARY:
		case Types.BLOB:
		case Types.CLOB:
		case Types.LONGVARBINARY:
		case Types.LONGVARCHAR:
		case Types.VARBINARY:
			p.setValor(csmt.getBytes(parameterIndex));
			break;
		case Types.BIT:
		case Types.BOOLEAN:
			p.setValor(csmt.getBoolean(parameterIndex));
			break;

		}
	}

	public void closeResultSet(ResultSet rs) throws SQLException {
		if (rs != null) {

			Statement stm = rs.getStatement();
			Connection conn = stm.getConnection();

			try {
				rs.close();
			} finally {
				try {
					stm.close();
				} finally {
					conn.close();
				}
			}
		}
	}

	private void tratarExcecao(String strStatment, ParamDAO[] params) {
		StringBuilder sb = new StringBuilder();
		sb.append("Erro ao executar o SQL: ").append(strStatment);
		sb.append(" - Parâmetros: ");
		int count = 1;
		for (ParamDAO p : params) {
			sb.append("[p").append(count++).append("]: ").append(p.getValor());
		}

	}
}