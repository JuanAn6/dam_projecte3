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
module.exports = { updateSalaStatusTorn };