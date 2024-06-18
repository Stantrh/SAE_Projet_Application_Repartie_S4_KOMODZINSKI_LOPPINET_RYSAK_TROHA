import subprocess
import os
import time
import platform

def open_terminal(command):
    subprocess.Popen(["cmd.exe", "/c", command])

def main():
    # Change to the 'back' directory
    os.chdir('back')

    # Compile the Java files
    os.system('javac -d out -cp "libs\javax.json-1.1.4.jar;libs\ojdbc11-23.4.0.24.05.jar" src\Service\*.java')
    os.system('javac -d out -cp "libs\javax.json-1.1.4.jar;libs\ojdbc11-23.4.0.24.05.jar" src\ServiceDonneesBloquees\*.java')
    os.system('javac -d out -cp "libs\javax.json-1.1.4.jar;libs\ojdbc11-23.4.0.24.05.jar;out\" src\Serveur\*.java')

    # Command 1: Start rmiregistry
    os.system("start cmd /k \"cd out && rmiregistry\"")
    time.sleep(2)  # Wait for rmiregistry to start

    # Command 2: LancerServiceDB
    os.system('start cmd /k "java -cp \"libs\\javax.json-1.1.4.jar;libs\\ojdbc11-23.4.0.24.05.jar;out\" ServiceDonneesBloquees.LancerServiceDB"')
    time.sleep(2)  # Wait for LancerServiceDB to start

    # Command 3: LancerServiceRMI
    os.system('start cmd /k "java -cp \"libs\\javax.json-1.1.4.jar;libs\\ojdbc11-23.4.0.24.05.jar;out\" Service.LancerServiceRMI loppinet3u 35G4Nd65soZu"')
    time.sleep(2)  # Wait for LancerServiceRMI to start

    # Command 4: LancerHttpServer
    os.system('start cmd /k "java -cp \"libs\\javax.json-1.1.4.jar;libs\\ojdbc11-23.4.0.24.05.jar;out\" Serveur.LancerHttpServer localhost"')
    time.sleep(2)  # Wait for LancerHttpServer to start

if __name__ == "__main__":
    main()