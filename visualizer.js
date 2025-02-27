const {sorts} = window.sorting_visualizer;  // import

let sort = null;
let settingsElements = [];

// DOM
const svg = document.querySelector("main svg");
const form = document.querySelector("main form");
const settingsContainer = form.querySelector("#settings");
const submit = form.querySelector("[type=submit]");

form.addEventListener("submit", event => {
	event.preventDefault();
	if (sort) {
		let nextStep = sort.step();
		if (nextStep) {
			submit.value = `${nextStep} ▶`;
		} else {
			submit.value = "Done.";
			submit.disabled = true;
		}
	}
});

form.querySelector("#algorithm").addEventListener("change", event => {
	if (sort) {
		sort.unload();	

		svg.innerHTML = ""; // clear svg

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
			label.append(": ");
			label.append(sort.settings[key]);
			settingsContainer.append(label);
			settingsElements.push(label);
		}

	let firstStep = sort.load(svg);
	if (firstStep) {
		submit.value = `${firstStep} ▶`;
		submit.disabled = false;
	} else {
		submit.value = "Done.";
		submit.disabled = true;
	}
});
