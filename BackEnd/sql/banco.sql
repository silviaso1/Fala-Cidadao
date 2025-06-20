/* ---------- Tipos ENUM ---------- */
CREATE TYPE role_type   AS ENUM ('usuario', 'admin');
CREATE TYPE status_type AS ENUM (
  'Denunciado',
  'Em andamento',
  'Concluída',
  'Cancelada',
  'Desativada'
);

/* ---------- Tabela USUARIO ---------- */
CREATE TABLE usuario (
  id      BIGSERIAL PRIMARY KEY,
  nome    VARCHAR(120)  NOT NULL,
  email   VARCHAR(255)  UNIQUE NOT NULL,
  senha   TEXT          NOT NULL,          -- armazene hash, não plaintext!
  role    role_type     NOT NULL DEFAULT 'usuario',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

/* ---------- Tabela DENUNCIA ---------- */
CREATE TABLE denuncia (
  id          BIGSERIAL PRIMARY KEY,
  usuario_id  BIGINT      NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  titulo      VARCHAR(180) NOT NULL,
  descricao   TEXT         NOT NULL,
  likes       INTEGER      NOT NULL DEFAULT 0,
  imagens     TEXT[]       NOT NULL,
  status      status_type  NOT NULL DEFAULT 'Denunciado',
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

  -- garante no máximo 4 imagens
  CONSTRAINT ck_denuncia_max4imgs
    CHECK (array_length(imagens, 1) <= 4)
);

/* ---------- Tabela LOCAL ---------- */
CREATE TABLE local (
  id          BIGSERIAL PRIMARY KEY,
  titulo      VARCHAR(180) NOT NULL,
  denuncia_id BIGINT       NOT NULL REFERENCES denuncia(id) ON DELETE CASCADE,
  latitude    VARCHAR(50)  NOT NULL,
  longitude   VARCHAR(50)  NOT NULL
);

/* ---------- Tabela COMENTARIO ---------- */
CREATE TABLE comentario (
  id           BIGSERIAL PRIMARY KEY,
  usuario_id   BIGINT  NOT NULL REFERENCES usuario(id)   ON DELETE CASCADE,
  denuncia_id  BIGINT  NOT NULL REFERENCES denuncia(id)  ON DELETE CASCADE,
  descricao    TEXT    NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

/* ---------- Índices Úteis ---------- */
CREATE INDEX idx_denuncia_status       ON denuncia(status);
CREATE INDEX idx_comentario_denuncia   ON comentario(denuncia_id);
CREATE INDEX idx_local_denuncia        ON local(denuncia_id);