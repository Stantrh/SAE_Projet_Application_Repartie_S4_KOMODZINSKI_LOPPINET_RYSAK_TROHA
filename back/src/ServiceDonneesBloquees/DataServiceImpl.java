package ServiceDonneesBloquees;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class DataServiceImpl extends UnicastRemoteObject implements DataService {

    protected DataServiceImpl() throws RemoteException {
        super();
    }

    @Override
    public String fetchData(String url) throws RemoteException {
        try {
            HttpClient client = HttpClient.newBuilder()
                    .followRedirects(HttpClient.Redirect.ALWAYS) // Suivre les redirections
                    .build();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                return response.body();
            } else {
                throw new RemoteException("Erreur lors de la récupération des données : " + response.statusCode());
            }
        } catch (Exception e) {
            throw new RemoteException("Erreur lors de la récupération des données", e);
        }
    }
}