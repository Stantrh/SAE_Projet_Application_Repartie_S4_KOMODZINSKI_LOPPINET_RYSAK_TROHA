package Serveur;


import com.sun.net.httpserver.HttpServer;

import Service.ServiceBDD;
import ServiceDonneesBloquees.DataService;
import java.io.IOException;
import java.net.InetSocketAddress;


public class ServiceHttpRestaurant {
    private ServiceBDD serviceBDD;
    private HttpServer server;
    private DataService serviceData;
    public ServiceHttpRestaurant(ServiceBDD serviceBDD, DataService serviceData)throws IOException {
        //ServiceHttpRestaurant.serviceRMI = serviceRMI;
        this.serviceBDD = serviceBDD;
        this.serviceData = serviceData;
        server = HttpServer.create(new InetSocketAddress(8080),0);

        server.createContext("/restaurants", new RestaurantHandler(serviceBDD));
        server.createContext("/reserverTable", new PostHandler(serviceBDD));
        server.createContext("/ajouterRestaurant", new PostAddRestaurant(serviceBDD));
        server.createContext("/intervention",new GetDataHandler(serviceData, "https://www.datagrandest.fr/data4citizen/d4c/api/datasets/1.0/1642070072496-1/alternative_exports/90c43af4-e5b9-4069-8bf1-61a5b900b476/"));

    }
    public void lancerServer(){
        server.setExecutor(null);
        server.start();
        System.out.println("Serveur démarré sur le port 8080");
    }


}
