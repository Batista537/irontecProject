
### !! This proyect contains responsive design ¡¡
# Steps to Install the project

## Required Software
- NodeJs
    - If you are working on Windows:
        - https://nodejs.org/dist/v14.15.4/node-v14.15.4-x64.msi

    - If you are working on linux:  
        - sudo apt install nodejs (This install the latest stable version)

- Npm (Commes with Node.js installation, is the package manager)

- Git Bash if you are working on windows or just git if you are on Unix.

## Steps to install the packages
- You must to clone this repository with the next command:
    - git clone https://github.com/Batista537/irontecProject
    
- Go inside the cloned repository and install the next packages with npm command (Take care with the sudoers permissions on Unix systems):
    - npm install -g @angular/cli@11.0.7
    - npm install -g @angular-devkit/build-angular (This is necessary for the higher version of Angular 6.0)
    - npm install -g http-server

### Building the project
- ng build --prod

### Serve the project
- Here you have two options:
    1. Configure/Use a development server with Apache2 or Nginx and set into the www folder, the content of 'irontec-angular-project' created under the dists/ folder.
    2. Use the http-server package installed before with npm:
        - http-server /dists/irontec-angular-project 8080
            - Connect to localhost:8080

### Using irontec-angular-project like a Progresive Web App
- In this step you must to configure your development server to serve the content through HTTPS, otherwise you must to install manually the application.
    - The Service Worker can serve a different prompt if the device is Android or IoS

### Test the aplication
- Run ng test commad to open a Karma instance on the browser.
    - This project just contains a unique unitary test about the api calls.






