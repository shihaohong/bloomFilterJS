var { murmurHash } = require('./murmurHash.js');
var { fnvHash } = require('./fnv.js');
var { simpleHash } = require('./simpleHash.js');

// m = 18, k = 3
var BloomFilter = function(slots, hashFunctions) {
  this.bitVector = [];
  this.slots = slots;
  this.hashFunctions = hashFunctions;
}

BloomFilter.prototype.insert = function(val) {
  this.hashFunctions.forEach(hashFunction => {
    let index = hashFunction(val, this.slots);
    if (!this.bitVector[index]) {
      this.bitVector[index] = 1
    } else {
      this.bitVector[index]++;
    }
  });
};

BloomFilter.prototype.search = function(val) {
  var isFound = this.hashFunctions.reduce((acc, hashFunction) => {
    let index = hashFunction(val, this.slots);
    if (!this.bitVector[index]) {
      return false;
    } 

    return true && acc;
  }, true);

  if (isFound) {
    return 'possibly in set';
  } else {
    return 'not in set';
  }
};

var filter = new BloomFilter(18, [murmurHash, fnvHash, simpleHash]);