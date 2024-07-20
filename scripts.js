let array = [];
const arraySize = 50;
let delay = 100;
let sorting = false;
let originalArray = [];
let colorMap = {
  bubble: "#69b3a2",
  insertion: "#ffa600",
  selection: "#ff6361",
  quick: "#bc5090",
  merge: "#58508d",
  swap: "#003f5c",
  pivot: "#d45087",
};

function generateArray() {
  array = [];
  for (let i = 0; i < arraySize; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  originalArray = [...array];
  displayArray();
}

function displayArray(colors = []) {
  const arrayContainer = document.getElementById("array-container");
  arrayContainer.innerHTML = "";
  array.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 3}px`;
    bar.style.backgroundColor = colors[index] || "#69b3a2";
    arrayContainer.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stopSort() {
  sorting = false;
}

function resetSort() {
  array = [...originalArray];
  displayArray();
  document.getElementById("algorithm-info").innerHTML = "";
  document.getElementById("runtime-results").innerHTML = "";
}

function setSpeed(value) {
  delay = value;
  document.getElementById("speedValue").innerText = value;
}

async function bubbleSort() {
  sorting = true;
  let startTime = performance.now();
  document.getElementById("algorithm-info").innerHTML = `
        <p>Bubble Sort</p>
        <p>Time Complexity: O(n^2)</p>
        <p>Space Complexity: O(1)</p>
        <p>Runtime: <span id="runtime">0</span>ms</p>
    `;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (!sorting) return;
      let colors = new Array(array.length).fill(colorMap["bubble"]);
      colors[j] = colorMap["swap"];
      colors[j + 1] = colorMap["swap"];
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        displayArray(colors);
        await sleep(delay);
      }
    }
  }
  let endTime = performance.now();
  document.getElementById("runtime").innerText = (endTime - startTime).toFixed(
    2
  );
  return endTime - startTime;
}

async function insertionSort() {
  sorting = true;
  let startTime = performance.now();
  document.getElementById("algorithm-info").innerHTML = `
        <p>Insertion Sort</p>
        <p>Time Complexity: O(n^2)</p>
        <p>Space Complexity: O(1)</p>
        <p>Runtime: <span id="runtime">0</span>ms</p>
    `;
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      if (!sorting) return;
      array[j + 1] = array[j];
      j = j - 1;
      let colors = new Array(array.length).fill(colorMap["insertion"]);
      colors[i] = colorMap["swap"];
      colors[j + 1] = colorMap["swap"];
      displayArray(colors);
      await sleep(delay);
    }
    array[j + 1] = key;
    displayArray();
    await sleep(delay);
  }
  let endTime = performance.now();
  document.getElementById("runtime").innerText = (endTime - startTime).toFixed(
    2
  );
  return endTime - startTime;
}

async function selectionSort() {
  sorting = true;
  let startTime = performance.now();
  document.getElementById("algorithm-info").innerHTML = `
        <p>Selection Sort</p>
        <p>Time Complexity: O(n^2)</p>
        <p>Space Complexity: O(1)</p>
        <p>Runtime: <span id="runtime">0</span>ms</p>
    `;
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (!sorting) return;
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
      let colors = new Array(array.length).fill(colorMap["selection"]);
      colors[minIndex] = colorMap["swap"];
      colors[j] = colorMap["swap"];
      displayArray(colors);
      await sleep(delay);
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      displayArray();
      await sleep(delay);
    }
  }
  let endTime = performance.now();
  document.getElementById("runtime").innerText = (endTime - startTime).toFixed(
    2
  );
  return endTime - startTime;
}

async function quickSort(start = 0, end = array.length - 1) {
  if (start >= end) return;
  sorting = true;
  let startTime = performance.now();
  document.getElementById("algorithm-info").innerHTML = `
        <p>Quick Sort</p>
        <p>Time Complexity: O(n log n)</p>
        <p>Space Complexity: O(log n)</p>
        <p>Runtime: <span id="runtime">0</span>ms</p>
    `;
  let index = await partition(start, end);
  await Promise.all([quickSort(start, index - 1), quickSort(index + 1, end)]);
  let endTime = performance.now();
  document.getElementById("runtime").innerText = (endTime - startTime).toFixed(
    2
  );
  return endTime - startTime;
}

async function partition(start, end) {
  let pivot = array[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (!sorting) return;
    if (array[i] < pivot) {
      [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
      pivotIndex++;
    }
    let colors = new Array(array.length).fill(colorMap["quick"]);
    colors[i] = colorMap["pivot"];
    colors[pivotIndex] = colorMap["swap"];
    displayArray(colors);
    await sleep(delay);
  }
  [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
  displayArray();
  await sleep(delay);
  return pivotIndex;
}

async function mergeSort(start = 0, end = array.length - 1) {
  if (start >= end) return;
  sorting = true;
  let startTime = performance.now();
  document.getElementById("algorithm-info").innerHTML = `
        <p>Merge Sort</p>
        <p>Time Complexity: O(n log n)</p>
        <p>Space Complexity: O(n)</p>
        <p>Runtime: <span id="runtime">0</span>ms</p>
    `;
  let mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
  let endTime = performance.now();
  document.getElementById("runtime").innerText = (endTime - startTime).toFixed(
    2
  );
  return endTime - startTime;
}

async function merge(start, mid, end) {
  let left = array.slice(start, mid + 1);
  let right = array.slice(mid + 1, end + 1);
  let i = 0,
    j = 0,
    k = start;

  while (i < left.length && j < right.length) {
    if (!sorting) return;
    if (left[i] <= right[j]) {
      array[k] = left[i];
      i++;
    } else {
      array[k] = right[j];
      j++;
    }
    let colors = new Array(array.length).fill(colorMap["merge"]);
    colors[k] = colorMap["swap"];
    displayArray(colors);
    await sleep(delay);
    k++;
  }

  while (i < left.length) {
    if (!sorting) return;
    array[k] = left[i];
    let colors = new Array(array.length).fill(colorMap["merge"]);
    colors[k] = colorMap["swap"];
    displayArray(colors);
    await sleep(delay);
    i++;
    k++;
  }

  while (j < right.length) {
    if (!sorting) return;
    array[k] = right[j];
    let colors = new Array(array.length).fill(colorMap["merge"]);
    colors[k] = colorMap["swap"];
    displayArray(colors);
    await sleep(delay);
    j++;
    k++;
  }
}

function startSort(algorithm) {
  if (sorting) return;
  resetSort();
  switch (algorithm) {
    case "bubble":
      bubbleSort().then((runtime) => displayRuntime("Bubble Sort", runtime));
      break;
    case "insertion":
      insertionSort().then((runtime) =>
        displayRuntime("Insertion Sort", runtime)
      );
      break;
    case "selection":
      selectionSort().then((runtime) =>
        displayRuntime("Selection Sort", runtime)
      );
      break;
    case "quick":
      quickSort().then((runtime) => displayRuntime("Quick Sort", runtime));
      break;
    case "merge":
      mergeSort().then((runtime) => displayRuntime("Merge Sort", runtime));
      break;
  }
}

function displayRuntime(algorithm, runtime) {
  const runtimeResults = document.getElementById("runtime-results");
  runtimeResults.innerHTML += `<p>${algorithm}: ${runtime.toFixed(2)} ms</p>`;
}

generateArray();
