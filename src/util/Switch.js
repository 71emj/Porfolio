class SwitchCase {

  get testTargets() {
    return this.targets;
  }

  get isMatched() {
    return this.matched;
  }

  set isMatched(boolean) {
    this.matched = boolean;
  }

  set testTargets(targetObj) {
    // this setter signal init
    this.targets = targetObj;
    this.isMatched = false;
    this.result = null;
  }

  // [{ key, value }, { key, value }]
  setMatchingTargets(...targets) { // : array of objects
    const len = targets.length;
    if (!len) {
      this.testTargets = null;
    }
    for (let i = 0, temp = {}; i < len; i++) {
      this.testTargets = Object.assign(temp, targets[i]);
    }
    return this;
  }

  // since this is chainable, possible side effect can be introduced by 
  // fall through... will need to provide method to break out of chain
  evaluate(cases, options, callback) {
    [options, callback] = typeof options === "function" ? [{}, options] : [options, callback];
    const conditions = this._setConditions(cases);
    const { operator } = options;
    const exit = val => {
      this.isMatched = true;
      this.result = val;
    }

    if (operator === "AND") {
      this._evaluateAND(conditions) && callback(exit);
      return this;
    }

    if (operator === "OR") {
      this._evaluateOR(conditions) && callback(exit);
      return this;
    }

    this._evaluateSingleCase(conditions.get(0)) && callback(exit);
    return this;
  }

  _break(val) {
    this.isMatched = true;
    this.result = val;
  }

  onMatch(singleExp, values, fn) {
    const cond = this._setConditions(singleExp);
    if (this._evaluateSingleCase(cond.get(0))) {
      this._break(values);
      typeof fn === "function" && fn("not sure if there is anything worth passing out");
    }
    return this;
  }

  onMatchOR(expressions, values, fn) {
    const conditions = this._setConditions(expressions);
    if (this._evaluateOR(conditions)) {
      this._break(values);
      typeof fn === "function" && fn();
    }
    return this;
  }

  onMatchAND(expressions, values, fn) {
    const conditions = this._setConditions(expressions);
    if (this._evaluateAND(conditions)) {
      this._break(values);
      typeof fn === "function" && fn();
    }
    return this;
  }

  onOtherwise(values, fn) {
    const matchState = this.isMatched;
    if (matchState) {
      return this;
    }
    // the _break is designed to stop further matching
    // however with otherwise, this pattern will prevent any further 
    // matching in the chain
    // which might be a good idea to encourage better practice, but for now 
    // i'll keep the option open
    // this._break(values);
    this.result = values;
    typeof fn === "function" && fn();
    return this;
  }
  
  // console.log(this.result);
  // during evaluation there should be a helper method to set 
  // eval log that can be easily aquired in this function
  // will help the user to know more about the evaluation
  // can do a split case by case log
  // console.log(this), should log all different sets of evals
  onEnd(fn) {
    const debug = () => {
      console.log(this.testTargets);
    }
    fn(debug, this.result);
  }

  onEndThenReturn() {
    return this.result;
  }

  /// will need a way to map out case - val pair 
  /// in order to cheive chaining 
  // returnResult() {
  //   return this.result
  // } /// need rework

  default (callback) {
    const logEvaluations = () => {
      console.log(this.testTargets);
    }
    callback(logEvaluations, this.result);
    return this;
  }

  _setConditions(cases) {
    if (typeof cases === "string") {
      cases = [ cases ];
    }
    const conditions = new Map();
    const len = cases.length;
    for (let i = 0; i < len; i++) {
      conditions.set(i, cases[i]);
    }
    // now cases are set into dictionary
    return conditions;
  }

  _evaluateSingleCase(condition) {
    const testTargets = this.testTargets;
    const matchState = this.isMatched;

    if (matchState || !testTargets) {
      return false;
    }
    // filter here
    return this._matchingExpression(condition, testTargets);
  }

  _matchingExpression(condition, testTargets) {
    const args = [];
    const values = [];
    const expression = "return " + condition;

    Object
      .entries(testTargets)
      .forEach(elem => {
        args.push(elem[0]);
        values.push(elem[1]);
      });

    return new Function(...args, expression)(...values);
  }

  _evaluateAND(conditions) {
    for (let i = 0; i < conditions.size; i++) {
      if (!this._evaluateSingleCase(conditions.get(i))) {
        return false;
      }
    }
    return true;
  }

  _evaluateOR(conditions) {
    for (let i = 0; i < conditions.size; i++) {
      if (this._evaluateSingleCase(conditions.get(i))) {
        return true;
      }
    }
    return false;
  }
}

export default SwitchCase;

// instead of passing operator as option should be multiple interface

// switchCase(...testTargets)
//  .onMatch("expression", "values")
//  .onMatchOR("expression", "values")
//  .onMatchAnd("expression", "values")
//  .onEnd((debug, "values of match case") => { expression })

// switchCase(...testTargets)
//  .onMatch("expression", "values")
//  .onMatchOR("expression", "values")
//  .onOtherwise("values")
//  .onEndThenRet(); // 

// as powerful as it gets, the interface is still too much
// need to reduce as much noise as possible
// will also need to add features such as expression

// tbd, prob not neccessary
// a test behavior might be useful to bundle with debug
// idea is that the with default debug, the user can get a test log
// of failed, and passed tests --> with that in mind, failed complex case 
// can 

// will need to reconsider the interface of the design
// a factory function seems to be a better pattern than object constructor