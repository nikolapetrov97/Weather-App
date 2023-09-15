import { Request, Response } from "express";
import User from "../models/user";

const readUser = (req: Request, res: Response) => {
  const userId = req.params.id;

  return User.findById(userId)
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((e) => res.status(500).json({ e }));
};

const updateUser = (req: Request, res: Response) => {
  const userId = req.params.id;

  return User.findOneAndUpdate(
    { _id: userId },
    { $set: req.body },
    {
      returnDocument: "after",
    }
  )
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((e) => res.status(500).json({ e }));
};

const addFavoriteLocation = (req: Request, res: Response) => {
  const userId = req.params.id;

  return User.findOneAndUpdate(
    { _id: userId },
    { $push: { favorites: req.body } },
    { returnDocument: "after" }
  )
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((e) => res.status(500).json({ e }));
};

const removeFavoriteLocation = (req: Request, res: Response) => {
  const userId = req.params.id;
  const locationIdToRemove = req.params.locationId?.toString();

  return User.findOneAndUpdate(
    { _id: userId },
    { $pull: { favorites: { key: locationIdToRemove } } },
    { returnDocument: "after" }
  )
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((e) => res.status(500).json({ e }));
};

export default {
  readUser,
  updateUser,
  addFavoriteLocation,
  removeFavoriteLocation,
};
