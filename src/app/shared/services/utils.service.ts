import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  getObjectHash(obj: unknown): Promise<string> {
    try {
      // Convert object to JSON string
      const jsonString = JSON.stringify(obj);

      // Create a new TextEncoder
      const encoder = new TextEncoder();

      // Encode the string to bytes
      const encodedString = encoder.encode(jsonString);

      // Create a new Promise
      return new Promise((resolve, reject) => {
        // Use Web Crypto API to generate SHA256 hash
        window.crypto.subtle
          .digest('SHA-256', encodedString)
          .then((hashBuffer) => {
            // Convert buffer to array
            const hashArray = Array.from(new Uint8Array(hashBuffer));

            // Convert array to hexadecimal string
            const hexHash = hashArray
              .map((item) => item.toString(16).padStart(2, '0'))
              .join('');

            resolve(hexHash);
          })
          .catch((error) => {
            reject(new Error(`Error generating hash: ${error.message}`));
          });
      });
    } catch (error) {
      throw new Error(`Error processing object: ${(error as Error).message}`);
    }
  }
}
