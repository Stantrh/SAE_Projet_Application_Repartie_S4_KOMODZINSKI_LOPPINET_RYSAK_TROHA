package Service;

import java.rmi.RemoteException;
import Service.ServiceRMI;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class LancerServiceRMI {

    public static void main(String[] args) {
        try {
            Registry reg = LocateRegistry.getRegistry("localhost"); // Créer un registre sur le port 1099
            try {
                ServiceRestaurant service = new ServiceRestaurant(args[0], args[1]);
                System.out.println(service.getAllRestaurant());
                
                ServiceRMI rd1 = (ServiceRMI) service;
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
