const fs = require('fs-extra');
const path = require('path');

let walk = function(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {

    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
			results.push(file);
			console.log(file);
            next();
          });
        } else {
          next();
        }
      });
    })();
  });
};

let folders = ["Crypto Wallet", "Crypto Wallets", "Coins", "cryptocurrency", "Wallets", "coldwallets", "crypto"];

walk('./logs', function(err, results) {
  if (err) throw err;
  for ( strPath of results) {
	  try{
		  for( folder of folders) {
			  let slash_str = strPath.split('\\').length;
		if(strPath.split('\\')[slash_str-1].toLowerCase() == folder.toLowerCase()){
		                fs.copy(strPath.split('\\' + strPath.split('\\')[slash_str-1])[0], `./crypto/${strPath.split('\\')[slash_str-2]}`, function (err) {
  if (err) return console.log(err)
      console.log(`Copy ${strPath.split('\\')[slash_str-2]}`);
});
		}
			 
		  }
	  } catch(err) {
		  console.log(err)
	  }
  }
});
