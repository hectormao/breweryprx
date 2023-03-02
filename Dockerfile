FROM node:16.19-alpine3.16
WORKDIR /app
RUN npm i pm2 -g
ADD ./breweryprx-0.0.2.tgz .
ADD .env .
ADD entrypoint.sh .
EXPOSE 3000
ENTRYPOINT [ "/bin/sh", "entrypoint.sh" ]