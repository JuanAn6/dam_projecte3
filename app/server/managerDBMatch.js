const db = require('./db');

const updateSalaStatusTorn = async (sala_id, status) => {
	try {
		const [rows] = await db.query(`UPDATE partida SET estat_torn = ? WHERE id = ? `, [status, sala_id] );
		
		if (rows.length > 0) {
			return rows;
		} else {
			return [];
		}

	} catch (err) {
		console.error('❌ Error getSalasDB!', err.message);
	}
}

const updateSalaPlayerTorn = async (sala_id, player_id) => {
	try {
		const [rows] = await db.query(`UPDATE partida SET torn_player_id = ? WHERE id = ? `, [player_id, sala_id] );

		if (rows.length > 0) {
			return rows;
		} else {
			return [];
		}

	} catch (err) {
		console.error('❌ Error getSalasDB!', err.message);
	}
}

const getPaisByAbr = async (abr) => {
	try {
		const [rows] = await db.query(`SELECT * FROM pais WHERE abr = ? `, [abr] );

		if (rows.length > 0) {
			return rows[0];
		} else {
			return null;
		}

	} catch (err) {
		console.error('❌ Error getSalasDB!', err.message);
	}
}

/**
 * RETURN NULL IS ERROR
 * @param {*} player_id 
 * @param {*} country 
 * @param {*} trops 
 * @returns 
 */

const InsertUpdateOkupaCountry = async (player_id, country, trops) => {
	try {
		let pais = await getPaisByAbr(country); 
		
		if(pais == null) return null;

		const [rows] = await db.query(`SELECT * FROM okupa WHERE player_id = ? and pais_id = ? `, [player_id, pais.id] );

		if (rows.length > 0) {
			//let aux_trops = rows[0].tropes + trops;
			let aux_trops = trops;

			const [rows2] = await db.query(`UPDATE okupa SET tropes = ? WHERE player_id = ? and pais_id = ? `, [aux_trops, player_id, pais.id] );
			if (rows2.affectedRows > 0) {
				return 1;
			} else {
				return null;
			}
		} else {
			const [rows2] = await db.query(`INSERT INTO okupa  (tropes, player_id, pais_id) VALUES (?, ?, ?) `, [trops, player_id, pais.id] );
			if (rows2.affectedRows > 0) {
				return 1;
			} else {
				return null;
			}
		}

	} catch (err) {
		console.error('❌ Error InsertUpdateOkupaCountry!', err.message);
	}

}


const getCountrysFromPlayer = async (player_id) => {
	try {
		const [rows] = await db.query(`SELECT pais_id AS country, tropes AS troops FROM okupa WHERE player_id = ? `, [player_id] );
		if (rows.length > 0) {
			console.log("ASDSADSADSADSADAS: ", rows);
			return rows[0];
		} else {
			return null;
		}

	} catch (err) {
		console.error('❌ Error getSalasDB!', err.message);
	}
}

const getPLayerByUserId = async (user_id, sala_id) => {
	try {
		const [rows] = await db.query(`SELECT * FROM jugador WHERE skfUser_id = ? and skfPartida_id = ?`, [user_id, sala_id] );

		if (rows.length > 0) {
			return rows[0];
		} else {
			return null;
		}

	} catch (err) {
		console.error('❌ Error getSalasDB!', err.message);
	}
}



module.exports = { updateSalaStatusTorn, updateSalaPlayerTorn, InsertUpdateOkupaCountry, getCountrysFromPlayer, getPLayerByUserId };