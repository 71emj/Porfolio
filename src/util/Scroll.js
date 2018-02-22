/*import SmoothScroll from "smoothscroll-polyfill";
SmoothScroll.polyfill();*/

// manage scroll and scroll condition
class DomScroll {
  constructor() {
    this.state = {
      visible: "",
      scrollName: "",
      scrollToPosition: "",
      prevPosition: "",
      stopScrolling: false,
      didUpdate: false,
      nameValAsFlag: false
    };
  }

  get DOMS() {
    const winHeight = window.innerHeight;
    const winScrollY = window.scrollY;
    return { ...this.docElements, winHeight, winScrollY };
  }

  get docElements() {
    const body = document.body;
    const html = document.documentElement;
    return { body, html };
  }

  scroll({ evt, visible }, callback) {
    const { stopScrolling } = this.state;
    if (stopScrolling) {
      return evt.preventDefault();
    }

    this._setState({ visible: visible || this.visible });

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this._evaluateCondition(this.state);
      const { scrollName, scrollToPosition, didUpdate, nameValAsFlag } = this.state;

      if (didUpdate || nameValAsFlag) {
        console.log("updated");
        window.scrollTo(0, scrollToPosition);
        this._pauseScrolling(100);
      }

      console.log("noooot");
      this._setState({ prevPosition: window.scrollY, nameValAsFlag: false });
      callback(scrollName);
    }, 50);
  }

  scrollToPlace({ name }, callback) {
    this._evaluateCondition({ name });
    const { scrollToPosition, didUpdate } = this.state;
    const { winScrollY, winHeight } = this.DOMS;
    const positions = [0, winHeight, winHeight * 2];
    const positionIsPrecise = positions.reduce((sum, val) => {
    	const scrollY =  Math.ceil(winScrollY);
      return val === 0 ? (scrollY === val ? sum + 1 : sum) : (scrollY === val ? sum + val : sum);
    }, 0);


    if (didUpdate) {
      window.scrollTo(0, scrollToPosition);
      this._pauseScrolling(0);
    }

    console.log(positionIsPrecise);
    this._setState({ prevPosition: this.DOMS.winScrollY, nameValAsFlag: !positionIsPrecise });
    callback(name);
  }

  _setState(fields) {
    const { state } = this;
    this.state = Object.assign(state, fields);
  }

  _evaluateCondition({ visible, name }) {
    const { html, winScrollY, winHeight } = this.DOMS;
    const { prevPosition } = this.state;
    const scrollDist = prevPosition - html.scrollTop;
    const params = new Array();
    const updateFields = { prevPosition: html.scrollTop };

    const addToFields = additionalUpdate => {
      const [scrollName, scrollToPosition, didUpdate] = additionalUpdate;
      return Object.assign(updateFields, { scrollName, scrollToPosition, didUpdate });
    };

    console.log({ winScrollY, scrollDist, scrollTop: html.scrollTop, name, visible });

    // a temporary solution waiting for a better eval method
    // the fall through are intentional as it replace "condition A" || "condition B"
    // which is meant to examined different type of input
    // which might be able to avoid altogether, but will have to wait for 
    // the next iteration of the code
    switch (true) {
      case name === "home":
      case visible === "about" && winScrollY < winHeight - 200 && scrollDist >= 25:
        params.push("home", 0, true);
        this._setState(addToFields(params));
        break;
      case name === "about":
      case visible === "contact" && winScrollY < winHeight * 2 - 200 && scrollDist >= 25:
      case visible === "home" && winScrollY > 200 && scrollDist <= -25:
        params.push("about", winHeight, true);
        this._setState(addToFields(params));
        break;
      case name === "contact":
      case visible === "about" && winScrollY > winHeight + 200 && scrollDist <= -25:
        params.push("contact", winHeight * 2, true);
        this._setState(addToFields(params));
        break;
      default:
        console.log("nothing");
    }
  }

  _pauseScrolling(duration) {
    this._setState({ stopScrolling: true });
    setTimeout(() => {
      this._setState({ stopScrolling: false, didUpdate: false });
    }, duration);
  }
}

export default DomScroll;