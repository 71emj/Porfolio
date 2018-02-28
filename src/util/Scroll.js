/*import SmoothScroll from "smoothscroll-polyfill";
SmoothScroll.polyfill();*/
import Compare from "case-compare";
import scrollConditions from "../config/condition.json";

// manage scroll and scroll condition
class Scroll {
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

    clearTimeout(this.TID);
    this.TID = setTimeout(() => {
      this._evaluateCondition(this.state);
      const { scrollName, scrollToPosition, didUpdate, nameValAsFlag } = this.state;

      if (didUpdate || nameValAsFlag) {
        window.scrollTo(0, scrollToPosition);
        this._pauseScrolling(0);
      }

      this._setState({ prevPosition: window.scrollY, nameValAsFlag: false });
      callback(scrollName);
    }, 50);
  }

  scrollToPlace({ name }, callback) {
    this._evaluateCondition({ name });
    const { scrollToPosition, didUpdate } = this.state;
    const { winScrollY, winHeight } = this.DOMS;
    const positions = [0, winHeight, winHeight * 2];

    // this is unclear and uneccessarily complex
    const positionIsPrecise = positions.reduce((sum, val) => {
      const scrollY = Math.ceil(winScrollY);
      return val === 0 ? (scrollY === val ? sum + 1 : sum) : (scrollY === val ? sum + val : sum);
    }, 0);


    if (didUpdate) {
      window.scrollTo(0, scrollToPosition);
      this._pauseScrolling(0);
    }

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

    const setParamsToState = (name, scollVal, bool) => {
      params.push(name, scollVal, bool);
      this._setState(addToFields(params));
    }

		const compare = new Compare({ limit: 100 });
    compare({ name, visible, winScrollY, winHeight, scrollDist })
      .toCaseOR(scrollConditions["home"], ["home", 0, true])
      .toCaseOR(scrollConditions["about"], ["about", winHeight, true])
      .toCaseOR(scrollConditions["skills"], ["skills", winHeight * 2, true])
      .toCaseOR(scrollConditions["portfolio"], ["portfolio", winHeight * 3, true])
      .toCaseOR(scrollConditions["contact"], ["contact", winHeight * 4, true])
      .Ended((debug, results) => {
        results && setParamsToState(...results);
        debug();
      });
  }

  _pauseScrolling(duration) {
    this._setState({ stopScrolling: true });
    setTimeout(() => {
      this._setState({ stopScrolling: false, didUpdate: false });
    }, duration);
  }
}

export default Scroll;