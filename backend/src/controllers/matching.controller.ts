import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { findPotentialMatches } from "../services/matching.service";

export const getPotentialMatches = async (req: AuthRequest, res: Response) => {
  try {
    const matches = await findPotentialMatches(req.params.id);
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch potential matches" });
  }
};
