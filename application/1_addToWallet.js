'use strict';

/**
 * This is a Node.JS module to load a user's Identity to his wallet.
 * This Identity will be used to sign transactions initiated by this user.
 * Defaults:
 *  User Name: ALLPARTICIPANTS_ADMIN
 *  User Organization: ALLPARTICIPANTS
 *  User Role: Admin
 *
 */

const fs = require('fs'); // FileSystem Library
const { FileSystemWallet, X509WalletMixin } = require('fabric-network'); // Wallet Library provided by Fabric
const path = require('path'); // Support library to build filesystem paths in NodeJs

const crypto_materials = path.resolve(__dirname, '../network/crypto-config'); // Directory where all Network artifacts are stored

// A wallet is a filesystem path that stores a collection of Identities
const wallet = new FileSystemWallet('./identity/allparticipants');

async function main(certificatePath, privateKeyPath) {

	// Main try/catch block
	try {

		// Fetch the credentials from our previously generated Crypto Materials required to create this user's identity
		const certificate = fs.readFileSync(certificatePath).toString();
		// IMPORTANT: Change the private key name to the key generated on your computer
		const privatekey = fs.readFileSync(privateKeyPath).toString();

		// Load credentials into wallet
		const identityLabel = 'AllPARTICIPANTS_ADMIN';
		const identity = X509WalletMixin.createIdentity('allparticipantsMSP', certificate, privatekey);

		await wallet.import(identityLabel, identity);

	} catch (error) {
		console.log(`Error adding to wallet. ${error}`);
		console.log(error.stack);
		throw new Error(error);
	}
}

/*main('/home/upgrad/workspace/document-network/network/crypto-config/peerOrganizations/allparticipants.doc-app.com/users/Admin@allparticipants.doc-app.com/msp/signcerts/Admin@allparticipants.doc-app.com-cert.pem', '/home/upgrad/workspace/doc-app/network/crypto-config/peerOrganizations/allparticipants.doc-app.com/users/Admin@allparticipants.doc-app.com/msp/keystore/1233ae1f3e980533b873867c2c00178826268f4535eb41a704003c7460371340_sk').then(() => {
  console.log('User identity added to wallet.');
});*/

module.exports.execute = main;