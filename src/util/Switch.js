class Switch {

  get testTargets() {
    return this.targets;
  }

  set testTargets(targetObj) {
    this.targets = targetObj;
  }
	// [{ key, value }, { key, value }]
  setTargets(targets) { // : array of objects
    const len = targets.length;
    for (let i = 0, temp = {}; i < len; i++) {
      this.testTargets = Object.assign(temp, targets[i]);
    }
    return this;
  }

  evaluate(cases, options, callback) {
  	[options, callback] = typeof options === "function" ? [{}, options] : [options, callback];
  	const conditions = this._setConditions(cases);
  	const { operator } = options;

  	if (operator === "AND") {
  		this._evaluateAND(conditions) && callback();
      return this;
  	}

  	if (operator === "OR") {
      console.log(operator);
  		this._evaluateOR(conditions) && callback();
      return this;
  	}

  	this._evaluateSingleCase(conditions.get(0)) && callback();
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
    // since it's imppossible to use original name, we need to 
    // replace the name with actual value in the condition expression 
    const matchingPattern = new RegExp(Object.keys(testTargets).join("|"), "g");
    console.log({condition, matchingPattern});

    // thanks to javascript ignoring type with none triple equal expression, "1" <= 2 === true
    const redactedCondition = condition.replace(matchingPattern, matched => {
      return `"${testTargets[matched]}"`
    });
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