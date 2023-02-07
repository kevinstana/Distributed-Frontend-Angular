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

```bash
git clone https://github.com/kevinstana/distributed
```

```bash
cd distributed
```

```bash
docker run --name distributed_container --rm -e POSTGRES_PASSWORD=password -e POSTGRES_DB=it21774_distributed -h localhost -p 5432:5432 -v "$(pwd)"/assets/db:/docker-entrypoint-initdb.d -v pgdata14:/var/lib/postgresql/data -d postgres:14
```  
  
Then  
  
```bash
./mvnw clean spring-boot:run
```  
  
or  
  
```bash
mvn spring-boot:run
```
  
Once that is done, run
  
```bash
git clone https://github.com/kevinstana/distributed-frontend-angular
```

```bash
cd distributed-frontend-angular
```
  
```bash
npm install
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
