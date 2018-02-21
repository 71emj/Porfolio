// manage scroll and scroll condition
class DomScroll {
	constructor() {

	}

  set currentPosition(scrollTop) {
    this.prevScroll = scrollTop;
  }

  set scrollParameters(params) {
  	console.log("this is params");
  	console.log(params);
    if (!params) return;
    const [name, scrollToPosition, curScrollY] = params;
    this.scrollName = name;
    this.scrollToPosition = scrollToPosition;
    this.curScrollY = curScrollY;
  }

  get prevPosition() {
    return this.prevScroll;
  }

  get DOMS() {
    const winHeight = window.innerHeight;
    const winScrollY = window.scrollY;
    return { docHeight: this.docHeight, ...this.docElements, winHeight, winScrollY };
  }

  get docElements() {
    const body = document.body;
    const html = document.documentElement;
    return { body, html };
  }

  get docHeight() {
    const { body, html } = this.docElements;
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }

  _evaluateCondition({ name, visible }) {
    const { html, winScrollY, winHeight, docHeight } = this.DOMS;
    const ratio = winScrollY / winHeight;
    const scrollDist = this.prevPosition - html.scrollTop;
    const params = new Array()

    console.log({ winScrollY, scrollDist, scrollTop: html.scrollTop, name });

    switch (true) {
      // case ratio <= 0.2:
      // case name === "home":
      case visible === "about" && winScrollY < 508 /*&& scrollDist <= -10*/ :
     		console.log("home condition");
        params.push("home", 0);
        this.scrollParameters = params;
        break;
        // case ratio <= 0.4:
        // case name === "about":
      case visible === "contact" /*&& scrollDist <= -10*/:
      case visible === "home" && winScrollY > 250 /*&& scrollDist >= 10*/ :
     		console.log("about condition");
        params.push("about", winHeight);
        this.scrollParameters = params;
        break;
        // case ratio <= 0.6:
        // case name === "contact":
      case visible === "about" && winScrollY > 1008 /*&& scrollDist >= 10*/:
     		console.log("contact condition");
        params.push("contact", winHeight * 2);
        this.scrollParameters = params;
        break;
      default:
        console.log("nothing");
    }
    // console.log("===========================");
    // console.log(params);
    // // return [...params, html.scrollTop];
    return this;
  }

  scroll({ evt, visible, name }, callback) {
    this.visible = visible || this.visible;
    this.name = name || this.name;

    console.log({ visible, name });
    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      console.log({ visible, name });
      // console.log(this.visible);
      // console.log(this.timeoutId);
			this._evaluateCondition({ visible: this.visible, name: this.name });
      const { scrollName, scrollToPosition, curScrollY } = this;
      console.log("==========================");
      console.log(scrollToPosition);
      window.scrollTo(0, scrollToPosition);
      
      clearTimeout(this.timeoutId);
      this.currentPosition = curScrollY;
      
      callback(scrollName);
    }, 1000);

    // return new Promise((resolve, reject) => {
    // 	console.log(params);
    // 	const [ name, scrollToPosition, curScrollY ] = params;
    // 	console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]");
    // 	console.log(scrollToPosition);
    // 	window.scrollTo(0, scrollToPosition);
    // 	this.currentPosition = curScrollY;
    // 	resolve(name);
    // });
  }

  // _startScrolling()
}

export default DomScroll;