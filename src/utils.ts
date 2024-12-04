interface Donut {
  id: number;
  name: string;
  price: number;
}

let donuts: Donut[] = [];
let currentId = 1;

// Ajouter un donut
export const addDonut = (name: string, price: number): Donut => {
  const newDonut: Donut = { id: currentId++, name, price };
  donuts.push(newDonut);
  return newDonut;
};

// Obtenir tous les donuts
export const getDonuts = (): Donut[] => {
  return donuts;
};

// Mettre à jour un donut
export const updateDonut = (
  id: number,
  name?: string,
  price?: number
): Donut | null => {
  const donut = donuts.find((d) => d.id === id);
  if (!donut) return null;

  if (name !== undefined) donut.name = name;
  if (price !== undefined) donut.price = price;

  return donut;
};

// Supprimer un donut
export const removeDonut = (id: number): boolean => {
  const index = donuts.findIndex((d) => d.id === id);
  if (index === -1) return false;

  donuts.splice(index, 1);
  return true;
};
