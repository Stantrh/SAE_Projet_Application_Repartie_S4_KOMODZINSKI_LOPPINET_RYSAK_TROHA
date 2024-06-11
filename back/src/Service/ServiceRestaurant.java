package Service;

import oracle.jdbc.driver.json.Jsonp;

import java.rmi.RemoteException;

public class ServiceRestaurant implements ServiceRMI{
    @Override
    public Jsonp getAllRestaurant() throws RemoteException {
        return null;
    }

    @Override
    public Jsonp reserverTable(String nom, String prenom, int nbPersonne, int tel) throws RemoteException {
        return null;
    }
}
