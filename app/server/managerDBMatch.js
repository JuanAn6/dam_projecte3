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
 * This function sum the troops to the country, 
 * 	if the country has 10 and yo pass +1 becomes 11, if the country has 10 and you pass -2 becomes 8
 * @param {*} player_id 
 * @param {*} country (id)
 * @param {*} trops 
 * @returns RETURN NULL IS ERROR
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
 * @param {*} country abr
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
 * @param {*} country  abr ex: (GB, AL, ...)
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

		let sql = `SELECT sum(tropes) as sum FROM okupa WHERE player_id = ?`;
		const [rows] = await db.query(sql, [player_id] );

		if (rows.length > 0) {
			return rows[0].sum;
		} else {
			return false;
		}

	} catch (err) {
		console.error('❌ Error getPlayerTroops!', err.message);
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

/**
 * Check if the contrys are neighbours
 * 
 * @param {*} country1 abr
 * @param {*} country2 abr
 * @return {Boolean} 
 */
const checkIfTheyAreNeighbours = async (country1, country2) =>{
	try {
		
		let pais1 = await getPaisByAbr(country1); 
		let pais2 = await getPaisByAbr(country2);
		if(pais1 == null || pais2 == null) return false;
		
		let sql = `SELECT count(*) as "count" FROM frontera WHERE pais1_id = ? AND pais2_id = ?`;

		const [rows] = await db.query(sql, [pais1.id, pais2.id] );

		if (rows.length > 0) {
			return rows[0].count > 0;
		} else {
			return false;
		}

	} catch (err) {
		console.error('❌ Error checkIfTheyAreNeighbours!', err.message);
	}
}


/**
 * Change the player by the new owner and the troops of the country.
 * @param {*} country_id 
 * @param {*} player_id if new player is null the player is not changed
 * @param {*} old_player_id 
 * @param {*} troops 
 * @returns 
 */

const updatePaisPlayerAndTroops = async (country_id, player_id = null, old_player_id, troops) =>{
	try {
		let rows;
		if(player_id == null){
			let sql = `UPDATE okupa SET tropes = ? WHERE player_id = ? and pais_id = ?`;
			[rows] = await db.query(sql, [troops, old_player_id, country_id] );
		}else{
			let sql = `UPDATE okupa SET tropes = ?, player_id = ? WHERE player_id = ? and pais_id = ?`;
			[rows] = await db.query(sql, [troops, player_id, old_player_id, country_id] );
		}
		
		if (rows.affectedRows > 0) {
			return 1;
		} else {
			return null;
		}
	} catch (err) {
		console.error('❌ Error updatePaisPlayerAndTroops!', err.message);
	}

}


/**
 * Get the country of a game
 * @param {*} pais_id 
 * @param {*} sala_id 
 */
const getCountryByIdAndSalaId = async (pais_id, sala_id) =>{
	
	try {
		
		let players = await managerDB.getInfoPlayersSalaUltimateNoBugs(sala_id);
		let ids = players.map((p) => { return p.id });
		let placeholders = ids.map(() => '?').join(', ');
		
		let sql = `SELECT * FROM okupa WHERE player_id IN (${placeholders}) and pais_id = ? `;
		let	[rows] = await db.query(sql, [...ids, pais_id] );
		console.log("getCountryByIdAndSalaId", sql);
		console.log("getCountryByIdAndSalaId", rows);
		if (rows.length > 0) {			
			return rows[0];
		} else {
			return -1;
		}
		
	} catch (err) {
		console.error('❌ Error getCountryByIdAndSalaId!', err.message);
	}


}



/**
 * Devuelve todos los países (abr) que controla un jugador en una sala.
 * @param {*} player_id 
 * @param {*} sala_id 
 * @returns {Promise<string[]>}
 */
const getPlayerCountriesInSala = async (player_id, sala_id) => {
    try {
        const [rows] = await db.query(
            `SELECT p.abr FROM okupa o JOIN pais p ON o.pais_id = p.id WHERE o.player_id = ?`,
            [player_id]
        );
        return rows.map(r => r.abr);
    } catch (err) {
        console.error('❌ Error getPlayerCountriesInSala!', err.message);
        return [];
    }
};


/**
 * Devuelve los abrev. de los países vecinos de un país.
 * @param {*} country_abr 
 * @returns {Promise<string[]>}
 */
const getNeighboursOfCountry = async (country_abr) => {
    try {
        const pais = await getPaisByAbr(country_abr);
        if (!pais) return [];
        const [rows] = await db.query(
            `SELECT p2.abr FROM frontera f JOIN pais p2 ON f.pais2_id = p2.id WHERE f.pais1_id = ?`,
            [pais.id]
        );
        return rows.map(r => r.abr);
    } catch (err) {
        console.error('❌ Error getNeighboursOfCountry!', err.message);
        return [];
    }
};

/**
 * Get the number of countrys has the player
 * @param {*} player_id 
 * @returns 
 */
const countPlayerCountrysHas = async (player_id) => {
	try {
        
        let sql = `SELECT count(*) as count FROM okupa WHERE player_id = ?`;
		const [rows] = await db.query(sql, [player_id] );

		if (rows.length > 0) {
			return rows[0].count;
		} else {
			return false;
		}
    } catch (err) {
        console.error('❌ Error CountPlayerCountrysHas!', err.message);
        return [];
    }
}

/**
 * BFS para comprobar si hay camino entre dos países solo por países del jugador.
 * @param {*} player_id 
 * @param {*} from_abr 
 * @param {*} to_abr 
 * @param {*} sala_id 
 * @returns {Promise<boolean>}
 */
const hasPathBetweenCountries = async (player_id, from_abr, to_abr, sala_id) => {
    const playerCountries = await getPlayerCountriesInSala(player_id, sala_id);
    const visited = new Set();
    const queue = [from_abr];
    while (queue.length > 0) {
        const current = queue.shift();
        if (current === to_abr) return true;
        visited.add(current);
        const neighbours = await getNeighboursOfCountry(current);
        for (const n of neighbours) {
            if (playerCountries.includes(n) && !visited.has(n)) {
                queue.push(n);
            }
        }
    }
    return false;
};

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
	getPlayerTroops,
	getPaisByAbr,
	checkIfTheyAreNeighbours,
	updatePaisPlayerAndTroops,
	getCountryByIdAndSalaId,
	hasPathBetweenCountries,
	getPlayerCountriesInSala,
	getNeighboursOfCountry,
	countPlayerCountrysHas
};