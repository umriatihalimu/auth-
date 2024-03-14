-- CreateTable
CREATE TABLE `kopi_crud` (
    `id_kopi` VARCHAR(10) NOT NULL,
    `produk_kopi` VARCHAR(50) NOT NULL,
    `harga_kopi` INTEGER NOT NULL,

    UNIQUE INDEX `id_kopi`(`id_kopi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_kopi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `user_kopi_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
