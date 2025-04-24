-- Create the 'Continent' table
CREATE TABLE Continent (
    id BIGINT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    reforc_tropes INT NOT NULL
);

-- Create the 'Pais' table
CREATE TABLE Pais (
    id BIGINT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    continent_id BIGINT NOT NULL,
    imatge VARCHAR(255) NOT NULL,
    FOREIGN KEY (continent_id) REFERENCES Continent(id)
);

-- Create the 'Frontera' table
CREATE TABLE Frontera (
    pais1_id BIGINT NOT NULL,
    pais2_id BIGINT NOT NULL,
    PRIMARY KEY (pais1_id, pais2_id),
    FOREIGN KEY (pais1_id) REFERENCES Pais(id),
    FOREIGN KEY (pais2_id) REFERENCES Pais(id),
		UNIQUE KEY (pais1_id, pais2_id)
);

-- Create the 'TipusCarta' table
CREATE TABLE TipusCarta (
    id BIGINT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);

insert into TipusCarta (id, nom) values( 0, 'Comodí');
insert into TipusCarta (id, nom) values( 1, 'Infanteria');
insert into TipusCarta (id, nom) values( 2, 'Cavalleria');
insert into TipusCarta (id, nom) values( 3, 'Artilleria');

-- Create the 'Carta' table
CREATE TABLE Carta (
    id BIGINT PRIMARY KEY,
    tipus BIGINT NOT NULL,
		pais_id BIGINT ,
		FOREIGN KEY (pais_id) REFERENCES Pais(id),
    FOREIGN KEY (tipus) REFERENCES TipusCarta(id)
);

-- Create the 'Estats' enum type
CREATE TABLE Estats (
    id BIGINT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);

-- Insert the enum values into the 'Estats' table
INSERT INTO Estats (id, nom) VALUES
(0, 'Wait'),
(1, 'Col·locar inicial'),
(2, 'Reforc x pais'),
(3, 'Reforc x tropes'),
(4, 'Combat'),
(5, 'Recol·locacio'),
(6, 'Final');

-- Create the 'Partida' table
CREATE TABLE Partida (
    id BIGINT PRIMARY KEY,
    date DATETIME NOT NULL,
    nom VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    max_players INT NOT NULL,
    admin_id BIGINT NOT NULL,
    torn_player_id BIGINT NOT NULL,
    estat_torn BIGINT NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES Jugador(id),
    FOREIGN KEY (torn_player_id) REFERENCES Jugador(id),
    FOREIGN KEY (estat_torn) REFERENCES Estats(id)
);

-- Create the 'Usuaris' table
CREATE TABLE Usuaris (
    id BIGINT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    wins INT NOT NULL,
    games INT NOT NULL
);

-- Create the 'Jugador' table
CREATE TABLE Jugador (
    id BIGINT PRIMARY KEY,
    skfUser_id BIGINT NOT NULL,
    skfPartida_id BIGINT NOT NULL,
    skfNumero INT NOT NULL,
    FOREIGN KEY (skfUser_id) REFERENCES Usuaris(id),
    FOREIGN KEY (skfPartida_id) REFERENCES Partida(id),
    UNIQUE KEY (skfUser_id, skfPartida_id),
    UNIQUE KEY (skfPartida_id, skfNumero)
);

-- Create the 'Okupa' table
CREATE TABLE Okupa (
    pais_id BIGINT NOT NULL,
    player_id BIGINT NOT NULL,
		tropes INT NOT NULL,
    PRIMARY KEY (pais_id, player_id),
    FOREIGN KEY (pais_id) REFERENCES Pais(id),
    FOREIGN KEY (player_id) REFERENCES Jugador(id)
);

-- Create the 'MA' table (Many-to-Many relationship between Carta and Jugador)
CREATE TABLE MA (
    carta_id BIGINT NOT NULL,
    jugador_id BIGINT NOT NULL,
    PRIMARY KEY (carta_id, jugador_id),
    FOREIGN KEY (carta_id) REFERENCES Carta(id),
    FOREIGN KEY (jugador_id) REFERENCES Jugador(id)
);