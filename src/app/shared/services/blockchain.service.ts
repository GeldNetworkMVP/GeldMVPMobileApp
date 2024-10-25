import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { environment } from '@environments/environment';
import {
  Networks,
  Operation,
  Keypair,
  TransactionBuilder,
  Account,
  TimeoutInfinite,
  Horizon,
} from '@stellar/stellar-sdk';

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  blockchainNetwork = environment.network;
  blockchainType = environment.blockchainType;
  stellarfee = environment.basefee;
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  constructor() {}

  async getObject() {
    const email = (await Preferences.get({ key: 'email' })).value as string;
    const { value } = await Preferences.get({ key: `keys-of-${email}` });
    if (value) {
      const storedKeypairData = JSON.parse(value);
      const restoredKeypair = Keypair.fromSecret(storedKeypairData.secret);
      this.checkBalance(restoredKeypair.publicKey());
      return restoredKeypair;
    } else {
      return 'No keypair found in storage.';
    }
  }

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
    this.getObject().then((res: any) => {
      const appKeyPair = res;
      let sequence;
      let server = new Horizon.Server(this.blockchainNetwork);
      server.loadAccount(appKeyPair.publicKey()).then((accounts) => {
        sequence = accounts.sequenceNumber();

        let account = new Account(appKeyPair.publicKey(), sequence);
        let network = this.getBlockchainNetType();

        var transaction = new TransactionBuilder(account, {
          fee: this.stellarfee,
          networkPassphrase: network,
        })
          .addOperation(
            Operation.manageData({ name: 'TemplateName', value: templateName })
          )
          .addOperation(
            Operation.manageData({ name: 'Workflow', value: workflow })
          )
          .addOperation(Operation.manageData({ name: 'Stage', value: stage }))
          .addOperation(
            Operation.manageData({ name: 'FormHash', value: formDataHash })
          )
          .addOperation(
            Operation.manageData({ name: 'PreviousHash', value: prevHash })
          )
          .addOperation(
            Operation.manageData({
              name: 'TimeStamp',
              value: timestamp.toString(),
            })
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
      });
    });
  }

  checkBalance(publickey: string) {
    return this.http.get<string>(
      `${this.apiUrl}/account/activate/${publickey}`
    );
  }
}
