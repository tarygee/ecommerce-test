import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTBLOrdersOpShipping1691404628720 implements MigrationInterface {
  name = 'AddTBLOrdersOpShipping1691404628720';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shippings" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "name" character varying NOT NULL DEFAULT '', "address" character varying NOT NULL, "city" character varying NOT NULL, "postCode" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_665fb613135782a598a2b47e5b2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."orders_status_enum" AS ENUM('processing', 'shipped', 'delivered', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("OrderId" SERIAL NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'processing', "totalPrice" numeric(10,2) NOT NULL DEFAULT '0', "productCode" integer NOT NULL, "shippedAt" TIMESTAMP, "deliveredAt" TIMESTAMP, "updatedById" integer, "shippingAdressId" integer, CONSTRAINT "REL_6f1544d869f165e209a7b15d50" UNIQUE ("shippingAdressId"), CONSTRAINT "PK_81fe92d0102a32ecf1a4123ce8f" PRIMARY KEY ("OrderId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders_products" ("id" SERIAL NOT NULL, "product_unit_price" numeric(10,2) NOT NULL DEFAULT '0', "product_quantity" integer NOT NULL, "orderOrderId" integer, "productId" integer, CONSTRAINT "PK_4945c6758fd65ffacda760b4ac9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_1102b5a0c580f845993e2f766f6" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_6f1544d869f165e209a7b15d502" FOREIGN KEY ("shippingAdressId") REFERENCES "shippings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" ADD CONSTRAINT "FK_ca5f816a2e62b71b0c1acb4406d" FOREIGN KEY ("orderOrderId") REFERENCES "orders"("OrderId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" ADD CONSTRAINT "FK_4eff63e89274f79195e25c5c115" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_products" DROP CONSTRAINT "FK_4eff63e89274f79195e25c5c115"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" DROP CONSTRAINT "FK_ca5f816a2e62b71b0c1acb4406d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_6f1544d869f165e209a7b15d502"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_1102b5a0c580f845993e2f766f6"`,
    );
    await queryRunner.query(`DROP TABLE "orders_products"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    await queryRunner.query(`DROP TABLE "shippings"`);
  }
}
