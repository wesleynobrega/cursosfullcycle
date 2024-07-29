# Etapa 1: Compilando o binário
FROM golang:1.19-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o fullcycle

# Etapa 2: Construindo a imagem final mínima
FROM scratch
COPY --from=builder /app/fullcycle /fullcycle
ENTRYPOINT ["/fullcycle"]
