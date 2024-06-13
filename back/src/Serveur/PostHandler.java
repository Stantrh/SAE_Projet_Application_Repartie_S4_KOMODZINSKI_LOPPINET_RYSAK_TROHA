package Serveur;

import Service.ServiceRMI;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringReader;
import javax.json.*;
public class PostHandler implements HttpHandler {
    private ServiceRMI serviceRMI;
    public PostHandler(ServiceRMI service){
        super();
        this.serviceRMI = service;
    }
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("POST".equals(exchange.getRequestMethod())) {
            InputStream resquestBody = exchange.getRequestBody();
            String body =new String (resquestBody.readAllBytes());

            JsonReader jsonReader = Json.createReader(new StringReader(body));

            JsonObject jsonObject = jsonReader.readObject();
            try {
                String nom = jsonObject.getString("nom");
                String prenom = jsonObject.getString("prenom");
                String nbPersonneString = jsonObject.getString("nbPersonne");
                String tel = jsonObject.getString("tel");
                if((nom.isEmpty()) || (prenom.isEmpty()) || (nbPersonneString.isEmpty()) || (tel.isEmpty())) {
                    exchange.sendResponseHeaders(400, 0);
                    String response = "Les attributs nom prenom nbPersonne et tel sont obligatoires.";
                    OutputStream os = exchange.getResponseBody();
                    os.write(response.getBytes());
                    os.close();
                    return;
                }
                int nbPersonne = Integer.parseInt(nbPersonneString);
                exchange.sendResponseHeaders(200, 0);
                String response = "Votre réservation a été effectué avec succès";
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }catch (NullPointerException e){
                System.out.println("Heho");
                exchange.sendResponseHeaders(400, 0);
                String response = "Les attributs nom prenom nbPersonne et tel sont obligatoires.";
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();

            }
            catch (NumberFormatException exp){
                exchange.sendResponseHeaders(400, 0);
                String response = "nbPersonne n'est pas un nombre.";
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
            catch (Exception e){
                exchange.sendResponseHeaders(400, 0);
                String response = "La requête n'a pas pu être mené à bien";
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        }
    }

}
