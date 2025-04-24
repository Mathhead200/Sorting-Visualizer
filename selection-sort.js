(function() {

// IMPORT
const { SORT } = window.sorting_visualizer;

class SelectionSort extends Sort {
	/** @private */
	pass = 0;  // everything up to (but excluding) this index is sorted

	/** @private */
	_curr = null;  // index

	/** @private */
	_min = null;  // index

	/** @private */
	queueSwap = false;

	/** @private */
	get curr() {
		return this._curr;
	}

	/** @private */
	set curr(value) {
		this.g.querySelector(".focus")?.classList.remove("focus");  // TODO: improve speed
		this._curr = value;
		this.array[this.curr]?.visual.classList.add("focus");
	}

	/** @private */
	get min() {
		return this._min;
	}

	/** @private */
	set min(index) {
		this.g.querySelector(".aux")?.classList.remove("aux");  // TODO: improve speed
		this._min = index;
		this.array[this.min]?.visual.classList.add("aux");
		
	}

	/** @Overload */
	update() {
		super.update();
		const n = this.array.length;
		if (n <= 1)
			return null;  // already sorted

		this.curr = 1;
		this.min = 0;
		return "Compare";
	}

	/** @private */
	_swap() {
		super.swap(this.pass, this.min);
		this.queueSwap = false;

		// advance pass counter
		this.array[this.pass].visual.classList.add("done");
		this.pass++;

		if (this.pass >= this.array.length - 1) {
			this.array[this.pass].visual.classList.add("done");
			return null;  // done
		}

		// reset curr counter and continue
		this.curr = this.pass + 1;
		this.min = this.pass;
		status.innerHTML += "<br>Next pass. <code>pass++; index = pass + 1;<code>";
		return "Compare";
	}

	/** @private */
	_compare() {
		let cmp = super.compare(this.curr, this.min);
		if (cmp < 0) {
			status.innerHTML += '&emsp;<span class="yes"></span>';
			this.min = this.curr;
		} else {
			status.innerHTML += '&emsp;<span class="no"></span>'
		}

		// iterate after either a swap, or a failed comparision
		if (this.curr >= this.array.length - 1) {
			this.g.querySelector(".focus")?.classList.remove("focus");
			this.array[this.pass].visual.classList.add("focus");
			this.queueSwap = true;
			return "Swap";
		}
		
		this.curr = this.curr + 1;
		status.innerHTML += "<br>Iterate. <code>index++;</code>";
		return "Compare";
	}

	/** @Overload */
	step() {
		if (this.queueSwap)
			return this._swap();
		else
			return this._compare();		
	}
}

// add this sorting algorithm to the list of options
window.sorting_visualizer.sorts.selection = new SelectionSort();

})();  // End IIFE
