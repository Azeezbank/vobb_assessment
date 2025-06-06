// this is the car page to create, get, update and delete car
import Car from "../models/Car";

// route to create car
export const createCar = async (req: any, res: any) => {
  // request { brand, model, price, availability: booloean, category, image, color, year } from body
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (err: any) {
    console.error("Failed to create Car", err.message);
    return res.status(400).json({ error: "Failed to create car" });
  }
};

// route to get cars
export const getCars = async (req: any, res: any) => {
  try {
    // This demonstrate how to use query from request parameters
    const {
      brand,
      model,
      minPrice,
      maxPrice,
      availability,
      page = 1,
      limit = 10,
      condition,
      color,
      year,
      category,
    } = req.query;
    const query: any = {};
    if (brand) query.brand = brand;
    if (model) query.model = model;
    if (availability) query.availability = availability === "true";
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
    if (condition) query.condition = condition;
    if (color) query.color = color;
    if (year) query.year = year;
    if (category) query.category = category;

    const cars = await Car.find(query)
      .populate("category")
      .skip((+page - 1) * +limit)
      .limit(+limit);
    console.log("This is your searched product", cars);
    res.status(200).json(cars);
  } catch (err: any) {
    console.error("Failed to fetch Car", err.message);
    return res.status(400).json({ error: "Failed to fetch cars" });
  }
};

// route to update car
export const updateCar = async (req: any, res: any) => {
  try {
    // this demonstarate how to use body parameter
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(car);
  } catch (err: any) {
    console.error("Failed to update car", err.message);
    return res.status(400).json({ error: "Failed to update car" });
  }
};


// route to delete car
export const deleteCar = async (req: any, res: any) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (err: any) {
    console.error("Failed to delete Car", err.message);
    return res.status(400).json({ error: "Failed to delete car" });
  }
};
