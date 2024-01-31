const fs = require("fs");

function readJSFileSync(filePath) {
	try {
		const data = fs.readFileSync(filePath, "utf8");
		return data;
	} catch (error) {
		console.error("Error reading file:", error);
		throw error;
	}
}

function createGroups(string, height) {
	const baseWidth = (2 * string.length) / height;
	const groupIncrement = (baseWidth / (height * 2)) * 2;
	const groups = [string.substr(0, 1)];
	let index = 1;
	let groupLength = 1 + groupIncrement;

	string = string.replace(/[^a-zA-Z0-9;+\-*/%(){}<>=&|^~!?:]/g, "");

	while (index < string.length) {
		if (
			groups.length % Math.floor(height / 3) === 0 &&
			string.length - index >= string.length / 3
		) {
			groupLength -= groupIncrement * 5;
		}
		const group = string.substring(index, parseInt(index + groupLength));
		groups.push(group);
		index += group.length;
		groupLength += groupIncrement;
	}
	return groups;
}

function createTree(string, height = 36) {
	const groups = createGroups(string, height);
	const longestGroup = groups
		.map((group) => group.length)
		.sort((a, b) => b - a)[0];
	const lastGroup = groups.splice(-1, 1)[0];
	const trunkWidth = lastGroup.length / 3;
	for (let i = 0; i < 3; i++) {
		groups.push(
			lastGroup.substring(i * trunkWidth, i * trunkWidth + trunkWidth)
		);
	}

	const tree = groups.map((line) => {
		{
			const marginLeft = " ".repeat(
				Math.floor((longestGroup - line.length) / 2)
			);
			const marginRight = " ".repeat(
				Math.floor((longestGroup - line.length) / 2)
			);
			return `${marginLeft}${line}${marginRight}\n`;
		}
	});

	return tree;
}

// Tu peut rouler se script avec "npm start". Tu peux aussi t'amuser a changer le input de ici dessous avec un autre txt file et hauteur pour voir le resultat.
console.log(createTree(readJSFileSync("tree.js"), (height = 36)));
