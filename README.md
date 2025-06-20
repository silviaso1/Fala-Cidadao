
Endpoints da API

Registrar Usuário POST http://localhost:3001/register Content-Type: application/json

{ "nome": "Fulano de Tal", "email": "fulano@exemplo.com", "senha": "123456" }

Login: POST http://localhost:3001/login Content-Type: application/json

{ "email": "fulano@exemplo.com", "senha": "123456" }

GET http://localhost:3001/status OBS: Endpoint para testar se o projeto foi compilado corretamente e a API está rodando na porta 3001.

DENUNCIAS

GET http://localhost:3001/denuncias - para receber todas as denuncias registradas

POST http://localhost:3001/denuncias:

JSON do post: 

{
  "usuarioId": 3,
  "descricao": "Grande quantidade de lixo doméstico abandonado há mais de 2 semanas",
  "bairro": "Centro Histórico",
  "titulo": "Lixo acumulado em via pública",
  "imagens": [
    "img",
    "img"
  ]
}

PUT http://localhost:3001/denuncias/id_da_denuncia

ADMIN -> { "status" "SEU STATUS" }

ENUMS de status: DENUNCIADO, OBS: Denunciado é o status inicial, ovbviamente não há necessidade de um put voltar para DENUNCIADO EM_ANDAMENTO, RESOLVIDO, INVALIDO

JSON do put OBS: somente usuario com role admin faz a atualização de status de denuncias:
{
  "status": "EM_ANDAMENTO"
}
USUÁRIO COMUM-> { "usuarioId": 3, "bairro": "novo centro", "descricao": "Descrição atualizadaaaaa" }

DELETE http://localhost:3001/denuncias/id_da_denuncia

SOMENTE O USUÁRIO CRIADOR DA DENUNCIA PODE DELETAR UMA DENUNCIA { "usuarioId": 3 }

LIKE POST: por query params http://localhost:3001/denuncias/{id_denuncia}/like/toggle?usuarioId={usuarioId}

LOCAIS GET http://localhost:3001/locais/ativos
