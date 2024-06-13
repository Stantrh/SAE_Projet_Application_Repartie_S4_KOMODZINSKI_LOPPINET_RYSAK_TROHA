package Service;

import oracle.jdbc.driver.json.Jsonp;

import java.rmi.RemoteException;

public class ServiceRestaurant implements ServiceRMI{
    @Override
    public String getAllRestaurant() throws RemoteException {
        return null;
    }

    @Override
    public String reserverTable(String nom, String prenom, int nbPersonne, int tel) throws RemoteException {
        return null;
    }
}
