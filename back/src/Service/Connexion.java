package Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Connexion {

    private static Connection connection=null;
    public static Connection makeConnexion(String id, String mdp) throws ClassNotFoundException, SQLException {
        if(connection==null) {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            System.out.println("Driver loaded");
            // établit une connexion
            String url = "jdbc:oracle:thin:@charlemagne.iutnc.univ-lorraine.fr:1521:infodb";
            connection = DriverManager.getConnection(url, id, mdp);
            System.out.println("Database connected");
        }
        return connection;
    }

    public static Connection close(){
        connection=null;
        return connection;
    }
}
