/*
SPDX-License-Identifier: Apache-2.0
*/

/*
 * This application has 6 basic steps:
 * 1. Select an identity from a wallet
 * 2. Connect to network gateway
 * 3. Access PaperNet network
 * 4. Construct request to connectNetwork commercial paper
 * 5. Submit transaction
 * 6. Process response
 */

'use strict';

const {Wallets, Gateway} = require('fabric-network');
const log = require('../utils/logger');
const fs = require('fs');
const yaml = require('js-yaml');

const CHANNEL = global.config.network.channel;
const CONTRACT = global.config.network.contract;

async function connectNetwork(connection, walletOrg, identity) {

    // A wallet stores a collection of identities for use
    const wallet = await Wallets.newFileSystemWallet(`${walletOrg}`);
    // const wallet = await Wallets.newFileSystemWallet('./identity/user/hospital/wallet');

    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    try {
        const userName = `${identity}`;
        let connectionProfile = yaml.safeLoad(fs.readFileSync(`${connection}`, 'utf8'));
        // let connectionProfile = yaml.safeLoad(fs.readFileSync('./gateway/connection-org2.yaml', 'utf8'));

        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: {enabled: true, asLocalhost: false}
        };

        // Connect to gateway using application specified parameters
        await gateway.connect(connectionProfile, connectionOptions);
        log.info(`Connect to Fabric gateway, 'channel: ${CHANNEL}`);

        const network = await gateway.getNetwork(CHANNEL);
        const contract = network.getContract(CONTRACT);
        return contract;

    } catch (error) {
        log.error(`Error processing transaction. ${error}`);
        log.error(error.stack);
    }
    finally {
        log.info('Disconnect from Fabric gateway.');
        gateway.disconnect();
    }
}

module.exports = {
    connectNetwork
}