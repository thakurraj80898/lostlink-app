# LostLink Deployment Guide

## Prerequisites
- AWS Account
- Vercel Account
- Domain name

## 1. Database Setup (AWS RDS)

```bash
# Create PostgreSQL RDS instance
- Engine: PostgreSQL 15
- Instance: db.t3.micro (free tier)
- Storage: 20GB
- Public access: Yes (for initial setup)
- Security group: Allow port 5432 from your IP

# Get connection string
postgresql://username:password@endpoint.region.rds.amazonaws.com:5432/lostlink
```

## 2. S3 Bucket Setup

```bash
# Create S3 bucket
aws s3 mb s3://lostlink-images --region us-east-1

# Set bucket policy (public read)
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::lostlink-images/*"
  }]
}

# Enable CORS
[{
  "AllowedHeaders": ["*"],
  "AllowedMethods": ["GET", "PUT", "POST"],
  "AllowedOrigins": ["*"],
  "ExposeHeaders": []
}]
```

## 3. Backend Deployment (AWS EC2)

```bash
# Launch EC2 instance
- AMI: Ubuntu 22.04
- Instance: t2.micro (free tier)
- Security group: Allow ports 22, 5000, 80, 443

# SSH into instance
ssh -i your-key.pem ubuntu@ec2-ip

# Install dependencies
sudo apt update
sudo apt install -y docker.io docker-compose nginx

# Clone repository
git clone https://github.com/your-repo/lostlink.git
cd lostlink/backend

# Create .env file
nano .env
# Paste production environment variables

# Run Prisma migration
npx prisma migrate deploy

# Build and run Docker
docker-compose up -d

# Setup Nginx reverse proxy
sudo nano /etc/nginx/sites-available/lostlink

server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

sudo ln -s /etc/nginx/sites-available/lostlink /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.your-domain.com
```

## 4. Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd lostlink
vercel --prod

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api

# Connect custom domain
- Go to Vercel dashboard
- Settings > Domains
- Add your-domain.com
- Update DNS records as instructed
```

## 5. Domain Configuration

```bash
# DNS Records (at your domain registrar)
A     @              -> Vercel IP (provided by Vercel)
CNAME www            -> cname.vercel-dns.com
CNAME api            -> EC2 IP or Load Balancer
```

## 6. Environment Variables

### Backend (.env on EC2)
```
DATABASE_URL=postgresql://user:pass@rds-endpoint:5432/lostlink
JWT_SECRET=your-secret-min-32-chars
FRONTEND_URL=https://your-domain.com
USE_S3=true
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=lostlink-images
```

### Frontend (Vercel Dashboard)
```
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api
```

## 7. Post-Deployment

```bash
# Test API
curl https://api.your-domain.com

# Test frontend
curl https://your-domain.com

# Monitor logs
docker logs -f backend_backend_1

# Database backup
pg_dump -h rds-endpoint -U username lostlink > backup.sql
```

## Production Checklist
- [ ] RDS database created and accessible
- [ ] S3 bucket created with public read access
- [ ] EC2 instance running with Docker
- [ ] Nginx configured with SSL
- [ ] Frontend deployed to Vercel
- [ ] Custom domain connected
- [ ] Environment variables set
- [ ] Database migrated
- [ ] API endpoints tested
- [ ] Image upload tested
- [ ] Email notifications working
