import { sendEmail } from "./email.service";
import { prisma } from "../config/database";

export const notifyOwnerOfMatch = async (lostItemId: string, foundItemId: string) => {
  try {
    const lostItem = await prisma.lostItem.findUnique({
      where: { id: lostItemId },
      include: { user: true },
    });

    const foundItem = await prisma.foundItem.findUnique({
      where: { id: foundItemId },
      include: { user: true },
    });

    if (!lostItem || !foundItem) return;

    const publicLink = `${process.env.FRONTEND_URL}/item/${lostItemId}`;
    
    const emailHtml = `
      <h2>🎉 Great News! Someone Found Your Item!</h2>
      <p>Hi ${lostItem.user.name},</p>
      <p>Someone has reported finding an item that matches your lost item: <strong>${lostItem.title}</strong></p>
      <h3>Found Item Details:</h3>
      <ul>
        <li><strong>Title:</strong> ${foundItem.title}</li>
        <li><strong>Location:</strong> ${foundItem.location}</li>
        <li><strong>Date Found:</strong> ${new Date(foundItem.dateFound).toLocaleDateString()}</li>
      </ul>
      <p><a href="${publicLink}" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">View Details & Connect</a></p>
      <p>Login to LostLink to connect with the finder!</p>
    `;

    await sendEmail(lostItem.user.email, "Someone Found Your Item!", emailHtml);
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};

export const notifyFinderOfMatch = async (foundItemId: string, lostItemId: string) => {
  try {
    const foundItem = await prisma.foundItem.findUnique({
      where: { id: foundItemId },
      include: { user: true },
    });

    const lostItem = await prisma.lostItem.findUnique({
      where: { id: lostItemId },
      include: { user: true },
    });

    if (!foundItem || !lostItem) return;

    const publicLink = `${process.env.FRONTEND_URL}/item/${foundItemId}`;
    
    const emailHtml = `
      <h2>✅ Match Found!</h2>
      <p>Hi ${foundItem.user.name},</p>
      <p>The item you found matches a lost item report: <strong>${lostItem.title}</strong></p>
      <h3>Lost Item Details:</h3>
      <ul>
        <li><strong>Title:</strong> ${lostItem.title}</li>
        <li><strong>Location:</strong> ${lostItem.location}</li>
        <li><strong>Date Lost:</strong> ${new Date(lostItem.dateLost).toLocaleDateString()}</li>
      </ul>
      <p><a href="${publicLink}" style="background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">View Details & Connect</a></p>
      <p>Login to LostLink to connect with the owner!</p>
    `;

    await sendEmail(foundItem.user.email, "Match Found for Your Found Item!", emailHtml);
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};
