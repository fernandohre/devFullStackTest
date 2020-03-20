# Teste prático: Desenvolvedor Full Stack
## Design arquitetural 
![Arquitetura](https://user-images.githubusercontent.com/12806350/76724449-c256a600-6729-11ea-846d-b20d8f44a2c1.png)
## Primeiros Passos
### Subir a API em máquina local
- A API pode ser encontrada via docker hub, através do comando: 
> docker pull fernandocallata/sistema-recados-backend
- É imprescindível que a API esteja no ar e no seguinte ip padrão docker: 192.168.99.100
### Executando docker
> docker run -p 80:5000 sistema-recados-backend
### Executando aplicação React
- Navegue até a pasta frontend
> cd frontend/
- Execute os seguintes comandos:
> npm install
- Depois:
> npm start
