const db = require('./db');
const managerDB = require('./managerDB');

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


const getCountrysFromPlayer = async (player_id) => {
	try {
		const [rows] = await db.query(`SELECT 
			pais_id AS country_id , tropes AS troops, abr AS country 
			FROM okupa JOIN pais ON okupa.pais_id = pais.id WHERE player_id = ?
			`, [player_id] );

		if (rows.length > 0) {
			return rows;
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

/**
 * Set the trops to the user!
 * @param {*} player_id 
 * @param {*} tropes 
 * @returns 
 */

const SetTropesPlayerByPlayerId = async(player_id, tropes ) =>{
	try {
		const [rows] = await db.query(`UPDATE jugador SET tropes = ? WHERE id = ? `, [tropes, player_id] );
		
		return (rows.affectedRows > 0);

	} catch (err) {
		console.error('❌ Error SetTropesPlayerByPlayerId!', err.message);
	}
}


//DEPLOY

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
			let aux_trops = rows[0].tropes + trops;
			//let aux_trops = trops;

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





/**
 * Count countrys with troops
 * @param {*} player_id 
 * @param {*} country 
 * @param {*} sala_id 
 * @return {Boolean}
 */
const countCountrysWithTrops = async (sala_id) =>{
	try {
		let players = await managerDB.getInfoPlayersSalaUltimateNoBugs(sala_id);

		let ids = players.map((p) => { return p.id });

		// let pais = await getPaisByAbr(country); 
		// if(pais == null) return null;

		let placeholders = ids.map(() => '?').join(', ');
		
		let sql = `SELECT count(player_id) as "count" FROM okupa WHERE player_id IN (${placeholders}) and tropes > 0 `;
		const [rows] = await db.query(sql, [...ids] );
		if (rows.length > 0) {
			
			return rows[0].count;
		} else {
			return -1;
		}

	} catch (err) {
		console.error('❌ Error countCountrysWithTrops!', err.message);
	}
}


/**
 * Numero de tropes en un pais
 * @param {*} sala_id 
 * @param {*} country 
 * @return {Boolean} Numero de tropes del pais
 */
const checkCountryEmpty = async (sala_id, country) =>{
	try {
		let players = await managerDB.getInfoPlayersSalaUltimateNoBugs(sala_id);

		let ids = players.map((p) => { return p.id });

		let pais = await getPaisByAbr(country); 
		if(pais == null) return null;

		let placeholders = ids.map(() => '?').join(', ');
		
		let sql = `SELECT tropes as "tropes" FROM okupa WHERE player_id IN (${placeholders}) and pais_id = ? `;
		const [rows] = await db.query(sql, [...ids, pais.id] );
		if (rows.length > 0) {
			return rows[0].tropes;
		} else {
			return 0;
		}

	} catch (err) {
		console.error('❌ Error checkCountryEmpty!', err.message);
	}
}


/**
 * Return true it is the owner and false if is not
 * @param {*} player_id 
 * @param {*} country  
 * @return {Boolean} true it is the owner and false if is not
 */
const checkCountryOwner = async (player_id, country) =>{
	try {
		let pais = await getPaisByAbr(country); 
		if(pais == null) return null;

		let sql = `SELECT count(*) as count FROM okupa WHERE player_id = ? and pais_id = ? `;
		const [rows] = await db.query(sql, [player_id, pais.id] );

		if (rows.length > 0) {
			return rows[0].count > 0;
		} else {
			return false;
		}

	} catch (err) {
		console.error('❌ Error checkCountryEmpty!', err.message);
	}
}

/**
 * Return the number of troops of player
 * @param {*} player_id 
 * @param {*} country  
 * @return {number}
 */
const getPlayerTroops = async (player_id) =>{
	try {
		let pais = await getPaisByAbr(country); 
		if(pais == null) return null;

		let sql = `SELECT sum(tropes) as sum FROM okupa WHERE player_id = ?`;
		const [rows] = await db.query(sql, [player_id] );

		if (rows.length > 0) {
			return rows[0].sum;
		} else {
			return false;
		}

	} catch (err) {
		console.error('❌ Error checkCountryEmpty!', err.message);
	}
}


/**
 * NOT USED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Check if the player can deploy a troop
 * @param {*} player_id 
 * @param {*} country 
 * @param {*} sala_id 
 * @return {Boolean}
 */
const getCanDeployAt = async (player_id, country, sala_id) =>{
	try {
		let players = await managerDB.getInfoPlayersSalaUltimateNoBugs(sala_id);
		let ids = players.map((p) => { return p.id });
		let pais = await getPaisByAbr(country); 
		if(pais == null) return null;

		let placeholders = ids.map(() => '?').join(', ');

		let sql = `SELECT * FROM okupa WHERE player_id IN (${placeholders}) and player_id != ? and  pais_id = ? `;

		const [rows] = await db.query(sql, [...ids, player_id, pais.id] );

		if (rows.length > 0) {
			return false;
		} else {
			return true;
		}

	} catch (err) {
		console.error('❌ Error getCanDeployAt!', err.message);
	}
}




module.exports = { 
	updateSalaStatusTorn,
	updateSalaPlayerTorn,
	InsertUpdateOkupaCountry,
	getCountrysFromPlayer,
	getPLayerByUserId,
	getCanDeployAt,
	countCountrysWithTrops,
	SetTropesPlayerByPlayerId,
	checkCountryEmpty,
	checkCountryOwner,
	getPlayerTroops
};