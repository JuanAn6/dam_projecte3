CREATE TABLE session (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuari_id BIGINT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (usuari_id) REFERENCES usuaris(id)
);
