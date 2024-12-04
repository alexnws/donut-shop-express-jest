import express, { Request, Response } from "express";
import { addDonut, getDonuts, updateDonut, removeDonut } from "./utils";

const app = express();
app.use(express.json());

// Ajouter un donut
app.post("/donuts", (req: Request, res: Response) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: "Name and price are required" });
  }
  const newDonut = addDonut(name, price);
  res.status(201).json(newDonut);
});

// Obtenir tous les donuts
app.get("/donuts", (_req: Request, res: Response) => {
  const donuts = getDonuts();
  res.json(donuts);
});

// Mettre à jour un donut
app.put("/donuts/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const updatedDonut = updateDonut(parseInt(id), name, price);
  if (!updatedDonut) {
    return res.status(404).end();
  }
  res.json(updatedDonut);
});

// Supprimer un donut
app.delete("/donuts/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const success = removeDonut(parseInt(id));
  if (!success) {
    return res.status(404).end();
  }
  res.status(204).end();
});

// Serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
