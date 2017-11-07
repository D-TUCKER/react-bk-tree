//const damlev = require("damlev").default;

var levenshtein = (function() {
  var row2 = [];
  return function(s1, s2) {
    if (s1 === s2) {
      return 0;
    } else {
      var s1_len = s1.length,
        s2_len = s2.length;
      if (s1_len && s2_len) {
        var i1 = 0,
          i2 = 0,
          a,
          b,
          c,
          c2,
          row = row2;
        while (i1 < s1_len) row[i1] = ++i1;
        while (i2 < s2_len) {
          c2 = s2.charCodeAt(i2);
          a = i2;
          ++i2;
          b = i2;
          for (i1 = 0; i1 < s1_len; ++i1) {
            c = a + (s1.charCodeAt(i1) === c2 ? 0 : 1);
            a = row[i1];
            b = b < a ? (b < c ? b + 1 : c) : a < c ? a + 1 : c;
            row[i1] = b;
          }
        }
        return b;
      } else {
        return s1_len + s2_len;
      }
    }
  };
})();

class bkTree {
  constructor(term, options) {
    //console.log(term);
    this.addTerms = this.addTerms.bind(this);
    this._addTerm = this._addTerm.bind(this);
    this.query = this.query.bind(this);
    this._query = this._query.bind(this);

    options = options || {};
    if (options.transposition) {
      // this.stringCompare = damlev;
      new Error("TBD");
    } else {
      this.stringCompare = levenshtein;
    }
    this.options = options;

    if (Array.isArray(term)) {
      let tree = new bkTree(term.pop(), this.options);
      tree.addTerms(term);
      return tree;
    }
    this.term = term;
    this.children = {};
  }

  addTerms(newTerms) {
    const len = newTerms.length;
    for (let ii = 0; ii < len; ++ii) {
      this._addTerm(newTerms[ii]);
    }
  }

  _addTerm(newTerm) {
    const dist = this.stringCompare(
      this.options.path ? this.term[this.options.path] : this.term,
      this.options.path ? newTerm[this.options.path] : newTerm
    );
    if ("undefined" !== typeof this.children[dist]) {
      this.children[dist]._addTerm(newTerm);
    } else {
      this.children[dist] = new bkTree(newTerm, this.options);
    }
  }

  query(queryTerm, maxDist, k = null) {
    let tempResults = [];

    this._query(queryTerm, maxDist, null, tempResults);

    tempResults.sort(function(a, b) {
      return a.d - b.d;
    });

    let results = [];
    let len = tempResults.length;
    if (null !== k) {
      len = Math.min(k, tempResults.length);
    }
    for (let ii = 0; ii < len; ++ii) {
      results.push(this.options.details ? tempResults[ii] : tempResults[ii].t);
    }
    return results;
  }

  _query(queryTerm, maxDist, d, results) {
    const dist = this.stringCompare(
      this.options.path ? this.term[this.options.path] : this.term,
      queryTerm
    );
    
    if (dist <= maxDist) {
      results.push({ t: this.term, d: dist });
    }

    if (null === d) {
      d = dist;
    }

    const min = dist - maxDist;
    const max = dist + maxDist;
    for (let ii = min; ii <= max; ++ii) {
      if ("undefined" !== typeof this.children[ii]) {
        this.children[ii]._query(queryTerm, maxDist, d, results);
      }
    }
  }

  // showTree() {
  //   this.ch;
  // }
}

// Build the tree
//var tree = new bkTree(wordList);

//console.log(tree);

// Get correctly spelled words at distance <= 3
// console.log(tree.query("refered", 3));
// // [ 'referred', 'preferred' ]

// console.log(tree.query("ffart", 2));

// // Return closest
// console.log(tree.query("refered", 3, 1));
// [ 'referred' ]

export default bkTree;
