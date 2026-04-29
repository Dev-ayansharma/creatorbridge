import cloudinary from "./cloudinary";
export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: "image" | "video" = "image"
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      {
        resource_type: resourceType, // 🔥 important for videos
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
};