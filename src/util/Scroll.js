// manage scroll and scroll condition
class DomScroll {
  constructor() {
    this.state = {
      visible: "",
      scrollName: "",
      scrollToPosition: "",
      prevPosition: "",
      stopScrolling: false,
      didUpdate: false
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
      const { scrollName, scrollToPosition, didUpdate } = this.state;

      if (didUpdate) {
        window.scrollTo(0, scrollToPosition);
        this._pauseScrolling();
      }

      this._setState({ prevPosition: this.DOMS.winScrollY });
      callback(scrollName);
    }, 50);
  }

  scrollToPlace({ name }, callback) {
    this._evaluateCondition({ name });
    const { scrollToPosition, didUpdate } = this.state;

    if (didUpdate) {
      window.scrollTo(0, scrollToPosition);
      this._pauseScrolling();
    }

    this._setState({ prevPosition: this.DOMS.winScrollY });
    callback(name);
  }

  _setState(fields) {
    const { state } = this;
    this.state = Object.assign(state, fields);
  }

  _evaluateCondition({ visible, name }) {
    const { html, winScrollY, winHeight } = this.DOMS;
    const { prevPosition } = this.state;
    const ratio = winScrollY / winHeight;
    const scrollDist = prevPosition - html.scrollTop;
    const params = new Array();
    const updateFields = { prevPosition: html.scrollTop };

    const addToFields = additionalUpdate => {
      const [scrollName, scrollToPosition, didUpdate] = additionalUpdate;
      return Object.assign(updateFields, { scrollName, scrollToPosition, didUpdate });
    };

    console.log({ winScrollY, scrollDist, scrollTop: html.scrollTop, name });

    switch (true) {
      case name === "home":
      case visible === "about" && winScrollY < winHeight - 200 && scrollDist >= 5:
        params.push("home", 0, true);
        this._setState(addToFields(params));
        break;
      case name === "about":
      case visible === "contact" && winScrollY < winHeight * 2 - 200 && scrollDist >= 5:
      case visible === "home" && winScrollY > 200 && scrollDist <= -5:
        params.push("about", winHeight, true);
        this._setState(addToFields(params));
        break;
      case name === "contact":
      case visible === "about" && winScrollY > winHeight + 200 && scrollDist <= -5:
        params.push("contact", winHeight * 2, true);
        this._setState(addToFields(params));
        break;
      default:
        console.log("nothing");
    }
  }

  _pauseScrolling() {
    this._setState({ stopScrolling: true });
    setTimeout(() => {
      this._setState({ stopScrolling: false });
    }, 50);
  }
}

export default DomScroll;