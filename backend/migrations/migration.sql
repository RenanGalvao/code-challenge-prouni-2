-- Create Types
DO $$
BEGIN IF NOT EXISTS (
    SELECT
    FROM
        pg_type
    WHERE
        typname = 'Role'
) THEN CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

END IF;
END$$;

CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "hashedPassword" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- Auto Update updatedAt field
CREATE EXTENSION IF NOT EXISTS moddatetime;

CREATE
OR REPLACE TRIGGER "users_updated_at" BEFORE
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