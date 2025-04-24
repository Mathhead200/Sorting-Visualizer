const SVG_NS = "http://www.w3.org/2000/svg";

const count = document.querySelector("#n");       // <input>
const time = document.querySelector("#time");     // <output>
const status = document.querySelector("#status")  // <aside>

const min = document.createElement("input");
min.type = "number";
min.min = 1;  // TODO: remove this (along with max.min) by adding special case in visuals for negative elements.
min.step = 1;
min.value = 1;

const max = document.createElement("input");
max.type = "number";
max.min = 1;
max.step = 1;
max.value = 100;

const comparisonTime = document.createElement("input");
comparisonTime.type = "number";
comparisonTime.min = 0;
comparisonTime.value = "1";  // in ms

const swapTime = document.createElement("input");
swapTime.type = "number";
swapTime.min = 0;
swapTime.value = "1";  // in ms

class Sort {
	/** @private */
	svg = null;

	/** @private */
	g = null;  // <g> group SVG element

	/**
	 * @protcted
	 * Represents the array to be sorted.
	 * Each elements is an object in the form of
	 * {
	 * 	value: [Number],
	 * 	visual: [SVGElement]
	 * }
	 */
	array = [];

	/** @private */
	time = 0;

	/**
	 * @public
	 * Settings or configurations for this sorting algorithm.
	 * Should be form elements with labels.
	 */
	settings = {
		"Minimum Value": min,
		"Maximum Value": max,
		"Comparision Time": comparisonTime,
		"Swap Time": swapTime
	}

	/**
	 * @protected
	 * Called when a relevant input element is updated.
	 * @return {String} for next step, or <code>null</code>
	 */
	update() {
		const n = +count.value;
		const a = +min.value;
		const b = +max.value;
		const range = b - a + 1;

		this.g.innerHTML = "";  // clear any old SVG
		this.svg.setAttribute("viewBox", `0 0 ${n} ${b}`);  // reset SVG viewBox
		this.time = 0;  // reset time

		// fill array with random values
		this.array = new Array(n);
		for (let i = 0; i < n; i++) {
			const value = Math.ceil(Math.random() * range + a);
			
			// generate SVG
			const visual = document.createElementNS(SVG_NS, "rect");
			visual.setAttribute("x", i);
			visual.setAttribute("width", 1);
			visual.setAttribute("y", b - value);
			visual.setAttribute("height", value);
			this.g.append(visual);
			
			this.array[i] = { value, visual };
		}

		return null;
	}
	
	/**
	 * @public
	 * Called when this algorithm is first selected on the page.
	 */
	load(svg) {
		this.svg = svg;
		this.g = document.createElementNS(SVG_NS, "g");
		this.g.id = "visuals";
		svg.append(this.g);
		
		count.addEventListener("change", event => this.update());
		min.addEventListener("change", event => this.update());
		max.addEventListener("change", event => this.update());

		return this.update();
	}

	/**
	 * @public
	 * Called when this algorithm is deselected on the page.
	 */
	unload() {
		count.removeEventListener("change", this.updateCount);
	}

	/**
	 * @abstract
	 * @public
	 * @return {String} for next step, or <code>null</code>
	 */
	step() { console.error("Unimplemented"); }

	/** @protected */
	swap(i, j) {
		let temp = this.array[i];
		this.array[i] = this.array[j];
		this.array[j] = temp;

		temp = this.array[i].visual.getAttribute("x");
		this.array[i].visual.setAttribute("x", this.array[j].visual.getAttribute("x"));
		this.array[j].visual.setAttribute("x", temp);
		
		this.time += +swapTime.value;
		time.innerText = this.time;

		status.innerHTML = `Swaped <code>array[${i}]==${this.array[i].value}</code> with <code>array[${j}]==${this.array[j].value}<code>`;
	}

	/** @protected */
	compare(i, j) {
		let cmp = this.array[i].value - this.array[j].value;

		this.time += +comparisonTime.value;
		time.innerText = this.time;

		status.innerHTML = `Compared <code>array[${i}]==${this.array[i].value}</code> with <code>array[${j}]==${this.array[j].value}<code><br>Result: <code>${cmp}<code>`;
		return cmp;
	}
}

// EXPORT local file variables as global variables in package object
Object.assign(window.sorting_visualizer, {
	Sort, SVG_NS, count, time, min, max, comparisonTime, swapTime });
