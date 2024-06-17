package Serveur;


import java.io.IOException;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import Service.ServiceRMI;
public class LancerHttpServer {
    public static void main(String[] args) {
        int port =0;
        if( args.length>1){
            port = Integer.parseInt(args[1]);
        }
        try {
            Registry reg = LocateRegistry.getRegistry(args[0],port);
            try {
                ServiceRMI serviceRMI = (ServiceRMI)reg.lookup("DistributeurRMI");
                try{
                    ServiceHttpRestaurant service = new ServiceHttpRestaurant(serviceRMI);
                    service.lancerServer();
                }catch (IOException e){
                    System.out.println("Erreur lors du lancement du Serveur");
                }
            }catch (NotBoundException e){
                System.out.println("Impossible de trouver le service DistributeurRMI dans l'annuaire");
            }
        }catch (RemoteException e){
            System.out.println("Problème de connexion à l'annuaire");
        }catch (IndexOutOfBoundsException e){
            System.out.println("Veuillez renseignez l'adresse ip de l'hôte du service et éventuellement le port");
        }

    }
}
