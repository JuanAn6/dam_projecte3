-- Insertar Continentes
INSERT INTO Continent (id, nom, reforc_tropes) VALUES
(1, 'América del Norte', 3),  -- América del Norte
(2, 'América del Sur', 2),    -- América del Sur
(3, 'Europa', 5),            -- Europa
(4, 'África', 3),            -- África
(5, 'Asia', 7),              -- Asia
(6, 'Australia', 2);         -- Australia

-- Insert countries into Pais
INSERT INTO Pais (id, nom, continent_id, imatge) VALUES
(1, 'Alaska', 1, 'placeholder.png'),
(2, 'Northwest Territory', 1, 'placeholder.png'),
(3, 'Alberta', 1, 'placeholder.png'),
(4, 'Ontario', 1, 'placeholder.png'),
(5, 'Quebec', 1, 'placeholder.png'),
(6, 'Western United States', 1, 'placeholder.png'),
(7, 'Eastern United States', 1, 'placeholder.png'),
(8, 'Central America', 1, 'placeholder.png'),
(9, 'Greenland', 1, 'placeholder.png'),

(10, 'Venezuela', 2, 'placeholder.png'),
(11, 'Peru', 2, 'placeholder.png'),
(12, 'Brazil', 2, 'placeholder.png'),
(13, 'Argentina', 2, 'placeholder.png'),

(14, 'Iceland', 3, 'placeholder.png'),
(15, 'Great Britain', 3, 'placeholder.png'),
(16, 'Scandinavia', 3, 'placeholder.png'),
(17, 'Northern Europe', 3, 'placeholder.png'),
(18, 'Western Europe', 3, 'placeholder.png'),
(19, 'Southern Europe', 3, 'placeholder.png'),
(20, 'Ukraine', 3, 'placeholder.png'),

(21, 'North Africa', 4, 'placeholder.png'),
(22, 'Egypt', 4, 'placeholder.png'),
(23, 'East Africa', 4, 'placeholder.png'),
(24, 'Congo', 4, 'placeholder.png'),
(25, 'South Africa', 4, 'placeholder.png'),
(26, 'Madagascar', 4, 'placeholder.png'),

(27, 'Ural', 5, 'placeholder.png'),
(28, 'Siberia', 5, 'placeholder.png'),
(29, 'Yakutsk', 5, 'placeholder.png'),
(30, 'Kamchatka', 5, 'placeholder.png'),
(31, 'Irkutsk', 5, 'placeholder.png'),
(32, 'Mongolia', 5, 'placeholder.png'),
(33, 'Japan', 5, 'placeholder.png'),
(34, 'Afghanistan', 5, 'placeholder.png'),
(35, 'China', 5, 'placeholder.png'),
(36, 'Middle East', 5, 'placeholder.png'),
(37, 'India', 5, 'placeholder.png'),
(38, 'Southeast Asia', 5, 'placeholder.png'),

(39, 'Indonesia', 6, 'placeholder.png'),
(40, 'New Guinea', 6, 'placeholder.png'),
(41, 'Western Australia', 6, 'placeholder.png'),
(42, 'Eastern Australia', 6, 'placeholder.png');


-- Insert borders into Frontera
INSERT INTO Frontera (pais1_id, pais2_id) VALUES
(1, 2),  -- Alaska - Northwest Territory
(1, 3),  -- Alaska - Alberta
(1, 30), -- Alaska - Kamchatka

(2, 3),  -- Northwest Territory - Alberta
(2, 4),  -- Northwest Territory - Ontario
(2, 9),  -- Northwest Territory - Greenland

(3, 4),  -- Alberta - Ontario
(3, 6),  -- Alberta - Western United States

(4, 5),  -- Ontario - Quebec
(4, 6),  -- Ontario - Western United States
(4, 7),  -- Ontario - Eastern United States

(5, 7),  -- Quebec - Eastern United States
(5, 9),  -- Quebec - Greenland

(6, 7),  -- Western US - Eastern US
(6, 8),  -- Western US - Central America

(7, 8),  -- Eastern US - Central America

(8, 10), -- Central America - Venezuela

(9, 14), -- Greenland - Iceland
(9, 2),  -- Greenland - Northwest Territory
(9, 4),  -- Greenland - Ontario
(9, 5),  -- Greenland - Quebec

(10, 11), -- Venezuela - Peru
(10, 12), -- Venezuela - Brazil

(11, 12), -- Peru - Brazil
(11, 13), -- Peru - Argentina

(12, 13), -- Brazil - Argentina

(14, 15), -- Iceland - Great Britain
(14, 16), -- Iceland - Scandinavia

(15, 16), -- Great Britain - Scandinavia
(15, 17), -- Great Britain - Northern Europe
(15, 18), -- Great Britain - Western Europe

(16, 17), -- Scandinavia - Northern Europe
(16, 20), -- Scandinavia - Ukraine

(17, 18), -- Northern Europe - Western Europe
(17, 19), -- Northern Europe - Southern Europe
(17, 20), -- Northern Europe - Ukraine

(18, 19), -- Western Europe - Southern Europe

(19, 20), -- Southern Europe - Ukraine
(19, 22), -- Southern Europe - Egypt
(19, 36), -- Southern Europe - Middle East

(20, 27), -- Ukraine - Ural
(20, 34), -- Ukraine - Afghanistan

(21, 22), -- North Africa - Egypt
(21, 23), -- North Africa - East Africa
(21, 24), -- North Africa - Congo
(21, 12), -- North Africa - Brazil
(21, 18), -- North Africa - Western Europe

(22, 23), -- Egypt - East Africa
(22, 36), -- Egypt - Middle East

(23, 24), -- East Africa - Congo
(23, 25), -- East Africa - South Africa
(23, 26), -- East Africa - Madagascar

(24, 25), -- Congo - South Africa

(25, 26), -- South Africa - Madagascar

(27, 28), -- Ural - Siberia
(27, 31), -- Ural - Irkutsk
(27, 34), -- Ural - Afghanistan

(28, 29), -- Siberia - Yakutsk
(28, 31), -- Siberia - Irkutsk

(29, 30), -- Yakutsk - Kamchatka

(30, 31), -- Kamchatka - Irkutsk
(30, 32), -- Kamchatka - Mongolia
(30, 33), -- Kamchatka - Japan

(31, 32), -- Irkutsk - Mongolia

(32, 33), -- Mongolia - Japan
(32, 35), -- Mongolia - China

(34, 35), -- Afghanistan - China
(34, 36), -- Afghanistan - Middle East
(34, 37), -- Afghanistan - India

(35, 37), -- China - India
(35, 38), -- China - Southeast Asia

(36, 37), -- Middle East - India

(37, 38), -- India - Southeast Asia

(38, 39), -- Southeast Asia - Indonesia

(39, 40), -- Indonesia - New Guinea
(39, 41), -- Indonesia - Western Australia

(40, 42), -- New Guinea - Eastern Australia

(41, 42); -- Western Australia - Eastern Australia
