package Serveur;


import com.sun.net.httpserver.HttpServer;

import Service.ServiceBDD;
import Service.ServiceBDD;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.security.Provider.Service;

public class ServiceHttpRestaurant {
    private ServiceBDD serviceBDD;
    private HttpServer server;

    public ServiceHttpRestaurant(ServiceBDD serviceBDD)throws IOException {
        //ServiceHttpRestaurant.serviceRMI = serviceRMI;
        this.serviceBDD = serviceBDD;
        server = HttpServer.create(new InetSocketAddress(8080),0);

        server.createContext("/restaurants", new RestaurantHandler(serviceBDD));
        server.createContext("/reserverTable", new PostHandler(serviceBDD));
        server.createContext("/ajouterRestaurant", new PostAddRestaurant(serviceBDD));

    }
    public void lancerServer(){
        server.setExecutor(null);
        server.start();
        System.out.println("Serveur démarré sur le port 8080");
    }


}
