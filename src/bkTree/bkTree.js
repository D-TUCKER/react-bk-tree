// Addapted from https://github.com/tjbaron/node-bktree/blob/master/lib/bktree.js

import damlev from "damlev";

class bkTree {
  constructor(term, options) {
    this.addTerms = this.addTerms.bind(this);
    this._addTerm = this._addTerm.bind(this);
    this.query = this.query.bind(this);
    this._query = this._query.bind(this);

    options = options || {};
    this.stringCompare = damlev;
    this.options = options;

    if (Array.isArray(term)) {
      console.log(term);
      let tree = new bkTree(term.pop(), this.options);
      tree.addTerms(term);
      return tree;
    }
    this.term = term;
    this.children = {};
  }

  addTerms(newTerms) {
    newTerms.forEach(term => this._addTerm(term));
  }

  _addTerm(newTerm) {
    const dist = this.stringCompare(this.term, newTerm);
    if (this.children[dist]) {
      this.children[dist]._addTerm(newTerm);
    } else {
      this.children[dist] = new bkTree(newTerm, this.options);
    }
  }

  query(queryTerm, maxDist, max = null) {
    let tempResults = [];

    this._query(queryTerm, maxDist, null, tempResults);

    tempResults.sort((a, b) => a.dist - b.dist);

    let results = [];
    let len = tempResults.length;
    if (null !== max) {
      len = Math.min(max, tempResults.length);
    }
    for (let i = 0; i < len; ++i) {
      results.push(this.options.details ? tempResults[i] : tempResults[i].t);
    }
    return results;
  }

  _query(queryTerm, maxDist, d, results) {
    const dist = this.stringCompare(this.term, queryTerm);

    if (dist <= maxDist) {
      results.push({ term: this.term, dist });
      console.log(this.term, dist);
    }

    if (null === d) {
      d = dist;
    }

    const min = dist - maxDist;
    const max = dist + maxDist;

    for (let i = min; i <= max; ++i) {
      if (this.children[i]) {
        this.children[i]._query(queryTerm, maxDist, d, results);
      }
    }
  }
}

export default bkTree;
