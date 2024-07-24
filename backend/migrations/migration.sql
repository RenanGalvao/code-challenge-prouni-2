-- Create Users Table
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

CREATE TABLE "users" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- Auto Update updatedAt field
CREATE EXTENSION IF NOT EXISTS moddatetime;

CREATE TRIGGER "users_updated_at" BEFORE
UPDATE
    ON "users" FOR EACH ROW EXECUTE PROCEDURE moddatetime ("updatedAt");

-- Create Admin User - password 12345678
INSERT INTO
    users ("id", "name", "email", "hashedPassword", "role")
VALUES
    (
        '00000000-0000-0000-0000-000000000000',
        'Admin',
        'admin@admin.com',
        '$argon2id$v=19$m=16,t=2,p=1$ZVAwZ28ydnpVRFVCeDMxdA$KqojsLyjscvIC9/zp2DxQg',
        'ADMIN'
    ) ON CONFLICT (email) DO NOTHING;