package Service;

import oracle.jdbc.driver.json.Jsonp;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface ServiceRMI extends Remote {

    public Jsonp getAllRestaurant() throws RemoteException;

    public Jsonp reserverTable(String nom, String prenom, int nbPersonne, int tel) throws RemoteException;
}
