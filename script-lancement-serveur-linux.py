import subprocess
import os
import time
import platform

def open_terminal(command, terminal_type):
        subprocess.Popen([terminal_type, "-e", "bash -c '{}'".format(command)])

def main():
    # Change to the 'back' directory
    os.chdir('back')

    # Compile the Java files
    os.system('javac -d out -cp "libs/javax.json-1.1.4.jar:libs/ojdbc11-23.4.0.24.05.jar" src/Service/*.java')
    os.system('javac -d out src/ServiceDonneesBloquees/*.java')
    os.system('javac -d out -cp "libs/javax.json-1.1.4.jar:libs/ojdbc11-23.4.0.24.05.jar:out/" src/Serveur/*.java')

    # Ask the user to choose the terminal type
    terminal_type = input("Enter your terminal type (gnome-terminal or i3-sensible-terminal): ")

    # Command 1: rmiregistry
    open_terminal("cd out && rmiregistry", terminal_type)
    time.sleep(2)  # Wait for rmiregistry to start

    # Command 2: LancerServiceDB
    open_terminal('java -cp "libs/javax.json-1.1.4.jar:libs/ojdbc11-23.4.0.24.05.jar:out" ServiceDonneesBloquees.LancerServiceDB', terminal_type)
    time.sleep(2)  # Wait for LancerServiceDB to start

    # Command 3: LancerServiceRMI
    open_terminal('java -cp "libs/javax.json-1.1.4.jar:libs/ojdbc11-23.4.0.24.05.jar:out" Service/LancerServiceRMI loppinet3u 35G4Nd65soZu', terminal_type)
    time.sleep(2)  # Wait for LancerServiceRMI to start

    # Command 4: LancerHttpServer
    open_terminal('java -cp "libs/javax.json-1.1.4.jar:libs/ojdbc11-23.4.0.24.05.jar:out/" Serveur.LancerHttpServer localhost', terminal_type)

if __name__ == "__main__":
    main()
