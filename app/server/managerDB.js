const db = require('./db');

const testDB = async () => {

	try {
		const [rows] = await db.query('SELECT 1 + 1 AS resultado');
		console.log('✅ Conexión exitosa. Resultado:', rows[0].resultado);
		return rows[0].resultado
	} catch (err) {
		console.error('❌ Error conectando a la base de datos:', err.message);
	}

}

const getCountrysDB = async () => {

	try {
		const [rows] = await db.query('SELECT * FROM pais');
		return rows;

	} catch (err) {
		console.error('❌ Error getCountrysDB!', err.message);
	}

}

const getContinentsDB = async () => {
	try {
		const [rows] = await db.query('SELECT * FROM continent');
		return rows;
	} catch (err) {
		console.error('❌ Error getContinentsDB!', err.message);
	}
}

const getUserByLogin = async (user) => {
	try {
		const [rows] = await db.query('SELECT * FROM usuaris WHERE login = ?', [user]);
		if (rows.length > 0) {
			return rows[0];
		} else {
			return null;
		}
	} catch (err) {
		console.error('❌ Error getUserByLogin!', err.message);
	}
}

const deletetToken = (token) => {
	try {
		const [rows] = db.query('DELETE FROM session WHERE token = ?', [token]);
		if (rows.affectedRows > 0) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		console.error('❌ Error deletetToken!', err.message);
	}
}

const  insertUserToken = async (user_id, token, clientId) => {
	try {
		let aux = new Date().getTime(); // Get current timestamp in milliseconds
		let timestamp = aux+1000*60*60*24;
		await db.query('DELETE FROM session WHERE usuari_id = ? ',[user_id]);
		const [rows] = await db.query('INSERT INTO session (usuari_id,token,expires,uid) VALUES ( ? , ? , ? , ? )',[user_id, token, timestamp, clientId]);
		if (rows.affectedRows > 0) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		console.error('❌ Error insertUserToken!', err);
	}
}

const getSessionByToken = async (token) => {
	try {
		const [rows] = await db.query('SELECT * FROM session WHERE token = ?', [token]);
		if (rows.length > 0) {
			return rows[0];
		} else {
			return null;
		}
	} catch (err) {
		console.error('❌ Error getSessionByToken!', err.message);
	}
}

const updateSession = async (token, uid) => {
	try {
		const [rows] = await db.query('UPDATE session SET uid = ?  WHERE token = ?', [uid, token]);
		if (rows.length > 0) {
			return rows[0];
		} else {
			return null;
		}
	} catch (err) {
		console.error('❌ Error updateSession!', err.message);
	}
}

const createSalaDB = async (data) => {
	try {
		const [rows] = await db.query('INSERT INTO partida (date, nom, token, max_players, admin_id, estat_torn) VALUES (?, ?, ?, ?, ?, 1)', 
			[data.date, data.nom, data.token, data.max_players, data.admin_id]);
			console.log("rows", rows);
		if (rows.affectedRows > 0) {
			return rows;
		} else {
			return false;
		}
	} catch (err) {
		console.error('❌ Error createSalaDB!', err.message);
	}
}

const getSalasDB = async () => {
	try {
		const [rows] = await db.query(`SELECT * , (SELECT count(*) FROM jugador j WHERE skfPartida_id = p.id ) AS connected 
			FROM partida p WHERE estat_torn = 1`);
		
		if (rows.length > 0) {
			return rows;
		} else {
			return [];
		}

	} catch (err) {
		console.error('❌ Error getSalasDB!', err.message);
	}
}

const getSalaById = async (sala_id) => {
	try {
		const [rows] = await db.query(`SELECT * , (SELECT count(*) FROM jugador j WHERE skfPartida_id = p.id ) AS connected 
			FROM partida p WHERE p.id = ?`, [sala_id]);
		
		if (rows.length > 0) {
			return rows[0];
		} else {
			return [];
		}

	} catch (err) {
		console.error('❌ Error getSalasDB!', err.message);
	}
}

const getPlayersFromSala = async (sala_id) => {
	try {
		const [rows] = await db.query(`SELECT count(*) as num FROM jugador j WHERE skfPartida_id = ?`, [sala_id]);
		
		if (rows.length > 0) {
			return rows[0].num;
		} else {
			return [];
		}

	} catch (err) {
		console.error('❌ Error getPlayersFromSala!', err.message);
	}
}


const joinSalaDB = async (sala_id, user_id, num) => {

	//Gestionar el numero del jugador por si abandona restablecer los numeros en la sala???

	try {
		const [rows] = await db.query(`INSERT INTO jugador (skfUser_id, skfPartida_id, skfNumero) VALUES (?, ?, ?)`, [user_id, sala_id, num]);
		
		if (rows.length > 0) {
			return rows;
		} else {
			return [];
		}

	} catch (err) {
		console.error('❌ Error joinSalaDB!', err.message);
	}
}

const leaveSalaDB = async (sala_id, user_id) => {
	try {
		const [rows] = await db.query(`DELETE FROM jugador WHERE skfUser_id = ? AND skfPartida_id = ?`, [user_id, sala_id]);
		
		if (rows.length > 0) {
			return rows;
		} else {
			return [];
		}

	} catch (err) {
		console.error('❌ Error leaveSalaDB!', err.message);
	}
}



const getPlayersInfoFromSala = async (sala_id) => {
	try {
		const [rows] = await db.query(`SELECT id, nom, avatar, wins, games FROM usuaris WHERE id IN( SELECT skfUser_id FROM jugador j WHERE skfPartida_id = ? )`, [sala_id]);
		
		if (rows.length > 0) {
			return rows;
		} else {
			return [];
		}

	} catch (err) {
		console.error('❌ Error getPlayersInfoFromSala!', err.message);
	}
}


const getSessionByUid = async (uid) => {
	try {
		const [rows] = await db.query('SELECT * FROM session WHERE uid = ?', [uid]);
		if (rows.length > 0) {
			return rows;
		} else {
			return "a";
		}
	} catch (err) {
		console.error('❌ Error getSessionByUid!', err.message);
	}
}

const getSessionByUserId = async (usuari_id) => {
	try {
		const [rows] = await db.query('SELECT * FROM session WHERE usuari_id = ?', [usuari_id]);
		if (rows.length > 0) {
			return rows[0];
		} else {
			return "a";
		}
	} catch (err) {
		console.error('❌ Error getSessionByUserId!', err.message);
	}
}


module.exports = {
  	testDB,
	getCountrysDB,
	getContinentsDB,
	getUserByLogin,
	deletetToken,
	insertUserToken,
	getSessionByToken,
	createSalaDB,
	getSalasDB,
	updateSession,
	getPlayersFromSala,
	getPlayersInfoFromSala,
	joinSalaDB,
	getSalaById,
	leaveSalaDB,
	getSessionByUid,
	getSessionByUserId
};