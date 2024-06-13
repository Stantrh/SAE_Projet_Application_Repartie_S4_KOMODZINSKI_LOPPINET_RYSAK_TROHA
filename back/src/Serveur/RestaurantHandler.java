package Serveur;

import Service.ServiceRMI;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import oracle.jdbc.driver.json.Jsonp;

import java.io.IOException;
import java.io.OutputStream;

public class RestaurantHandler implements HttpHandler {
    private ServiceRMI serviceRMI;

    public RestaurantHandler(ServiceRMI service){
        super();
        this.serviceRMI = service;
    }
    @Override
    public void handle(HttpExchange exchange) throws IOException {
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
    }
}
