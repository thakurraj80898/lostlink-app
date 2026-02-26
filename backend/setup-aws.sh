#!/bin/bash

# AWS Infrastructure Setup Script

echo "Setting up AWS infrastructure for LostLink..."

# Variables
REGION="us-east-1"
BUCKET_NAME="lostlink-images"
DB_NAME="lostlink"
DB_USER="lostlink_admin"
DB_PASSWORD="your-secure-password"

# Create S3 Bucket
echo "Creating S3 bucket..."
aws s3 mb s3://$BUCKET_NAME --region $REGION

# Set S3 bucket policy
echo "Setting S3 bucket policy..."
cat > bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
  }]
}
EOF
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json

# Enable S3 CORS
echo "Enabling S3 CORS..."
cat > cors.json << EOF
{
  "CORSRules": [{
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }]
}
EOF
aws s3api put-bucket-cors --bucket $BUCKET_NAME --cors-configuration file://cors.json

# Create RDS instance
echo "Creating RDS PostgreSQL instance..."
aws rds create-db-instance \
  --db-instance-identifier lostlink-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username $DB_USER \
  --master-user-password $DB_PASSWORD \
  --allocated-storage 20 \
  --db-name $DB_NAME \
  --publicly-accessible \
  --region $REGION

echo "Waiting for RDS instance to be available..."
aws rds wait db-instance-available --db-instance-identifier lostlink-db

# Get RDS endpoint
RDS_ENDPOINT=$(aws rds describe-db-instances \
  --db-instance-identifier lostlink-db \
  --query 'DBInstances[0].Endpoint.Address' \
  --output text)

echo ""
echo "Setup complete!"
echo ""
echo "S3 Bucket: $BUCKET_NAME"
echo "RDS Endpoint: $RDS_ENDPOINT"
echo "Database URL: postgresql://$DB_USER:$DB_PASSWORD@$RDS_ENDPOINT:5432/$DB_NAME"
echo ""
echo "Add this to your .env file"
