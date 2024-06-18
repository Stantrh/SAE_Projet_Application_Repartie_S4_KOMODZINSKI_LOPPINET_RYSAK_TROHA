package Serveur;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import Service.ServiceBDD;
import ServiceDonneesBloquees.DataService;
import java.io.IOException;
import java.net.InetSocketAddress;

public class ServiceHttpRestaurant {
    private ServiceBDD serviceBDD;
    private HttpServer server;
    private DataService serviceData;

    public ServiceHttpRestaurant(ServiceBDD serviceBDD, DataService serviceData) throws IOException {
        // ServiceHttpRestaurant.serviceRMI = serviceRMI;
        this.serviceBDD = serviceBDD;
        this.serviceData = serviceData;
        server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/restaurants", new CORSHandler(new RestaurantHandler(serviceBDD)));
        server.createContext("/reserverTable", new CORSHandler(new PostHandler(serviceBDD)));
        server.createContext("/ajouterRestaurant", new CORSHandler(new PostAddRestaurant(serviceBDD)));
        server.createContext("/proxy", new CORSHandler(new ProxyHandler(serviceData))); // Pour la question bonus sur le
                                                                                        // serveur proxy
    }

    public void lancerServer() {
        server.setExecutor(null);
        server.start();
        System.out.println("Serveur démarré sur le port 8080");
        System.out.println("Listening on: " + server.getAddress());
    }

    private class CORSHandler implements HttpHandler {
        private final HttpHandler handler;

        public CORSHandler(HttpHandler handler) {
            this.handler = handler;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            Headers headers = exchange.getResponseHeaders();
            headers.add("Access-Control-Allow-Origin", "*");
            headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            headers.add("Access-Control-Allow-Headers", "Content-Type");

            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            handler.handle(exchange);
        }
    }
}
