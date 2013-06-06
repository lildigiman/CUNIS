Inventory Software:

Features:

- List of all PC hardware
	- ID
	- Name
	- Description (optional)
	- State (Fully Functional, Semi Functional, Non Functional, Untested, Other)
		- Description (optional)
	- Price Purchased for
	- Currently Own [Boolean]
	- Price sold for (if sold)

- Select an array of items to make up a "Computer"
- History of every update made to each item in inventory
- Customize and create your own item types (motherboard, ram, psu, fans/heatsinks, adapters...)


Database Breakdown:

db.parts:
  - db of all parts the user has

db.fields:
  - All the custom and built in fields for which to specify a part by

Future Plans:

- Statistics!
