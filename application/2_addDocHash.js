'use strict';

/**
 * This is a Node.JS application to Add a  New Doc on the Network
 */

const helper = require('./contractHelper');



async function main(hashId, metadata) {

	try {
		const docnetContract = await helper.getContractInstance();


		console.log('.....Requesting to Add a  New Doc on the Network');
		const newDocBuffer = await docnetContract.submitTransaction('addDocHash',hashId, metadata);

		// process response
		console.log('.....Processing  New Doc Addition Transaction Response \n\n');
		let newDoc = JSON.parse(newDocBuffer.toString());
		console.log(newDoc);
		console.log('\n\n.....New Doc Addition Transaction  Complete!');
		return newDoc;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main('11223344', 'metadata').then(() => {
	console.log('New Doc Addition Transaction Submitted on the Network');
});*/

module.exports.execute = main;
