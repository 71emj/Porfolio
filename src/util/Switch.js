class Switch {

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
  }

	// [{ key, value }, { key, value }]
  evalTargets(...targets) { // : array of objects
    const len = targets.length;
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

  // intermediate(callback) {
  //   const set
  //   callback
  // }

  /// bad pattern --> will encourage too long a chain
  /// const resultIs = switch.evalTargets().evaluate().return()
  /// better pattern might be ---> evalThenReturn, need better name
  /// const resultIs = switch.evalTargets().evaluateThenReturn().evaluateThenReturn()...
  /// which in simple eval is worse than ternary expression 
  /// but with complex chaining and complex conditional evaluation, this might be 
  /// a much better pattern to keep code clean
  returnResult() {
    return this.result
  } /// need rework

  default(callback) {
    const logEvaluations = () => {
      console.log(this.testTargets);
      // console.log(this.result);
      // during evaluation there should be a helper method to set 
      // eval log that can be easily aquired in this function
      // will help the user to know more about the evaluation
      // can do a split case by case log
      // console.log(this), should log all different sets of evals
    }

    callback(logEvaluations, this.result);
    return this;
  }
	
	_setConditions(cases) {
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
      console.log("false input or matched found");
      return false;
    }
    
    const targetKeys = [ "[!]", ...Object.keys(testTargets) ];
    const matchingPattern = new RegExp(targetKeys.join("|"), "g");

    // since it's imppossible to use original name, we need to 
    // replace the name with actual value in the condition expression
    // console.log({condition, matchingPattern});
    // thanks to javascript ignoring type with none triple equal expression, "1" <= 2 === true
    const replaceText = matched => {
      const value = testTargets[matched];
      return !!+value ? value : `"${value}"`;
    }

    const redactedCondition = condition.replace(matchingPattern, replaceText);
    console.log(redactedCondition);
    return eval(redactedCondition); // eval might be able to be replaced by Function constructor
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

export default Switch;


// as powerful as it gets, the interface is still too much
// need to reduce as much noise as possible
// will also need to add features such as expression

// tbd, prob not neccessary
// a test behavior might be useful to bundle with debug
// idea is that the with default debug, the user can get a test log
// of failed, and passed tests --> with that in mind, failed complex case 
// can 