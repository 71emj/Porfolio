// manage scroll and scroll condition
// ...todo
// add a similar setState function to update fields
class DomScroll {
	constructor() {
		this.state = {
			name: "",
			visible: "",
			scrollName: "",
			scrollToPosition: "",
			prevPosition: "",
			stopScrolling: false
		};
	}

  setState(fields) {
  	const { state } = this;
  	this.state = Object.assign(state, fields);
  	return this;
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

  _evaluateCondition() {
    const { html, winScrollY, winHeight, docHeight } = this.DOMS;
    const { name, visible, prevPosition } = this.state;

    const ratio = winScrollY / winHeight;
    const scrollDist = prevPosition - html.scrollTop;
    const params = { prevPosition: html.scrollTop };
    console.log({ winScrollY, scrollDist, scrollTop: html.scrollTop, name });

    switch (true) {
      case ratio <= 0.2:
      case name === "home":
      case visible === "about" && winScrollY < winHeight - 150 && scrollDist >= 50:
     		console.log("home condition");
        params.scrollName = "home";
        params.scrollToPosition = 0;
        this.setState(params);
        break;
      case ratio <= 0.4:
      case name === "about":
      case visible === "contact" && winScrollY < winHeight * 2 - 150 && scrollDist >= 50:
      case visible === "home" && winScrollY > 150 && scrollDist <= -50:
     		console.log("about condition");
        params.scrollName = "about";
        params.scrollToPosition = winHeight;
        this.setState(params);
        break;
      case ratio <= 0.6:
      case name === "contact":
      case visible === "about" && winScrollY > winHeight + 150 && scrollDist <= -50:
     		console.log("contact condition");
        params.scrollName = "contact";
        params.scrollToPosition = winHeight * 2;
        this.setState(params);
        break;
      default:
        console.log("nothing");
    }
  }

  scroll({ evt, visible, name }, callback) {
    const { stopScrolling } = this.state;
    if (stopScrolling) {
    	return evt.preventDefault();
    }

    this.setState({ 
    	name: name, 
    	visible: visible 
    });

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
			this._evaluateCondition();
			
      const { scrollName, scrollToPosition, curScrollY } = this.state;
      console.log(this.state);
      window.scrollTo(0, scrollToPosition);
      this.setState({ prevPosition: this.DOMS.winScrollY, stopScrolling: true });
      setTimeout(() => {
      	this.setState({ stopScrolling: false });
      }, 200);
      callback(scrollName);
    }, 50);
  }
}

export default DomScroll;