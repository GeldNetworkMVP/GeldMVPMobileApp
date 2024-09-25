import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import {
  Networks,
  Operation,
  Keypair,
  TransactionBuilder,
  Account,
  TimeoutInfinite,
  Horizon
} from '@stellar/stellar-sdk';
import * as Random from 'expo-random';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  blockchainNetwork = environment.network;
  blockchainType = environment.blockchainType;
  stellarfee = environment.basefee;

  constructor() {}

  // generateKeypair(){
  //   const randomBytes = Random.getRandomBytes(32);
  // const keys= Keypair.fromRawEd25519Seed(Buffer.from(randomBytes));
  // console.log("-----------------",keys.publicKey().toString())
  // //this.setObject()
  // }

  // async setObject() {
  //   await Preferences.set({
  //     key: 'user',
  //     value: JSON.stringify({
  //       publickey: 1,
  //       secretkey: 'Max'
  //     })
  //   });
  // }
  
  
  // async getObject() {
  //   const ret = await Preferences.get({ key: 'user' });
  //   const user = JSON.parse(ret.value);
  // }

  getBlockchainNetType() {
    if (this.blockchainType === 'live') {
      return Networks.PUBLIC;
    } else {
      return Networks.TESTNET;
    }
  }

  async xdrBuildForFormSubmission(
    templateName: string,
    workflow: string,
    stage: string,
    formDataHash: string,
    prevHash: string,
    timestamp: number,
    geoData: string,
    appID: string
  ) {
    //this.generateKeypair()
    let appKeyPair = Keypair.fromSecret(
      'SACEYGMZEJ3S2SIAVYKYROOTOELZDAP3GTAHY7LZ45QQAR6XPGRKSCYB'
    );
    let sequence
    let server = new Horizon.Server(this.blockchainNetwork)
    server
       .loadAccount(appKeyPair.publicKey())
       .then(accounts => {
          sequence = accounts.sequenceNumber();
          console.log("sequence ",sequence)
    
    let account = new Account(
      appKeyPair.publicKey(),
     sequence
    );
    let network = this.getBlockchainNetType();

    var transaction = new TransactionBuilder(account, {
      fee: this.stellarfee,
      networkPassphrase: network,
    })
      .addOperation(
        Operation.manageData({ name: 'TemplateName', value: templateName })
      )
      .addOperation(Operation.manageData({ name: 'Workflow', value: workflow }))
      .addOperation(Operation.manageData({ name: 'Stage', value: stage }))
      .addOperation(
        Operation.manageData({ name: 'FormHash', value: formDataHash })
      )
      .addOperation(
        Operation.manageData({ name: 'PreviousHash', value: prevHash })
      )
      .addOperation(
        Operation.manageData({ name: 'TimeStamp', value: timestamp.toString() })
      )
      .addOperation(
        Operation.manageData({ name: 'DeviceCoordinates', value: geoData })
      )
      .addOperation(Operation.manageData({ name: 'AppID', value: appID }))
      .addOperation(
        Operation.manageData({
          name: 'DevicePublicKey',
          value: appKeyPair.publicKey(),
        })
      )
      .setTimeout(TimeoutInfinite)
      .build();

    transaction.sign(appKeyPair);

    // const server = new Server(this.blockchainNetwork);
    server
      .submitTransaction(transaction)
      .then((result: any) => {
        console.log('Transaction submitted successfully:', result);
        const transactionHash = result.hash;
        return transactionHash;
      })
      .catch((error: Error) => {
        console.error('Error submitting transaction:', error);
        throw error;
      });
    })
  }
}
