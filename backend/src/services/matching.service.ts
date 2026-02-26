import { prisma } from "../config/database";

export const findPotentialMatches = async (foundItemId: string) => {
  const foundItem = await prisma.foundItem.findUnique({
    where: { id: foundItemId },
  });

  if (!foundItem) return [];

  const lostItems = await prisma.lostItem.findMany({
    where: {
      category: foundItem.category,
      status: "LOST",
      location: {
        contains: foundItem.location.split(" ")[0],
        mode: "insensitive",
      },
    },
  });

  const matches = lostItems.filter((item) => {
    const foundWords = foundItem.title.toLowerCase().split(" ");
    const lostWords = item.title.toLowerCase().split(" ");
    return foundWords.some((word) => lostWords.includes(word));
  });

  return matches;
};
