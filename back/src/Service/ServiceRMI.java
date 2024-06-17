package Service;

// import oracle.jdbc.driver.json.Jsonp;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface ServiceRMI extends Remote {

    public String getAllRestaurant() throws RemoteException;
    public String reserverTable(String nom, String prenom, int nbPersonne, String tel, int idRestaurant) throws RemoteException;
    public String ajouterRestaurant(String nom, String adresse, Double latitude, Double longitude) throws RemoteException;
}
