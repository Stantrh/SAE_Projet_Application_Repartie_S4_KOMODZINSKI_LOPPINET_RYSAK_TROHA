package Serveur;

import Service.ServiceRMI;
import com.sun.net.httpserver.HttpServer;

import java.net.InetSocketAddress;
import java.rmi.RemoteException;

public class ServiceHttpRestaurant implements ServiceHttp {
    private static ServiceRMI serviceRMI = null;
    private HttpServer server;

    public ServiceHttpRestaurant(ServiceRMI serviceRMI){
        try {
            server = HttpServer.create(new InetSocketAddress(8080),0);
            server.createContext("/restaurants");
            ServiceHttpRestaurant.serviceRMI = serviceRMI;
        }
    }

}
