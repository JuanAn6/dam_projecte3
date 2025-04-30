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
		console.error('❌ Error!', err.message);
	}

}

const getContinentsDB = async () => {
	try {
		const [rows] = await db.query('SELECT * FROM continent');
		return rows;
	} catch (err) {
		console.error('❌ Error!', err.message);
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
		console.error('❌ Error!', err.message);
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
		console.error('❌ Error!', err.message);
	}
}

const insertUserToken = (user_id, token, clientId) => {
	try {
		let aux = new Date().getTime(); // Get current timestamp in milliseconds
		let timestamp = aux+1000*60*60*24
		db.query('DELETE FROM session WHERE usuari_id = ? ',[user_id]);
		const [rows] = db.query('INSERT INTO session (usuari_id,token,expires,uid) VALUES ( ? , ? , ?)',[user_id, token, timestamp, clientId]);
		if (rows.affectedRows > 0) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		console.error('❌ Error!', err.message);
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
		console.error('❌ Error!', err.message);
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
		console.error('❌ Error!', err.message);
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
		console.error('❌ Error!', err.message);
	}
}

const getSalasDB = async () => {
	try {
		const [rows] = await db.query('SELECT * FROM partida WHERE estat_torn = 1');
		
		if (rows.length > 0) {
			return rows;
		} else {
			return [];
		}

	} catch (err) {
		console.error('❌ Error!', err.message);
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
	updateSession
};