const formidable = require("formidable");
const { createReadStream } = require("fs");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("@config/aws.js");

function parseFormData(req, cb) {
  const form = new formidable.IncomingForm();
  form.multiples = true;

  form.parse(req, (err, fields, files) => {
    Object.keys(fields).forEach((i) => {
      fields[i] = fields[i][0];
    });
    if (!files.images) {
      cb([err, fields, []]);
    } else {
      const imageFiles = Array.isArray(files.images)
        ? files.images
        : [files.images];

      cb([err, fields, imageFiles]);
    }
  });
}

async function uploadImagesToBucket(files, bucketName) {
  const result = files.map(async (file) => {
    const name =
      file.newFilename + "." + file.originalFilename.split(".").pop();

    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: "assets",
          Key: bucketName + "/" + name,
          Body: createReadStream(file.filepath),
        }),
      );
      return name;
    } catch (err) {
      logger.error("Could not upload one or more product images", err);
    }
  });
  return await Promise.all(result);
}

module.exports = { parseFormData, uploadImagesToBucket };
