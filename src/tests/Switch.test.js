import Switch from "../util/Switch";


describe("test different use cases of Switch", () => {

  let caseSwitch;

  beforeAll(() => {
    caseSwitch = new Switch();
  });

  test("if evalTargets takes in null or types other than object literal, should throw error", () => {
    caseSwitch
      .evalTargets()
      .evaluate([`name === "skills"`], result => {
        expect(result).toBeFalsy();
      });
  });

  test("if input name is the same as the literal condition name, if value matched should return true", () => {
    caseSwitch
      .evalTargets({ home: "home" })
      .evaluate([`home === "home"`], result => {
        expect(result).toBeTruthy();
      });
  });

  test("static, single input/value should return bool", () => {
    caseSwitch
      .evalTargets({ name: "skills" })
      .evaluate([`name === "skills"`], result => {
        expect(result).toBeTruthy();
      });
  });

  test("mathematical expression w/ multiple variables should return bool", () => {
    const params = {
      winScrollY: 100,
      winHeight: 300
    }

    caseSwitch
      .evalTargets(params)
      .evaluate([`winScrollY < winHeight - 200`], result => {
        expect(result).toBeTruthy();
      });

    params.winHeight = 200;
    caseSwitch
      .evalTargets(params)
      .evaluate([`winScrollY < winHeight - 200`], result => {
        expect(result).toBeFalsy();
      });
  });

  test("if variable name, wrapped in quotes should return falsy", () => {
    const params = {
      winScrollY: 100,
      winHeight: 300
    }

		caseSwitch
      .evalTargets({ name: "skills" })
      .evaluate([`'name' === "skills"`], result => {
        expect(result).toBeFalsy();
      });

    caseSwitch
      .evalTargets(params)
      .evaluate([`winScrollY < 'winHeight' - 200`], result => {
        expect(result).toBeTruthy();
      });

    caseSwitch
      .evalTargets(params)
      .evaluate([`winScrollY < winHeight - '200'`], result => {
        expect(result).toBeTruthy();
      });
  });

  test("use returnResult will get expression like behavior", () => {
  	const name = "home";
  	const resultOfMatch = 
  	caseSwitch
      .evalTargets({ name })
      .evaluate([`name === "skills"`], result => {
				result("It's skills");
      })
      .evaluate([`name === "about"`], result => {
				result("It's about");
      })
      .evaluate([`name === "home"`], result => {
				result("It's home");
      })
      .returnResult();

   	expect(resultOfMatch).toBe("It's home");
  })
});

// caseSwitch
// 	.setTargets([{ winScrollY, winHeight, name }])
// 	.evaluate([`winScrollY < winHeight - 200`, `name === "home"`], { operator: "OR" }, function() {
// 		console.log("||||||||||||||||||||||||||||||||||||||");
// 		console.log("setting OR cases eval successful");
// 	});

// caseSwitch
// 	.setTargets([{ name }])
// 	.evaluate([`name === "skills"`], function() {
// 		console.log("||||||||||||||||||||||||||||||||||||||");
// 		console.log("chainable test case 1");
// 	})
// 	.evaluate([`name === "contact"`], function() {
// 		console.log("||||||||||||||||||||||||||||||||||||||");
// 		console.log("chainable test case 2");
// 	})
// 	.evaluate([`name === "about"`], function() {
// 		console.log("||||||||||||||||||||||||||||||||||||||");
// 		console.log("chainable test case 3");
// 	});