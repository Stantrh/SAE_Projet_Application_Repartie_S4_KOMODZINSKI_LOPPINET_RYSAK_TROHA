import subprocess
import os
import time
import platform

def open_terminal_linux(command, terminal_type):
    subprocess.Popen([terminal_type, "-e", "bash -c '{}'".format(command)])

def open_terminal_windows(command):
    subprocess.Popen(["cmd.exe", "/c", command])

def main():
    os.chdir('back')

    print("Système d'exploitation utilisé : " + platform.system())

    if platform.system() == 'Windows':
        # Windows-specific commands
        os.system('javac -d out -cp "libs\javax.json-1.1.4.jar;libs\ojdbc11-23.4.0.24.05.jar" src\Service\*.java')
        os.system('javac -d out -cp "libs\javax.json-1.1.4.jar;libs\ojdbc11-23.4.0.24.05.jar" src\ServiceDonneesBloquees\*.java')
        os.system('javac -d out -cp "libs\javax.json-1.1.4.jar;libs\ojdbc11-23.4.0.24.05.jar;out\" src\Serveur\*.java')
    else:
        os.system('javac -d out -cp "libs/javax.json-1.1.4.jar:libs/ojdbc11-23.4.0.24.05.jar" src/Service/*.java')
        os.system('javac -d out src/ServiceDonneesBloquees/*.java')
        os.system('javac -d out -cp "libs/javax.json-1.1.4.jar:libs/ojdbc11-23.4.0.24.05.jar:out/" src/Serveur/*.java')

    if platform.system() == 'Windows':
        os.system("start cmd /k \"cd out && rmiregistry\"")
    else:
        terminal_type = input("Enter your terminal type (gnome-terminal or i3-sensible-terminal): ")
        open_terminal_linux("cd out && rmiregistry", terminal_type)
    time.sleep(2)

    # Command 2: LancerServiceDB
    if platform.system() == 'Windows':
        os.system('start cmd /k "java -cp \"libs\\javax.json-1.1.4.jar;libs\\ojdbc11-23.4.0.24.05.jar;out\" ServiceDonneesBloquees.LancerServiceDB"')
    else:
        open_terminal_linux('java -cp "libs/javax.json-1.1.4.jar:libs/ojdbc11-23.4.0.24.05.jar:out" ServiceDonneesBloquees.LancerServiceDB', terminal_type)
    time.sleep(2)

    if platform.system() == 'Windows':
        os.system('start cmd /k "java -cp \"libs\\javax.json-1.1.4.jar;libs\\ojdbc11-23.4.0.24.05.jar;out\" Service.LancerServiceRMI loppinet3u 35G4Nd65soZu"')
    else:
        open_terminal_linux('java -cp "libs/javax.json-1.1.4.jar:libs/ojdbc11-23.4.0.24.05.jar:out" Service/LancerServiceRMI loppinet3u 35G4Nd65soZu', terminal_type)
    time.sleep(2)

    if platform.system() == 'Windows':
        os.system('start cmd /k "java -cp \"libs\\javax.json-1.1.4.jar;libs\\ojdbc11-23.4.0.24.05.jar;out\" Serveur.LancerHttpServer localhost"')
    else:
        open_terminal_linux('java -cp "libs/javax.json-1.1.4.jar:libs/ojdbc11-23.4.0.24.05.jar:out/" Serveur.LancerHttpServer localhost', terminal_type)
    time.sleep(2)

if __name__ == "__main__":
    main()