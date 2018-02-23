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
    const exit = () => this.isMatched = true;

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

  default(callback) {
    const logEvaluations = () => {
      console.log(this.testTargets);
      // during evaluation there should be a helper method to set 
      // eval log that can be easily aquired in this function
      // will help the user to know more about the evaluation
      // can do a split case by case log
      // console.log(this), should log all different sets of evals
    }
    callback(logEvaluations);
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
    
    if (matchState) {
      return false;
    }
    // since it's imppossible to use original name, we need to 
    // replace the name with actual value in the condition expression 
    const matchingPattern = new RegExp(Object.keys(testTargets).join("|"), "g");
    // console.log({condition, matchingPattern});
    // thanks to javascript ignoring type with none triple equal expression, "1" <= 2 === true
    const redactedCondition = condition.replace(matchingPattern, matched => {
      const value = testTargets[matched];
      return !!+value ? value : `"${value}"`;
    });
    console.log(redactedCondition);
    return eval(redactedCondition);
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
