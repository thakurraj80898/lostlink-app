import { Response } from "express";
import { prisma } from "../config/database";
import { AuthRequest } from "../middleware/auth.middleware";

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            lostItems: true,
            foundItems: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const deleteItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.$transaction([
      prisma.lostItem.deleteMany({ where: { id } }),
      prisma.foundItem.deleteMany({ where: { id } }),
    ]);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
};

export const blockUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role: "BLOCKED" },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to block user" });
  }
};

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const [totalUsers, totalLostItems, totalFoundItems, totalMatches] = await Promise.all([
      prisma.user.count(),
      prisma.lostItem.count(),
      prisma.foundItem.count(),
      prisma.matchRequest.count({ where: { status: "APPROVED" } }),
    ]);

    const recentUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const recentLostItems = await prisma.lostItem.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const recentFoundItems = await prisma.foundItem.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    res.json({
      totalUsers,
      totalLostItems,
      totalFoundItems,
      totalMatches,
      recentUsers,
      recentLostItems,
      recentFoundItems,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
};
