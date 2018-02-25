import SwitchCase from "../util/Switch";

describe("test different use cases of Match", () => {

  let caseSwitch;

  beforeAll(() => {
    caseSwitch = new SwitchCase();
  });

  test("static, single input/value should return bool", () => {
    caseSwitch
      .setMatchingTargets({ name: "skills" })
      .onMatch([`name === "skills"`], "It's skills")
      .onMatch([`name === "home"`], "It's home")
			.onEnd((debug, vals) => expect(vals).toBe("It's skills"));
  });

  test("setting string instead of array as condition in simple match should be valid", () => {
    caseSwitch
      .setMatchingTargets({ name: "skills" })
      .onMatch(`name === "skills"`, "It's skills")
			.onEnd((debug, vals) => expect(vals).toBe("It's skills"));
  });

  test("if setMatchingTargets takes in null or types other than object literal, should throw error", () => {
    caseSwitch
      .setMatchingTargets()
      .onMatch([`name === "skills"`], "It's skills")
      .onMatch([`name === "home"`], "It's home")
			.onEnd((debug, vals) => expect(vals).toBe(null));
  });

  test("if input name is the same as the literal condition name, if value matched should return true", () => {
    caseSwitch
      .setMatchingTargets({ home: "home" })
      .onMatch([`home === "skills"`], "It's skills")
      .onMatch([`home === "home"`], "It's home")
			.onEnd((debug, vals) => expect(vals).toBe("It's home"));
  });


  test("mathematical expression w/ multiple variables should return bool", () => {
    const params = {
      winScrollY: 100,
      winHeight: 300
    }

    caseSwitch
      .setMatchingTargets(params)
      .onMatch([`winScrollY < winHeight - 200`], "case 1 is true")
      .onOtherwise("I lied it's false")
      .onEnd((debug, vals) => expect(vals).toBe("I lied it's false"));

    params.winHeight = 200;
    caseSwitch
      .setMatchingTargets(params)
      .onMatchOR([`winScrollY < winHeight - 200`, `winScrollY > winHeight - 200`], "case 1 is true")
      .onOtherwise("I lied it's false")
      .onEnd((debug, vals) => expect(vals).toBe("case 1 is true"));
  });

  // test("if variable name, wrapped in quotes should return falsy", () => {
  //   const params = {
  //     winScrollY: 100,
  //     winHeight: 300
  //   }

		// caseSwitch
  //     .setMatchingTargets({ name: "skills" })
  //     .onMatch([`'name' === "skills"`], result => {
  //       expect(result).toBeFalsy();
  //     });

  //   caseSwitch
  //     .setMatchingTargets(params)
  //     .onMatch([`winScrollY < 'winHeight' - 200`], result => {
  //       expect(result).toBeTruthy();
  //     });

  //   caseSwitch
  //     .setMatchingTargets(params)
  //     .onMatch([`winScrollY < winHeight - '200'`], result => {
  //       expect(result).toBeTruthy();
  //     });
  // });

  // test("use returnResult will get expression like behavior", () => {
  // 	const name = "home";
  // 	const resultOfMatch = 
  // 	caseSwitch
  //     .setMatchingTargets({ name })
  //     .onMatch([`name === "skills"`], result => {
		// 		result("It's skills");
  //     })
  //     .onMatch([`name === "about"`], result => {
		// 		result("It's about");
  //     })
  //     .onMatch([`name === "home"`], result => {
		// 		result("It's home");
  //     })
  //     .onEndThenReturn();

  //  	expect(resultOfMatch).toBe("It's home");
  // })
});

// caseSwitch
// 	.setTargets([{ winScrollY, winHeight, name }])
// 	.onMatch([`winScrollY < winHeight - 200`, `name === "home"`], { operator: "OR" }, function() {
// 		console.log("||||||||||||||||||||||||||||||||||||||");
// 		console.log("setting OR cases eval successful");
// 	});

// caseSwitch
// 	.setTargets([{ name }])
// 	.onMatch([`name === "skills"`], function() {
// 		console.log("||||||||||||||||||||||||||||||||||||||");
// 		console.log("chainable test case 1");
// 	})
// 	.onMatch([`name === "contact"`], function() {
// 		console.log("||||||||||||||||||||||||||||||||||||||");
// 		console.log("chainable test case 2");
// 	})
// 	.onMatch([`name === "about"`], function() {
// 		console.log("||||||||||||||||||||||||||||||||||||||");
// 		console.log("chainable test case 3");
// 	});