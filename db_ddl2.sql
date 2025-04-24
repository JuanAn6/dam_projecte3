-- Crear tabla 'Continent'
CREATE TABLE Continent (
    id BIGINT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    reforc_tropes INT NOT NULL
);

-- Crear tabla 'Pais'
CREATE TABLE Pais (
    id BIGINT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    continent_id BIGINT NOT NULL,
    imatge VARCHAR(255) NOT NULL,
    FOREIGN KEY (continent_id) REFERENCES Continent(id)
);

-- Crear tabla 'Frontera' (sin clave única redundante)
CREATE TABLE Frontera (
    pais1_id BIGINT NOT NULL,
    pais2_id BIGINT NOT NULL,
    PRIMARY KEY (pais1_id, pais2_id),
    FOREIGN KEY (pais1_id) REFERENCES Pais(id),
    FOREIGN KEY (pais2_id) REFERENCES Pais(id)
);

-- Crear tabla 'TipusCarta'
CREATE TABLE TipusCarta (
    id BIGINT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);

-- Insertar tipos de carta
INSERT INTO TipusCarta (id, nom) VALUES
(0, 'Comodí'),
(1, 'Infanteria'),
(2, 'Cavalleria'),
(3, 'Artilleria');

-- Crear tabla 'Carta'
CREATE TABLE Carta (
    id BIGINT PRIMARY KEY,
    tipus BIGINT NOT NULL,
    pais_id BIGINT,
    FOREIGN KEY (tipus) REFERENCES TipusCarta(id),
    FOREIGN KEY (pais_id) REFERENCES Pais(id)
);

-- Crear tabla 'Usuaris'
CREATE TABLE Usuaris (
    id BIGINT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    wins INT NOT NULL,
    games INT NOT NULL
);

-- Crear tabla 'Estats'
CREATE TABLE Estats (
    id BIGINT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);

-- Insertar estados de partida
INSERT INTO Estats (id, nom) VALUES
(0, 'Wait'),
(1, 'Col·locar inicial'),
(2, 'Reforc x pais'),
(3, 'Reforc x tropes'),
(4, 'Combat'),
(5, 'Recol·locacio'),
(6, 'Final');

-- Crear tabla 'Partida' (sin FKs que dependen de Jugador todavía)
CREATE TABLE Partida (
    id BIGINT PRIMARY KEY,
    date DATETIME NOT NULL,
    nom VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    max_players INT NOT NULL,
    admin_id BIGINT,
    torn_player_id BIGINT,
    estat_torn BIGINT NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES Usuaris(id),
    FOREIGN KEY (torn_player_id) REFERENCES Usuaris(id),
    FOREIGN KEY (estat_torn) REFERENCES Estats(id)
);

-- Crear tabla 'Jugador' después de 'Partida' y 'Usuaris'
CREATE TABLE Jugador (
    id BIGINT PRIMARY KEY,
    skfUser_id BIGINT NOT NULL,
    skfPartida_id BIGINT NOT NULL,
    skfNumero INT NOT NULL,
    FOREIGN KEY (skfUser_id) REFERENCES Usuaris(id),
    FOREIGN KEY (skfPartida_id) REFERENCES Partida(id),
    UNIQUE (skfUser_id, skfPartida_id),
    UNIQUE (skfPartida_id, skfNumero)
);

-- Ahora se agregan las FKs faltantes a 'Partida'
ALTER TABLE Partida
    ADD CONSTRAINT fk_admin FOREIGN KEY (admin_id) REFERENCES Usuaris(id),
    ADD CONSTRAINT fk_torn FOREIGN KEY (torn_player_id) REFERENCES Usuaris(id);

-- Crear tabla 'Okupa'
CREATE TABLE Okupa (
    pais_id BIGINT NOT NULL,
    player_id BIGINT NOT NULL,
    tropes INT NOT NULL,
    PRIMARY KEY (pais_id, player_id),
    FOREIGN KEY (pais_id) REFERENCES Pais(id),
    FOREIGN KEY (player_id) REFERENCES Jugador(id)
);

-- Crear tabla 'MA' (Many-to-Many entre Carta y Jugador)
CREATE TABLE MA (
    carta_id BIGINT NOT NULL,
    jugador_id BIGINT NOT NULL,
    PRIMARY KEY (carta_id, jugador_id),
    FOREIGN KEY (carta_id) REFERENCES Carta(id),
    FOREIGN KEY (jugador_id) REFERENCES Jugador(id)
);
