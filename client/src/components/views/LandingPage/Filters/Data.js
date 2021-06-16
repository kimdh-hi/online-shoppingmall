const countries = [
  { _id: 1, name: "Korea" },
  { _id: 2, name: "USA" },
  { _id: 3, name: "China" },
  { _id: 4, name: "Japan" },
];

const price = [
  { _id: 1, name: "any", array: [] },
  { _id: 2, name: "0~200", array: [0, 200] },
  { _id: 3, name: "201~400", array: [201, 400] },
  { _id: 4, name: "401~600", array: [401, 600] },
  { _id: 5, name: "601~800", array: [601, 800] },
  { _id: 6, name: "801~", array: [801, 99999999] },
];

export { countries, price };
