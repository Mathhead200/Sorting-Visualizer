const {sorts} = window.sorting_visualizer;  // import

let sort = null;
let settingsElements = [];

// DOM
const svg = document.querySelector("main svg");
const form = document.querySelector("main form");
const settingsContainer = form.querySelector("#settings");

form.addEventListener("submit", event => {
	event.preventDefault();
});

form.querySelector("#algorithm").addEventListener("change", event => {
	if (sort) {
		sort.unload();

		// clear svg
		svg.innerText = "";

		// clear sort specific settings
		for (let ele in settingsElements)
			ele.remove();
		settingsElements = [];
	}

	sort = window.sorting_visualizer.sorts[event.currentTarget.value];

	// add sort specific settings
	if (sort.settings)
		for (let key in sort.settings) {
			const label = document.createElement("label");
			label.append(key);
			label.append(sort.settings[key]);
			settingsContainer.append(label);
			settingsElements.push(label);
		}

	selected.load(svg);
});
