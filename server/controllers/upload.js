import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const uploadInS3 = async (file) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: file.originalname,
      Body: file.buffer,
    };
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    return error;
  }
};

export const fileuploadToS3 = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({
        success: false,
        data: "file not uploaded",
      });
    }
    const result = await uploadInS3(req.file);
    return res.status(200).json({
      success: true,
      fileUrl: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};
