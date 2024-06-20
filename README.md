# Projet de Programmation Répartie


## Équipe

Ce projet est réalisé par :

- KOMODZINSKI Jawad
- LOPPINET Stéphane
- RYSAK Hugo
- TROHA Stanislas

## Description du projet

Cette SAÉ concerne les enseignements suivants

    - R4.01      Architecture logicielle
    - R4.02      Qualité de dev. / tests
    - R4.03      Qualité et au-delà du relationnel
    - R4.A.10   Complément web

## Technologies utilisées
JS, Java, HTML, CSS


## Utilisation

Pour installer et exécuter ce projet, suivez les étapes suivantes :

1. Un script python nommé `script-lancement-serveur-automatique.py` permet de compiler puis lancer automatiquement le rmiregistry, les services et le HttpServer. Il suffit de le lancer avec la commande `python script-lancement-serveur-automatique.py` en étant à la racine du projet. Le script gère Windows, et Linux (si terminal gnome ou i3).
2. Ensuite, il suffit de clicker ici : [webetu](https://webetu.iutnc.univ-lorraine.fr/www/loppinet3u/Projet-Prog-Repartie/front/html/)

### Problèmes rencontrés (Windows)
Si jamais des problèmes sont rencontrés lors du script d'installation, exécuter ces commandes :  


**TERMINAL 1** Dans back/ :  
`javac -d out -cp "libs\javax.json-1.1.4.jar;libs\ojdbc11-23.4.0.24.05.jar" src\Service\*.java`

`javac -d out -cp "libs\javax.json-1.1.4.jar;libs\ojdbc11-23.4.0.24.05.jar" src\ServiceDonneesBloquees\*.java`

`javac -d out -cp "libs\javax.json-1.1.4.jar;libs\ojdbc11-23.4.0.24.05.jar;out\" src\Serveur\*.java`

**TERMINAL 1 :** Dans back/out/ :  
rmiregistry

**TERMINAL 2 :** Dans back/ :  
`java -cp "libs\javax.json-1.1.4.jar;libs\ojdbc11-23.4.0.24.05.jar;out\" Service.LancerServiceRMI loppinet3u 35G4Nd65soZu`

**TERMINAL 3 :** Dans back/ :  
`java -cp "libs\javax.json-1.1.4.jar;libs\ojdbc11-23.4.0.24.05.jar;out\" ServiceDonneesBloquees.LancerServiceDB`

**TERMINAL 4 :** Dans back/ :  
`java -cp "libs\javax.json-1.1.4.jar;libs\ojdbc11-23.4.0.24.05.jar;out\" Serveur.LancerHttpServer localhost`

## Contact

Si vous avez des questions ou des commentaires, n'hésitez pas à nous contacter :

- Étudiant 1 : jawad.komodzinski6@etu.univ-lorraine.fr
- Étudiant 2 : stephane.loppinet9@etu.univ-lorraine.fr
- Étudiant 3 : hugo.rysak4@etu.univ-lorraine.fr
- Étudiant 4 : stanislas.troha8@etu.univ-lorraine.fr
