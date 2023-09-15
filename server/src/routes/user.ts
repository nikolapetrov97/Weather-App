import express from "express";
import controller from "../controllers/user";

const router = express.Router();
// Get User
router.get("/:id", controller.readUser);
// Update User
router.patch("/:id", controller.updateUser);
// Add Favorite Location
router.patch("/:id/favorites", controller.addFavoriteLocation);
// Remove Favorite Location
router.patch("/:id/favorites/:locationId", controller.removeFavoriteLocation);

export = router;
