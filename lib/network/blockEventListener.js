/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

'use strict';

const { Wallets, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const log = require('../utils/logger');

const blockProcessing = require('./blockProcessing.js');

const networkConfig = global.config.network;

const channel = networkConfig.channel;
const use_couchdb = networkConfig.use_couchdb;
const couchdb_address = networkConfig.couchdb_address;
const identity = networkConfig.admin.identity;

const configPath = path.resolve(__dirname, 'nextblock.txt');

const nano = require('nano')(couchdb_address);


// simple map to hold blocks for processing
class BlockMap {
    constructor() {
        this.list = [];
    }
    get(key) {
        key = parseInt(key, 10).toString();
        return this.list[`block${key}`];
    }
    set(key, value) {
        this.list[`block${key}`] = value;
    }
    remove(key) {
        key = parseInt(key, 10).toString();
        delete this.list[`block${key}`];
    }
}

let ProcessingMap = new BlockMap();

async function listener() {
    try {
        log.info('Start block event listener');

        // initialize the next block to be 0
        let nextBlock = 0;

        // check to see if there is a next block already defined
        if (fs.existsSync(configPath)) {
            // read file containing the next block to read
            nextBlock = fs.readFileSync(configPath, 'utf8');
            log.info('read nextBlock', nextBlock);
        } else {
            // store the next block as 0
            fs.writeFileSync(configPath, parseInt(nextBlock, 10))
        }

        const gateway = new Gateway();

        let connection = yaml.safeLoad(fs.readFileSync(`${networkConfig.admin.connection}`, 'utf8'));
        const wallet = await Wallets.newFileSystemWallet(`${networkConfig.admin.wallet}`);
        const userName = `${identity}`;

        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled: true, asLocalhost: false }
        };

        await gateway.connect(connection, connectionOptions);

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel);

        await network.addBlockListener( async (block) => {
            let height_block = block.blockData.header.number;

            let blockData = block.blockData;

            // Add the block to the processing map by block number
            await ProcessingMap.set(height_block, blockData);

            log.info(`Added block ${height_block} to ProcessingMap`);
        },
            // set the starting block for the listener
            { filtered: false, startBlock: parseInt(nextBlock, 10) }
        );

        log.info(`Listening for block events, nextblock: ${nextBlock}`);

        // start processing, looking for entries in the ProcessingMap
        processPendingBlocks(ProcessingMap);

    } catch (error) {
        log.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

// listener function to check for blocks in the ProcessingMap
async function processPendingBlocks(ProcessingMap) {
    setTimeout(async () => {

        // get the next block number from nextblock.txt
        let nextBlockNumber = fs.readFileSync(configPath, 'utf8');
        let processBlock;

        do {

            // get the next block to process from the ProcessingMap
            processBlock = ProcessingMap.get(nextBlockNumber);

            if (processBlock === undefined) {
                // console.log(`processBlock ${processBlock}`);
                break;
            }

            try {
                await blockProcessing.processBlockEvent(channel, processBlock, use_couchdb, nano);
            } catch (error) {
                log.error(`Failed to process block: ${error}`);
            }

            // if successful, remove the block from the ProcessingMap
            ProcessingMap.remove(nextBlockNumber);

            // increment the next block number to the next block
            fs.writeFileSync(configPath, parseInt(nextBlockNumber, 10) + 1);
            

            // retrive the next block number to process
            nextBlockNumber = fs.readFileSync(configPath, 'utf8');

        } while (true);

        processPendingBlocks(ProcessingMap);

    }, 250);

}

module.exports = {
    listener
}