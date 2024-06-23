const { S3Client } = require("@aws-sdk/client-s3");
const { fromEnv } = require("@aws-sdk/credential-providers");

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: fromEnv(),
});

const bucketName = "clifbay-assets";

module.exports = { s3Client, bucketName };
