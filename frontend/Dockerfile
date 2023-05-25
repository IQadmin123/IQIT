FROM node:20-alpine
RUN mkdir /app
WORKDIR /app

COPY . /app/

RUN npm install  --legacy-peer-deps\ 
    npm run build 
     
EXPOSE 3000
CMD ["npm", "run", "dev","-h 0.0.0.0", "-p 3000"]