import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1717612190155 implements MigrationInterface {
  name = 'Auto1717612190155';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cities" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "other" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "advertisements" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "startDate" character varying NOT NULL, "finishDate" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4818a08332624787e5b2bf82302" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subcategories" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_793ef34ad0a3f86f09d4837007c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "items" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "image" character varying NOT NULL, "additionalImages" text, "description" character varying NOT NULL, "price" integer NOT NULL DEFAULT '0', "forSale" boolean NOT NULL DEFAULT false, "forBuying" boolean NOT NULL DEFAULT false, "owner" character varying NOT NULL, "sold" boolean NOT NULL DEFAULT false, "unitOfMeasurement" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "cityId" integer, "advertisementId" integer, "categoryId" integer, "subCategoryId" integer, "buyerId" integer, CONSTRAINT "REL_79e2e7ba8d78be86c640eefbaf" UNIQUE ("advertisementId"), CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscriptions" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "price" integer NOT NULL DEFAULT '0', "description" character varying NOT NULL, "months" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "chatId" character varying NOT NULL, "isBot" boolean NOT NULL DEFAULT false, "firstName" character varying NOT NULL, "username" character varying, "admin" boolean NOT NULL DEFAULT false, "banned" boolean NOT NULL DEFAULT false, "contactPerson" character varying, "phone" character varying, "email" character varying, "address" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "subscribeId" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "carts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_69828a178f152f157dcf2f70a8" UNIQUE ("userId"), CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart_item" ("cartsId" integer NOT NULL, "itemsId" integer NOT NULL, CONSTRAINT "PK_ff899314362c1599b3786d72231" PRIMARY KEY ("cartsId", "itemsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7ef5b94f68a6c67a9d88537345" ON "cart_item" ("cartsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_147102e774c288f3e7f0a07eb7" ON "cart_item" ("itemsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "cities" ADD CONSTRAINT "FK_2365a11458b431d788e228176f7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subcategories" ADD CONSTRAINT "FK_d1fe096726c3c5b8a500950e448" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_c858d4f659db6de757f90e73408" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_79e2e7ba8d78be86c640eefbafd" FOREIGN KEY ("advertisementId") REFERENCES "advertisements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_788929ed61ab78bb914f0d1931b" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_689cd3165c153a2780f3eb7c60a" FOREIGN KEY ("subCategoryId") REFERENCES "subcategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_8936ffe302029dd51f69c697a7b" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_379474c69b08186250ad4d823ba" FOREIGN KEY ("subscribeId") REFERENCES "subscriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts" ADD CONSTRAINT "FK_69828a178f152f157dcf2f70a89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_7ef5b94f68a6c67a9d885373455" FOREIGN KEY ("cartsId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_147102e774c288f3e7f0a07eb7d" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_147102e774c288f3e7f0a07eb7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_7ef5b94f68a6c67a9d885373455"`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts" DROP CONSTRAINT "FK_69828a178f152f157dcf2f70a89"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_379474c69b08186250ad4d823ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_8936ffe302029dd51f69c697a7b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_689cd3165c153a2780f3eb7c60a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_788929ed61ab78bb914f0d1931b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_79e2e7ba8d78be86c640eefbafd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_c858d4f659db6de757f90e73408"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subcategories" DROP CONSTRAINT "FK_d1fe096726c3c5b8a500950e448"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cities" DROP CONSTRAINT "FK_2365a11458b431d788e228176f7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_147102e774c288f3e7f0a07eb7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7ef5b94f68a6c67a9d88537345"`,
    );
    await queryRunner.query(`DROP TABLE "cart_item"`);
    await queryRunner.query(`DROP TABLE "carts"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "subscriptions"`);
    await queryRunner.query(`DROP TABLE "items"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "subcategories"`);
    await queryRunner.query(`DROP TABLE "advertisements"`);
    await queryRunner.query(`DROP TABLE "cities"`);
  }
}
