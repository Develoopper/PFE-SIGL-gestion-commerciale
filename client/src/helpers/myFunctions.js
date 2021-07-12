import csv from 'csvtojson'

export function slugify (str) {
  var map = {
    // '-' : ' ',
    // '-' : '_',
    'a' : 'á|à|ã|â|À|Á|Ã|Â',
    'e' : 'é|è|ê|É|È|Ê',
    'i' : 'í|ì|î|Í|Ì|Î',
    'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
    'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
    'c' : 'ç|Ç',
    'n' : 'ñ|Ñ'
  };
  
  for (var pattern in map) {
    str = str.replace(new RegExp(map[pattern], 'g'), pattern).toLowerCase();
  };

  return str;
};

export function getTodayDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  return dd + '/' + mm + '/' + yyyy;
}

export function getTodayDate2() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  return dd + '-' + mm + '-' + yyyy;
}

export function capitalize(str) {
  return str.slice(0, 1).toUpperCase + str.slice(1);
}

export function toObjectsArray(table, matrix) {
  const keys = (
    table === "ventes" ?
      ["date", "commercial", "nDeBon", "nDeFacture", "ca", "encaisse", "reste", "espece", "cheque", "tpe", "virement", "client"]
    : table === "achats" ?
      ["date", "commercial", "nDeBon", "nDeFacture", "ca", "encaisse", "reste", "espece", "cheque", "tpe", "virement", "fournisseur"]
    : table === "contacts" ?
      ["type", "nom", "tel", "adresse"]
    : table === 'transferts' &&
      ["date", "type", "option", "montant"]
  );

  console.log(matrix);

  return matrix.map(row => {
    const obj = {};

    row.map((value, i) => {
      obj[keys[i]] = value;
    });
    
    return obj;
  });
}

export function toObject(array) {
  const keys = ["espece", "cheque", "tpe", "virement"];
  
  const obj = {};
  array.map((value, i) => {
    obj[keys[i]] = value;
  });

  return obj;
}

// export function csvJSON(csv) {

//   var lines = csv.split("\n");

//   var result = [];

//   var headers = lines[0].split(";");

//   for(var i = 1; i < lines.length; i++) {

// 	  var obj = {};
// 	  var currentline = lines[i].split(",");

// 	  for(var j = 0; j < headers.length; j++) {
// 		  obj[headers[j]] = currentline[j];
// 	  }

// 	  result.push(obj);

//   }
  
//   //return result; //JavaScript object
//   return JSON.stringify(result); //JSON
// }