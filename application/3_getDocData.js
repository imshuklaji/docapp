'use strict';

/**
 * This is a Node.JS application to View a Doc on the Network
 */

const helper = require('./contractHelper');




async function main(hashId) {

	try {
		const docnetContract = await helper.getContractInstance();

		
		console.log('.....Requesting to get doc details from the Network');
		const DocBuffer = await docnetContract.submitTransaction('getDocData', hashId);

		// process response
		console.log('.....Processing  get doc details Transaction Response \n\n');
		let doc = JSON.parse(DocBuffer.toString());
		console.log(doc);
		console.log('\n\n.....Get Doc Transaction Complete!');
		return doc;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main(hashId).then(() => {
	console.log('Get Doc  Request Submitted on the Network');
});*/

module.exports.execute = main;
