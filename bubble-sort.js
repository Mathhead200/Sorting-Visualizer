// IMPORT
const { SORT } = window.sorting_visualizer;

class BubbleSort extends Sort {
	pass = 0;  // everything up to (but excluding) this index is sorted
	_curr = null;  // position of current pointer
	queueSwap = false;

		/** @Private */
	get curr() {
		return this._curr;
	}

	/** @Private */
	set curr(value) {
		this.g.querySelector(".focus")?.classList.remove("focus");
		this.g.querySelector(".aux")?.classList.remove("aux");
		this._curr = value;
		this.array[this.curr]?.visual.classList.add("focus");
	}

	/** @Overload */
	update() {
		const n = +count.value;
		super.update();
		this.curr = n - 1;
		this.array[this.curr - 1]?.visual.classList.add("aux");
		return n > 0 ? "Compare" : null;
	}

	/** @Overload */
	step() {
		if (this.queueSwap) {
			// swap
			this.swap(this.curr - 1, this.curr);
			this.queueSwap = false;

		} else {
			// compare
			let cmp = this.compare(this.curr - 1, this.curr);
			if (cmp > 0) {
				status.innerHTML += '&emsp;<span class="yes"></span>';
				this.queueSwap = true;
			} else {
				status.innerHTML += '&emsp;<span class="no"></span>'
			}
		}

		// iterate after either a swap, or a failed comparision
		if (!this.queueSwap) {
			this.curr = this.curr - 1;
			status.innerHTML += "<br>Iterate. <code>index--;</code>";

			if (this.curr <= this.pass) {
				// advance pass counter
				this.array[this.pass].visual.classList.add("done");
				this.pass++;

				if (this.pass < +count.value) {
					// reset curr counter
					this.curr = +count.value - 1;
					status.inneHTML += "<br>Next pass. <code>pass++; index = length - 1;<code>";
				} else {
					// done
					status.innerHTML += "<br>Done.";
					return null;
				}
			}
			this.array[this.curr - 1]?.visual.classList.add("aux");
		}

		return this.queueSwap ? "Swap" : "Compare";
	}
}

// add this sorting algorithm to the list of options
window.sorting_visualizer.sorts.bubble = new BubbleSort();
