const {sorts} = window.sorting_visualizer;  // import

let sort = null;
let settingsElements = [];

// DOM
const svg = document.querySelector("main svg");
const form = document.querySelector("main form");
const algorithmSelect = form.querySelector("#algorithm");
const settingsContainer = form.querySelector("#settings");
const reset = form.querySelector("[type=reset]");
const submit = form.querySelector("[type=submit]");

const setSort = (name) => {
	if (sort) {
		sort.unload();	

		svg.innerHTML = ""; // clear svg

		// clear sort specific settings
		for (let ele of settingsElements)
			ele.remove();
		settingsElements = [];
	}

	sort = sorts[name];
	if (!sort)
		return;

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

	reset.disabled = false;

	time.innerText = "0";
	status.innerText = "";
};

form.addEventListener("reset", event => {
	event.preventDefault();
	setSort(algorithmSelect.value);
})

form.querySelector("#algorithm").addEventListener("change", event => {
	setSort(event.currentTarget.value);
});

const step = () => {
	let nextStep = sort.step();
	if (nextStep) {
		submit.value = `${nextStep} ▶`;
	} else {
		submit.value = "Done.";
		submit.disabled = true;
	}
};

form.addEventListener("submit", event => {
	event.preventDefault();
	step();
});

// document.querySelector("body").addEventListener("keydown", event => {
// 	if (event.key === " ") {
// 		event.preventDefault();
// 		if (!submit.disabled)
// 			step();
// 	}
// });
