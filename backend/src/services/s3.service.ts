import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadToS3 = async (file: Express.Multer.File): Promise<string> => {
  const fileContent = fs.readFileSync(file.path);
  const fileName = `${Date.now()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: fileName,
    Body: fileContent,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);

  fs.unlinkSync(file.path);

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};

export const uploadMultipleToS3 = async (files: Express.Multer.File[]): Promise<string[]> => {
  const uploadPromises = files.map((file) => uploadToS3(file));
  return Promise.all(uploadPromises);
};
