# AngularJwtAuth

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.5.

## Download node.js (LTS)

https://nodejs.org/en/  
  
or run  
  
```bash
sudo apt-get install curl
```
  
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
```
  
right after the previous command enter  
  
```bash
sudo apt-get install nodejs
```
  
check verion with  
  
```bash
node -v
```
  
## Install Angular CLI

```bash
sudo npm install -g @angular/cli
```
  
Check version with  
  
```bash
ng version
```
  
or  

```bash
ng --version
```
  
## Run the application

First you have to run the backend application from the "distributed" repository.  
  
Once that is done, open the directory in which you downloaded the frontend repository (in the terminal) and run  
  
```bash
npm intall
```
  
you might also have to run  
  
  ```bash
  npm audit fix
  ```
  
Then run  

```bash
ng serve -o
```
  
`ng serve -o` will automatically open the browser.  
  
If you just run  
  
```bash
ng serve
```
  
open the browser and navigate to
`http://localhost:4200/`
