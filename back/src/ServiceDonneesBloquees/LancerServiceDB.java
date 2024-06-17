package ServiceDonneesBloquees;


import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class LancerServiceDB {

    public static void main(String[] args) {
        try {
            Registry reg = LocateRegistry.getRegistry("localhost"); // Créer un registre sur le port 1099
            try {
                DataService service = new DataServiceImpl();
                String res = service.fetchData("https://www.datagrandest.fr/data4citizen/d4c/api/datasets/1.0/1642070072496-1/alternative_exports/90c43af4-e5b9-4069-8bf1-61a5b900b476/");

                System.out.println(res);


                DataService rd1 = (DataService) service;
                reg.rebind("distributeurDonneesBloquees", rd1);
                System.out.println("Le service est lancé!");
            } catch (RemoteException e) {
                e.printStackTrace();
            }
        } catch (RemoteException e) {
            System.out.println("Problème de connexion à l'annuaire");
        }
    }
}
