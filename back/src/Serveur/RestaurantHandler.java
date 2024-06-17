package Serveur;


import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import Service.ServiceRMI;
import java.io.IOException;
import java.io.OutputStream;

public class RestaurantHandler implements HttpHandler {
    private final ServiceRMI serviceRMI;

    public RestaurantHandler(ServiceRMI service){
        super();
        this.serviceRMI = service;
    }
    @Override
    public void handle(HttpExchange exchange) throws IOException {
            if("GET".equals(exchange.getRequestMethod())){
            try{
                String restaurants = this.serviceRMI.getAllRestaurant();
                exchange.sendResponseHeaders(200, restaurants.length());
                OutputStream os = exchange.getResponseBody();
                os.write(restaurants.getBytes());
                os.close();
            }catch (Exception e){
                exchange.sendResponseHeaders(500, 0);
                String response = "Erreur, lors de l'accès à la base de donnée : "+e.getMessage();
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        }else{
            exchange.sendResponseHeaders(405, 0);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write("Method Not Allowed".getBytes());
            }
        }
    }
}
