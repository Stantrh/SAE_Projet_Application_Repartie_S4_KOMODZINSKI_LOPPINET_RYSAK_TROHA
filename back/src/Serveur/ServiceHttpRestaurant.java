package Serveur;

import Service.ServiceRMI;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.rmi.RemoteException;

public class ServiceHttpRestaurant {
    private ServiceRMI serviceRMI;
    private HttpServer server;

    public ServiceHttpRestaurant(ServiceRMI serviceRMI)throws IOException {
        //ServiceHttpRestaurant.serviceRMI = serviceRMI;
        this.serviceRMI = serviceRMI;
        server = HttpServer.create(new InetSocketAddress(8080),0);
        server.createContext("/restaurants", new RestaurantHandler(serviceRMI));
        server.createContext("/reserverTable", new PostHandler(serviceRMI));

    }
    public void lancerServer(){
        server.setExecutor(null);
        server.start();
        System.out.println("Serveur démarré sur le port 8080");
    }


}
