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


module.exports = {
  	testDB,getCountrysDB,getContinentsDB
};