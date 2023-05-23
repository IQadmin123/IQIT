# EQSR On Docker

## Prerequisites
Docker

## Getting started
To run this project locally using Docker, follow these steps:

1.Clone the repository:
git clone https://gitlab.com/hrsh2112/eqsr-app.git

2.Nevigate to the project root directory:
To run the project on Docker, run following command:
docker-compose up --build

3.Access the project by visiting `http://0.0.0.0:port` in your web browser. 
  frontend : `http://0.0.0.0:8100`
  backend  : `http://0.0.0.0:8000`
  admin    : `http://0.0.0.0:4200`.


## Components

## Dockerfile
Builds the containers(frontend , backend , admin , MySql ). The containers are built from a Docker images(node , php ).

## docker-compose.yml
This will spin up three containers:for frontend , backend , admin and MySql
