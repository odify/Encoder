// JS ENCODER PROJECT:

class RandEncrypt {
  constructor(text) {
    this.originalText = text;
    this.characterMapping = {};

    RandEncrypt.generateMapping(this);
  }

  get encryptedText() {
    let encText = "";

    for (let i = 0; i < this.originalText.length; i++) {
      const mappedChar = this.characterMapping[this.originalText[i]];
      encText += String.fromCodePoint(mappedChar);
    }

    return encText;
  }

  get encryptionKey() {
    return this.characterMapping;
  }

  static getDecryptedText(encText, charMapping) {
    let decText = "";

    for (let i = 0; i < encText.length; i++) {
      const mappedChar = encText[i].codePointAt(0);
      decText += Object.keys(charMapping).find(
        (key) => charMapping[key] === mappedChar
      );
    }

    return decText;
  }

  static generateMapping(obj) {
    if (typeof obj.originalText !== "string" && obj.originalText.length === 0) {
      return null;
    }

    const mappingValSet = new Set();

    for (let i = 0; i < obj.originalText.length; i++) {
      if (!obj.characterMapping.hasOwnProperty(obj.originalText[i])) {
        let randomChar = Math.floor(Math.random() * RandEncrypt.characterRange);

        while (mappingValSet.has(randomChar)) {
          randomChar = Math.floor(Math.random() * RandEncrypt.characterRange);
        }

        mappingValSet.add(randomChar);

        obj.characterMapping[obj.originalText[i]] = randomChar;
      }
    }
  }
}
RandEncrypt.characterRange = 20000;


//ENCRYPTION

function encrypt() {
  const inputText = $("inputField").value;

  if (inputText.length > 0) {
    const enc = new RandEncrypt(inputText);
    $("inputField").value = enc.encryptedText;

    window.encryptionKey = enc.encryptionKey;

    $("encryptButton").disabled = true;

    $("decryptButton").disabled = false;

    $("encryptionKeyPre").textContent = JSON.stringify(
      window.encryptionKey,
      null,
      2
    );
  }
}

//DECRYPTION

function decrypt() {
  const inputText = $("inputField").value;

  if (inputText.length > 0) {
    const decryptedText = RandEncrypt.getDecryptedText(
      inputText,
      window.encryptionKey
    );
    $("inputField").value = decryptedText;

    $("encryptButton").disabled = false;

    $("decryptButton").disabled = true;
  }
}


function newEncryption() {
  $("inputField").value = "";
  $("encryptionKeyPre").textContent = "";
  $("encryptButton").disabled = false;
  $("decryptButton").disabled = true;
}

function $(name) {
  return document.getElementsByName(name)[0];
}

