package Serveur;


import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import ServiceDonneesBloquees.DataService;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class GetDataHandler implements HttpHandler {
    private final DataService serviceData;
    private String url;

    public GetDataHandler(DataService serviceData, String url){
        super();
        this.serviceData = serviceData;
        this.url = url;
    }
    @Override
    public void handle(HttpExchange exchange) throws IOException {
            if("GET".equals(exchange.getRequestMethod())){
            try{
                String response = this.serviceData.fetchData(url);
                // Il faut standardiser car les accents ont une longueur d'octets. L'utf8 prend en charge les accents
                byte[] responseBytes = response.getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(200, responseBytes.length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }catch (Exception e){
                exchange.sendResponseHeaders(500, 0);
                String response = "Erreur, lors de l'accès aux de données : "+e.getMessage();
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
