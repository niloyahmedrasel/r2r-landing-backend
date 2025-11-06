import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/s3";
import dotenv from "dotenv";

dotenv.config();

export const uploadFileToS3 = async (
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> => {
  const bucketName = process.env.AWS_BUCKET_NAME as string;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: `${Date.now()}-${fileName}`, 
    Body: fileBuffer,
    ContentType: mimeType,
    // ACL: "public-read",
  });

  await s3Client.send(command);

  return `https://${bucketName}.s3.${process.env.REGION}.amazonaws.com/${command.input.Key}`;
};


export const deleteFileFromS3 = async (fileUrl: string): Promise<void> => {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME as string;
    const urlParts = fileUrl.split('/');
    const Key = urlParts.slice(3).join('/'); 

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key,
    });

    await s3Client.send(command);
    console.log(`Deleted file from S3: ${Key}`);
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw error;
  }
};
