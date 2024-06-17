package Service;

import java.rmi.RemoteException;
import Service.ServiceRMI;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class LancerServiceRMI {

    public static void main(String[] args) {
        try {
            Registry reg = LocateRegistry.getRegistry("localhost");
            try {
                ServiceRestaurant service = new ServiceRestaurant(args[0], args[1]);
                System.out.println(service.getAllRestaurant());
                System.out.println(service.getAllRestaurant());
                ServiceRMI rd1 = (ServiceRMI) UnicastRemoteObject.exportObject(service, 0);
                reg.rebind("DistributeurRMI", rd1);
                System.out.println("Le serveur est lancé!");
            } catch (RemoteException e) {
                e.printStackTrace();
            }
        } catch (RemoteException e) {
            System.out.println("Problème de connexion à l'annuaire");
        }
    }
}
