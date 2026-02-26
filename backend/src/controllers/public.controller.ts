import { Request, Response } from "express";
import { prisma } from "../config/database";
import { sendEmail } from "../services/email.service";

export const getPublicLostItem = async (req: Request, res: Response) => {
  try {
    const item = await prisma.lostItem.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        location: true,
        dateLost: true,
        images: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

export const reportFoundViaPublicLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { finderName, finderEmail, finderPhone, message, location } = req.body;

    const lostItem = await prisma.lostItem.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!lostItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    const emailHtml = `
      <h2>🎉 Someone Found Your Item!</h2>
      <p>Hi ${lostItem.user.name},</p>
      <p>Great news! Someone has found your <strong>${lostItem.title}</strong></p>
      <h3>Finder Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${finderName}</li>
        <li><strong>Email:</strong> ${finderEmail}</li>
        ${finderPhone ? `<li><strong>Phone:</strong> ${finderPhone}</li>` : ""}
        <li><strong>Location:</strong> ${location}</li>
      </ul>
      <h3>Message:</h3>
      <p>${message || "No additional message"}</p>
      <p>Please contact the finder to arrange pickup!</p>
    `;

    await sendEmail(lostItem.user.email, `Someone Found Your ${lostItem.title}!`, emailHtml);

    const finderEmailHtml = `
      <h2>Thank You for Reporting!</h2>
      <p>Hi ${finderName},</p>
      <p>Thank you for reporting that you found <strong>${lostItem.title}</strong>!</p>
      <p>We've notified the owner. They will contact you soon at ${finderEmail}${finderPhone ? ` or ${finderPhone}` : ""}.</p>
      <p>You're making a difference! 🙏</p>
    `;

    await sendEmail(finderEmail, "Thank You for Helping!", finderEmailHtml);

    res.json({ success: true, message: "Owner has been notified!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send notification" });
  }
};
