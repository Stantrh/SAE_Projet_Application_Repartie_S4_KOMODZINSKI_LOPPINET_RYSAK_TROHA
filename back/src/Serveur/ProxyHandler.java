package Serveur;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import ServiceDonneesBloquees.DataService;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class ProxyHandler implements HttpHandler {
    private final DataService serviceData;

    public ProxyHandler(DataService serviceData) {
        this.serviceData = serviceData;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("GET".equals(exchange.getRequestMethod())) {
            String query = exchange.getRequestURI().getQuery();
            if (query != null && query.startsWith("url=")) {
                String targetUrl = query.substring(4);

                try {
                    String response = serviceData.fetchData(targetUrl);
                    byte[] responseBytes = response.getBytes(StandardCharsets.UTF_8);
                    exchange.getResponseHeaders().add("Content-Type", "application/json");
                    exchange.sendResponseHeaders(200, responseBytes.length);
                    OutputStream os = exchange.getResponseBody();
                    os.write(responseBytes);
                    os.close();
                } catch (Exception e) {
                    exchange.sendResponseHeaders(500, -1);
                    OutputStream os = exchange.getResponseBody();
                    os.write(("Erreur lors de la récupération des données : " + e.getMessage()).getBytes());
                    os.close();
                }
            } else {
                exchange.sendResponseHeaders(400, -1);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write("Bad Request: Missing or invalid 'url' parameter".getBytes());
                }
            }
        } else {
            exchange.sendResponseHeaders(405, -1);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write("Method Not Allowed".getBytes());
            }
        }
    }
}
