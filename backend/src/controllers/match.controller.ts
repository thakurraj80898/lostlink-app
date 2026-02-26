import { Response } from "express";
import { prisma } from "../config/database";
import { AuthRequest } from "../middleware/auth.middleware";
import { sendEmail } from "../services/email.service";

export const sendMatchRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { lostItemId, foundItemId, message } = req.body;

    const existingRequest = await prisma.matchRequest.findFirst({
      where: {
        lostItemId,
        foundItemId,
        requesterId: req.userId!,
        status: { in: ["PENDING", "APPROVED"] },
      },
    });

    if (existingRequest) {
      return res.status(400).json({ error: "Match request already exists" });
    }

    const matchRequest = await prisma.matchRequest.create({
      data: {
        lostItemId,
        foundItemId,
        requesterId: req.userId!,
        message,
      },
      include: {
        lostItem: { include: { user: true } },
        foundItem: true,
        requester: true,
      },
    });

    await sendEmail(
      matchRequest.lostItem.user.email,
      "Match Request for Your Lost Item",
      `<p>Someone found an item that might match your lost item: ${matchRequest.lostItem.title}</p>
       <p>Message: ${message || "No message"}</p>`
    ).catch(() => {});

    res.status(201).json(matchRequest);
  } catch (error) {
    res.status(500).json({ error: "Failed to send match request" });
  }
};

export const approveMatch = async (req: AuthRequest, res: Response) => {
  try {
    const matchRequest = await prisma.matchRequest.findUnique({
      where: { id: req.params.id },
      include: { lostItem: true, foundItem: true },
    });

    if (!matchRequest) {
      return res.status(404).json({ error: "Match request not found" });
    }

    if (matchRequest.lostItem.userId !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await prisma.$transaction([
      prisma.matchRequest.update({
        where: { id: req.params.id },
        data: { status: "APPROVED" },
      }),
      prisma.lostItem.update({
        where: { id: matchRequest.lostItemId },
        data: { status: "MATCHED" },
      }),
      prisma.foundItem.update({
        where: { id: matchRequest.foundItemId },
        data: { status: "MATCHED" },
      }),
    ]);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to approve match" });
  }
};

export const rejectMatch = async (req: AuthRequest, res: Response) => {
  try {
    const matchRequest = await prisma.matchRequest.findUnique({
      where: { id: req.params.id },
      include: { lostItem: true },
    });

    if (!matchRequest) {
      return res.status(404).json({ error: "Match request not found" });
    }

    if (matchRequest.lostItem.userId !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await prisma.matchRequest.update({
      where: { id: req.params.id },
      data: { status: "REJECTED" },
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject match" });
  }
};

export const getMatchRequests = async (req: AuthRequest, res: Response) => {
  try {
    const matchRequests = await prisma.matchRequest.findMany({
      where: {
        lostItem: { userId: req.userId },
      },
      include: {
        lostItem: true,
        foundItem: true,
        requester: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(matchRequests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch match requests" });
  }
};
