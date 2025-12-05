package com.App.helper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DatabaseConnectionHelper {

	public static Connection getConnection() {
		String databaseURL = "jdbc:mysql://localhost:3306/electricity_management?serverTimezone=UTC";
		Connection cn = null;
		try {
			cn = DriverManager.getConnection(databaseURL);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return cn;
	}

	public static void closeAllConnection(Connection cn, PreparedStatement ps, ResultSet rs) {
		try {
			if (rs != null) {
				rs.close();
			}
			if (ps != null) {
				ps.close();
			}
			if (cn != null) {
				cn.close();
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
	}
}
