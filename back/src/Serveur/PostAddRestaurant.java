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

public class PostAddRestaurant implements HttpHandler {
    private final ServiceBDD serviceBDD;

    public PostAddRestaurant(ServiceBDD service) {
        super();
        this.serviceBDD = service;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("POST".equals(exchange.getRequestMethod())) {
            InputStream requestBody = exchange.getRequestBody();
            String body = new String(requestBody.readAllBytes());
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
                String adresse = jsonObject.getString("adresse");
                Double latitude = jsonObject.getJsonNumber("latitude").doubleValue();
                Double longitude = jsonObject.getJsonNumber("longitude").doubleValue();

                if (nom.isEmpty() || adresse.isEmpty()) {
                    exchange.sendResponseHeaders(400, 0);
                    String response = "Les attributs nom, adresse lagitude et longitude sont obligatoires.";
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(response.getBytes());
                    }
                    return;
                }
                String response = serviceBDD.ajouterRestaurant(nom, adresse, latitude, longitude);
                System.out.println(response);
                if (response.isEmpty()) {
                    exchange.sendResponseHeaders(400, 0);
                    String responseString = "Votre ajout de restaurant n'a pas pu être effectuee";
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(responseString.getBytes());
                    }
                    return;
                }

                exchange.sendResponseHeaders(200, response.length());
                try (OutputStream os = exchange.getResponseBody()) {                    
                    os.write(response.getBytes());
                }
            } catch (NullPointerException e) {
                exchange.sendResponseHeaders(400, 0);
                String response = "Les attributs nom, adresse lagitude et longitude sont obligatoires.";
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(response.getBytes());
                }
            } catch (NumberFormatException e) {
                exchange.sendResponseHeaders(400, 0);
                String response = "les coordonées ne sont pas des Double";
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