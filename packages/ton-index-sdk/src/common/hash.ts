
const hexHashRE = /^[a-fA-F0-9]{64}$/;


export function serializeHash(hash: string): string {

  // Converting HEX hashes to the Base64 representation,
  // because API expects them in this format.
  if (hexHashRE.test(hash)) {

    if (typeof Buffer !== 'undefined' && Buffer?.from) {
      // Node.js
      return Buffer.from(hash, 'hex').toString('base64');

    } else if (typeof btoa === 'function') {
      // Browser
      let base64 = '';
      for (let i = 0; i < hash.length; i++) {
        base64 += !(i - 1 & 1) ? String.fromCharCode(
          parseInt(hash.substring(i - 1, i + 1), 16)
        ) : ''
      }
      return btoa(base64);

    } else {
      // Logging the warning and falling back to returning
      // hash in the HEX format.
      console.warn(
        `Can't convert HEX hash to Base64, ` +
        `environment not supported`
      );

    }

  }

  return hash;

}
