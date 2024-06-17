package ServiceDonneesBloquees;

import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 * Interface qui permet au service l'implémenter de récupérer des données bloquées par un navigateur
 */
public interface DataService extends Remote {

    /**
     * Méthode qui retourne le résultat d'une requête à une API dont les données sont bloquées pour
     * un navigateur
     * @param apiUrl
     * @return
     * @throws RemoteException
     */
    String fetchData(String apiUrl) throws RemoteException;
}
