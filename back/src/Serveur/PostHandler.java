package Serveur;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import Service.ServiceRMI;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringReader;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;

public class PostHandler implements HttpHandler {
    private final ServiceRMI serviceRMI;

    public PostHandler(ServiceRMI service) {
        super();
        this.serviceRMI = service;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("POST".equals(exchange.getRequestMethod())) {
            InputStream requestBody = exchange.getRequestBody();
            String body = new String(requestBody.readAllBytes());

            JsonReader jsonReader = Json.createReader(new StringReader(body));
            JsonObject jsonObject = jsonReader.readObject();

            try {
                String nom = jsonObject.getString("nom");
                String prenom = jsonObject.getString("prenom");
                int nbPersonne = jsonObject.getInt("nbPersonne");
                String tel = jsonObject.getString("tel");
                int idRestaurant = jsonObject.getInt("idRestaurant");

                if (nom.isEmpty() || prenom.isEmpty() || tel.isEmpty()) {
                    exchange.sendResponseHeaders(400, 0);
                    String response = "Les attributs nom, prenom, nbPersonne, idRestaurant et tel sont obligatoires.";
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(response.getBytes());
                    }
                    return;
                }

                String response = serviceRMI.reserverTable(nom, prenom, nbPersonne, tel, idRestaurant);
                if (response.isEmpty()) {
                    exchange.sendResponseHeaders(400, 0);
                    String responseString = "Votre réservation n'a pas pu être effectuée";
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(responseString.getBytes());
                    }
                    return;
                }

                String responseOk="Reservation reussie";

                exchange.sendResponseHeaders(200, responseOk.length());
                try (OutputStream os = exchange.getResponseBody()) {                    
                    os.write(responseOk.getBytes());
                }
            } catch (NullPointerException e) {
                exchange.sendResponseHeaders(400, 0);
                String response = "Les attributs nom, prenom, nbPersonne et tel sont obligatoires.";
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(response.getBytes());
                }
            } catch (NumberFormatException e) {
                exchange.sendResponseHeaders(400, 0);
                String response = "nbPersonne n'est pas un nombre.";
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(response.getBytes());
                }
            } catch (Exception e) {
                exchange.sendResponseHeaders(500, 0);
                String response = "La requête n'a pas pu être menée à bien: " + e.getMessage();
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(response.getBytes());
                }
            }
        } else {
            exchange.sendResponseHeaders(405, 0);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write("Method Not Allowed".getBytes());
            }
        }
    }
}