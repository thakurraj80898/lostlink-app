import { Response } from "express";
import { prisma } from "../config/database";
import { AuthRequest } from "../middleware/auth.middleware";
import { findPotentialMatches } from "../services/matching.service";
import { uploadMultipleToS3 } from "../services/s3.service";
import { notifyOwnerOfMatch } from "../services/notification.service";

export const createFoundItem = async (req: AuthRequest, res: Response) => {
  try {
    const { title, category, location, dateFound, description } = req.body;
    const files = req.files as Express.Multer.File[];

    let images: string[] = [];
    if (files && files.length > 0) {
      if (process.env.USE_S3 === "true") {
        images = await uploadMultipleToS3(files);
      } else {
        images = files.map((file) => file.filename);
      }
    }

    const item = await prisma.foundItem.create({
      data: {
        title,
        category,
        location,
        dateFound: new Date(dateFound),
        description,
        images,
        userId: req.userId!,
      },
    });

    const potentialMatches = await findPotentialMatches(item.id);

    // Send email notifications to owners of matching lost items
    if (potentialMatches && potentialMatches.length > 0) {
      for (const match of potentialMatches) {
        await notifyOwnerOfMatch(match.id, item.id);
      }
    }

    res.status(201).json({ item, potentialMatches });
  } catch (error) {
    res.status(500).json({ error: "Failed to create found item" });
  }
};

export const getFoundItems = async (req: AuthRequest, res: Response) => {
  try {
    const { search, category, location, page = "1", limit = "10" } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (search) where.title = { contains: search as string, mode: "insensitive" };
    if (category) where.category = category as string;
    if (location) where.location = { contains: location as string, mode: "insensitive" };

    const [items, total] = await Promise.all([
      prisma.foundItem.findMany({
        where,
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.foundItem.count({ where }),
    ]);

    res.json({
      items,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: take,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch found items" });
  }
};

export const getFoundItemById = async (req: AuthRequest, res: Response) => {
  try {
    const item = await prisma.foundItem.findUnique({
      where: { id: req.params.id },
      include: { user: { select: { name: true, email: true } } },
    });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

export const updateFoundItem = async (req: AuthRequest, res: Response) => {
  try {
    const { title, category, location, dateFound, description } = req.body;
    const files = req.files as Express.Multer.File[];

    const existingItem = await prisma.foundItem.findUnique({
      where: { id: req.params.id },
    });

    if (!existingItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (existingItem.userId !== req.userId) {
      return res.status(403).json({ error: "Not authorized to update this item" });
    }

    let images: string[] | undefined;
    if (files && files.length > 0) {
      if (process.env.USE_S3 === "true") {
        images = await uploadMultipleToS3(files);
      } else {
        images = files.map((file) => file.filename);
      }
    }

    const item = await prisma.foundItem.update({
      where: { id: req.params.id },
      data: {
        title,
        category,
        location,
        dateFound: new Date(dateFound),
        description,
        ...(images && { images }),
      },
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
};

export const deleteFoundItem = async (req: AuthRequest, res: Response) => {
  try {
    const existingItem = await prisma.foundItem.findUnique({
      where: { id: req.params.id },
    });

    if (!existingItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (existingItem.userId !== req.userId) {
      return res.status(403).json({ error: "Not authorized to delete this item" });
    }

    await prisma.foundItem.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
};
