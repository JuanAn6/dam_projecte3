const db = require('./db');


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

module.exports = { };