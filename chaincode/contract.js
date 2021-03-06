'use strict';

const {Contract} = require('fabric-contract-api');

class docnetContract extends Contract {

	constructor() {
		// Provide a custom name to refer to this smart contract
		super('org.doc-app.docnetwork');
	}

	/* ****** All custom functions are defined below ***** */

	// This is a basic user defined function used at the time of instantiating the smart contract
	// to print the success message on console
	async instantiate(ctx) {
		console.log('Docnet Smart Contract Instantiated');
	}

	/**
	 * Create a new document entry on the network
	 * @param ctx - The transaction context object
	 * @param hashId - ID to be used for creating a new doc
	 * @param metadata - Metadata associated with the doc
	 * @returns
	 */
	async addDocHash(ctx, hashId, metadata) {

		console.info('============= START : Register Document ===========');
		// Create a new composite key for the new document account
		//const docKey = ctx.stub.createCompositeKey('org.doc-app.docnetwork.document', [hashId]);

		// Create a document object to be stored in blockchain
		let newDocObject = {
			hashId: hashId,
			metadata: metadata,
			createdBy: ctx.clientIdentity.getID(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Convert the JSON object to a buffer and send it to blockchain for storage
		let dataBuffer = Buffer.from(JSON.stringify(newDocObject));
		//await ctx.stub.putState(docKey, dataBuffer);

		await ctx.stub.putState(hashId, dataBuffer);
		// Return value of new document entry created
		console.info('============= END : Register Document ===========');
		return newDocObject;
	}

	/**
	 * Get a document  details from the blockchain
	 * @param ctx - The transaction context
	 * @param hashId - Document Hash ID for which to fetch details
	 * @returns
	 */
	async getDocData(ctx, hashId) {
		// Create the composite key required to fetch record from blockchain
		//const docKey = ctx.stub.createCompositeKey('org.doc-app.docnetwork.document', [hashId]);

		// Return value of document metadata from blockchain
		/*let docBuffer = await ctx.stub
				.getState(docKey)
				.catch(err => console.log(err));*/


		 let docBuffer = await ctx.stub.getState(hashId);
		 //check if the docbuffer is empty or not
	   if (!docBuffer || docBuffer.length === 0) {
	            throw new Error('Invalid ${hashId} or Document not registered');
	        }
	   console.log('Recevied Document buffer ');
		 return JSON.parse(docBuffer.toString());
		}

}

module.exports = docnetContract;
