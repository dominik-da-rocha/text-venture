# build backend
FROM  golang:bullseye AS gobuild

WORKDIR /app

COPY ./text-venture-service/go.mod ./
COPY ./text-venture-service/go.sum ./
RUN go mod download

COPY ./text-venture-service/main.go ./
COPY ./text-venture-service/cmd/    ./cmd

RUN go build -o ./text-venture-service main.go

# build ui
FROM node:bullseye-slim AS uibuild

WORKDIR /app

COPY ./text-venture-ui/package.json ./
COPY ./text-venture-ui/tsconfig.json ./
RUN npm install

COPY ./text-venture-ui/public/ ./public
COPY ./text-venture-ui/src/ ./src
RUN npm run build

# Deploy
FROM debian:bullseye-slim
WORKDIR /opt/text-venture
COPY --from=gobuild /app/text-venture-service ./
COPY --from=uibuild /app/build/ ./ui/build
EXPOSE 7080

ENTRYPOINT ["/opt/text-venture/text-venture-service"]




