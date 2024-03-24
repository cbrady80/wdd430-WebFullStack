// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('cmsApp');

// Create a new document in the collection.
db.getCollection('contacts').insertMany(
    [{
		"_id": ObjectId("58c767386f1d58ebc37af1e9"),
		"id": "1",
		"name": "Rex Barzee",
		"email": "barzeer@byui.edu",
		"phone": "208-496-3768",
		"imageUrl": "../assets/images/barzeer.jpg",
		"group": [],
		"__v": 14
	},
	{
		"_id": ObjectId("58c767386f1d58ebc37af1ea"),
		"id": "2",
		"name": "Bradley Armstrong",
		"email": "armstrongb@byui.edu",
		"phone": "208-496-3766",
		"imageUrl": "../assets/images/armstrongb.jpg",
		"group": null
	},
	{
		"_id": ObjectId("58c767386f1d58ebc37af1eb"),
		"id": "3",
		"name": "Lee Barney",
		"email": "barneyl@byui.edu",
		"phone": "208-496-3767",
		"imageUrl": "../assets/images/barneyl.jpg",
		"group": null
	},
	{
		"_id": ObjectId("58c767386f1d58ebc37af1ec"),
		"id": "5",
		"name": "Kory Godfrey",
		"email": "godfreyko@byui.edu",
		"phone": "208-496-3770",
		"imageUrl": "../assets/images/godfreyko.jpg",
		"group": null
	},
	{
		"_id": ObjectId("58c767386f1d58ebc37af1ed"),
		"id": "7",
		"name": "R. Kent Jackson",
		"email": "jacksonk@byui.edu",
		"phone": "208-496-3771",
		"imageUrl": "../assets/images/jacksonk.jpg",
		"group": null
	},
	{
		"_id": ObjectId("58c767386f1d58ebc37af1ee"),
		"id": "8",
		"name": "Craig Lindstrom",
		"email": "lindstromc@byui.edu",
		"phone": "208-496-3769",
		"imageUrl": "../assets/images/lindstromc.jpg",
		"group": null
	},
	{
		"_id": ObjectId("58c767386f1d58ebc37af1ef"),
		"id": "9",
		"name": "Michael McLaughlin",
		"email": "mclaughlinm@byui.edu",
		"phone": "208-496-3772",
		"imageUrl": "../assets/images/mclaughlinm.jpg",
		"group": null
	},
	{
		"_id": ObjectId("58c767386f1d58ebc37af1f0"),
		"id": "11",
		"name": "Brent Morring",
		"email": "morringb@byui.edu",
		"phone": "208-496-3778",
		"imageUrl": "../assets/images/morringb.jpg",
		"group": null
	},
	{
		"_id": ObjectId("58c767386f1d58ebc37af1f1"),
		"id": "12",
		"name": "Mark Olaveson",
		"email": "olavesonm@byui.edu",
		"phone": "208-496-3773",
		"imageUrl": "../assets/images/olavesonm.jpg",
		"group": null
	},
	{
		"_id": ObjectId("58c767386f1d58ebc37af1f2"),
		"id": "13",
		"name": "Steven Rigby",
		"email": "rigbys@byui.edu",
		"phone": "208-496-3774",
		"imageUrl": "../assets/images/rigbys.jpg",
		"group": null
	},
	{
		"_id": ObjectId("58c767386f1d58ebc37af1f3"),
		"id": "15",
		"name": "Blaine Robertson",
		"email": "robertsonb@byui.edu",
		"phone": "208-496-3775",
		"imageUrl": "../assets/images/robertsonb.jpg",
		"group": null
	},
	{
		"_id": ObjectId("58c767386f1d58ebc37af1f4"),
		"id": "16",
		"name": "Randy Somsen",
		"email": "somsenr@byui.edu",
		"phone": "208-496-3776",
		"imageUrl": "../assets/images/somsenr.jpg",
		"group": null
	},
	{
		"_id": ObjectId("58c767386f1d58ebc37af1f5"),
		"id": "17",
		"name": "Shane Thompson",
		"email": "thompsonda@byui.edu",
		"phone": "208-496-3776",
		"imageUrl": "../assets/images/thompsonda.jpg",
		"group": null
	},
	{
		"_id": ObjectId("58c8cbf2ead5414d33ea8beb"),
		"id": "104",
		"name": "Programming team",
		"email": null,
		"phone": null,
		"imageUrl": null,
		"group": [ObjectId("58c767386f1d58ebc37af1e9"), ObjectId("58c767386f1d58ebc37af1eb"), ObjectId("58c767386f1d58ebc37af1ed"), ObjectId("58c767386f1d58ebc37af1f1")],
		"__v": 5
	},
	{
		"_id": ObjectId("58cac74b4690c438e0976b09"),
		"id": "105",
		"name": "Database team",
		"email": null,
		"phone": null,
		"imageUrl": null,
		"group": [ObjectId("58c767386f1d58ebc37af1ed"), ObjectId("58c767386f1d58ebc37af1ef"), ObjectId("58c767386f1d58ebc37af1f0")],
		"__v": 0
	},
	{
		"_id": ObjectId("58cac77b4690c438e0976b0a"),
		"id": "106",
		"name": "Networking team",
		"email": null,
		"phone": null,
		"imageUrl": null,
		"group": [ObjectId("58c767386f1d58ebc37af1ea"), ObjectId("58c767386f1d58ebc37af1ee"), ObjectId("58c767386f1d58ebc37af1f2")],
		"__v": 0
	}]
);
