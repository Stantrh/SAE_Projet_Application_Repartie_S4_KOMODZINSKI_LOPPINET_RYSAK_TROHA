package Serveur;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import Service.ServiceBDD;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringReader;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import java.nio.charset.StandardCharsets;

public class PostHandler implements HttpHandler {
    private final ServiceBDD serviceBDD;

    public PostHandler(ServiceBDD service) {
        super();
        this.serviceBDD = service;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("POST".equals(exchange.getRequestMethod())) {
            InputStream requestBody = exchange.getRequestBody();
            System.out.println(requestBody);
            String body = new String(requestBody.readAllBytes());
            System.out.println(body);
            if(body.isEmpty()){
                exchange.sendResponseHeaders(400, 0);
                String response = "Body required";
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(response.getBytes());
                }
                return;
            }
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

                String response = serviceBDD.reserverTable(nom, prenom, nbPersonne, tel, idRestaurant);
                if (response.isEmpty()) {
                    exchange.sendResponseHeaders(400, 0);
                    String responseString = "Votre reservation n'a pas pu être effectuee";
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(responseString.getBytes());
                    }
                    return;
                }

                String responseOk="Réservation réussie";
                // Il faut standardiser car les accents ont une longueur d'octets. L'utf8 prend en charge les accents
                byte[] responseBytes = responseOk.getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(200, responseBytes.length);

                try (OutputStream os = exchange.getResponseBody()) {                    
                    os.write(responseOk.getBytes());
                }
            } catch (NullPointerException e) {
                exchange.sendResponseHeaders(400, 0);
                String response = "Les attributs nom, prenom, nbPersonne, idRestaurant et tel sont obligatoires.";
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