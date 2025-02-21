const comparisonTime = document.createElement("input");
comparisonTime.type = "number";
comparisonTime.min = 0;
comparisonTime.value = "1";  // in ms

const swapTime = document.createElement("input");
swapTime.type = "number";
swapTime.min = 0;
swapTime.value = "1";  // in ms

window.sorting_visualizer.sorts.bubble = {
	settings: {
		"Comparision Time: ": comparisonTime,
		"Swap Time: ": swapTime
	},
	
	load: (svg) => {
		this.svg = svg;
		
		// TODO
	},

	unload: () => { /* do nothing */ }
};
