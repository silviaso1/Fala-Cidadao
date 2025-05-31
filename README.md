onserva Cidadão - Backend
Este é o backend do projeto Conserva Cidadão, desenvolvido com Spring Boot e PostgreSQL. O sistema fornece endpoints para autenticação e gerenciamento de usuários.

PASSO 01:
Pré-requisitos para Windows
    1. Java JDK 17
       Após instalar, configure a variável de ambiente JAVA_HOME
    2. PostgreSQL 16


PASSO: 02
Configuração Inicial (Windows)
    1. Instalação do PostgreSQL
       Execute o instalador do postgres
       Quando pedir, defina:
          Porta: 5432 (padrão)
          Senha do usuário postgres: admin
        Conclua a instalação.

          
Após clonar o projeto, navegue até o diretório BackEnd/conserva-cidadao-app:
Rode o projeto com ./mvnw spring-boot:run

Caso o seu JDK esteja globalmente sendo utilizado para outra versão do Java:
  Utilize o comando completo informando que você quer rodar o projeto com a versão 17 do java:
       "JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64 ./mvnw spring-boot:run"

Endpoints da API

Registrar Usuário
POST http://localhost:3001/register
Content-Type: application/json

{
  "nome": "Fulano de Tal",
  "email": "fulano@exemplo.com",
  "senha": "123456"
}

Login:
POST http://localhost:3001/login
Content-Type: application/json

{
  "email": "fulano@exemplo.com",
  "senha": "123456"
}

GET http://localhost:3001/status OBS: Endpoint para testar se o projeto foi compilado corretamente e a API está rodando na porta 3001.


DENUNCIAS

GET http://localhost:3001/denuncias - para receber todas as denuncias registradas

POST http://localhost:3001/denuncias:
    
    JSON do post
{
  "usuario": {"id": 1},
  "titulo": "Balanço quebrado",
  "descricao": "balanços e brinquedos quebrados na praça",
  "imagens": ["img1.jpg", "img2.jpg"] OBS: ainda não está preparado pra receber imagens em si
}


PUT http://localhost:3001/denuncias/id_da_denuncia

ENUMS de status:
    DENUNCIADO, OBS: Denunciado é o status inicial, ovbviamente não há necessidade de um put voltar para DENUNCIADO
    EM_ANDAMENTO,
    RESOLVIDO,
    INVALIDO

    JSON do put OBS: somente usuario com role admin faz a atualização de status de denuncias
{
  "status": "EM_ANDAMENTO"
}

DELETE http://localhost:3001/denuncias/id_da_denuncia
OBS: por enquanto ainda não está setado para somente o admin e o criador da denuncia excluir a denuncia X

    JSON do delete não existe, só mandar a requisição do tipo delete com o id da denuncia