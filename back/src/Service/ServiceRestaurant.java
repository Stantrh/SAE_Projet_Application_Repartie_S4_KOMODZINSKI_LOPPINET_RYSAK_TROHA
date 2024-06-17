package Service;

import javax.json.*;
import java.io.StringWriter;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ServiceRestaurant extends UnicastRemoteObject implements ServiceRMI {

    private Connection connexion;

    public ServiceRestaurant(String identifiant, String mdp) throws RemoteException {
        try {
            this.connexion = Connexion.makeConnexion(identifiant, mdp);
        } catch (ClassNotFoundException e) {
            System.out.println("Classe non trouvée");
            throw new RemoteException("Classe non trouvée", e);
        } catch (SQLException e) {
            System.out.println("Problème avec une requête SQL");
            throw new RemoteException("Erreur SQL", e);
        }
    }

    @Override
    public String getAllRestaurant() throws RemoteException {
        try {
            // Préparation de la requête SQL
            String requete = "SELECT * FROM restaurants";
            PreparedStatement preparedStatement = connexion.prepareStatement(requete);
            ResultSet resultSet = preparedStatement.executeQuery();

            // Création du tableau JSON
            JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();

            // Itération sur les résultats de la requête
            while (resultSet.next()) {
                JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder()
                        .add("RestaurantID", resultSet.getInt("RestaurantID"))
                        .add("Nom", resultSet.getString("Nom"))
                        .add("Adresse", resultSet.getString("Adresse"))
                        .add("Latitude", resultSet.getBigDecimal("Latitude"))
                        .add("Longitude", resultSet.getBigDecimal("Longitude"));
                jsonArrayBuilder.add(jsonObjectBuilder);
            }

            // Conversion du tableau JSON en structure JSON
            JsonStructure jsonStructure = jsonArrayBuilder.build();
            StringWriter stringWriter = new StringWriter();

            // Écriture de la structure JSON dans un StringWriter
            try (JsonWriter jsonWriter = Json.createWriter(stringWriter)) {
                jsonWriter.write(jsonStructure);
            }

            // Retourne la chaîne JSON
            return stringWriter.toString();

        } catch (SQLException e) {
            System.out.println("Problème avec une requête SQL");
            throw new RemoteException("Erreur SQL", e);
        }

    }

    @Override
    public String reserverTable(String nom, String prenom, int nbPersonne, String tel, int idRestaurant) throws RemoteException {
        try {
            // Désactiver l'auto-commit pour gérer les transactions manuellement
            connexion.setAutoCommit(false);

            // Préparation de la requête d'insertion
            String requete = "INSERT INTO reservations (Nom, Prenom, nbConvives, numTel, RestaurantID) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement preparedStatement = connexion.prepareStatement(requete);

            // Remplissage des paramètres de la requête
            preparedStatement.setString(1, nom);
            preparedStatement.setString(2, prenom);
            preparedStatement.setInt(3, nbPersonne);
            preparedStatement.setString(4, tel);
            preparedStatement.setInt(5, idRestaurant);

            // Exécution de la requête
            int changementEffectue = preparedStatement.executeUpdate();

            // Valider la transaction si l'insertion a réussi
            if (changementEffectue > 0) {
                connexion.commit();
                return "Réservation réussie";
            } else {
                // Annuler la transaction si l'insertion a échoué
                connexion.rollback();
                return "";
            }

        } catch (SQLException e) {
            try {
                if (connexion != null) {
                    // Annuler la transaction en cas de problème SQL
                    connexion.rollback();
                }
            } catch (SQLException rollbackException) {
                System.out.println("Erreur lors de l'annulation de la transaction");
            }
            System.out.println("Problème avec une requête SQL");
            throw new RemoteException("Erreur SQL", e);
        }
    }
}