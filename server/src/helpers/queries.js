import sequelize from 'sequelize';

export const sqlOptions = { type: sequelize.QueryTypes.SELECT };

export const customerPendingOrdersSql = req => `SELECT count(*) FROM "Orders"
WHERE "userId" = '${req.userId}'
AND ("status" = 'pending' OR "status" = 'started'
${req.query.date ? `) AND DATE("createdAt") = '${req.query.date}'` : ')'};`;

export const catererCashEarnedSql = (req, date) => `SELECT SUM("quantity" * "price") FROM
(SELECT * FROM "OrderItems" AS "meals->OrderItem"
INNER JOIN "Meals" AS "meals" ON "meals"."mealId" = "meals->OrderItem"."mealId"
INNER JOIN "Orders" AS "Order" ON "Order"."orderId" = "meals->OrderItem"."orderId"
INNER JOIN "Users" AS "meals->caterer" ON "meals"."userId" = "meals->caterer"."userId" AND "meals->caterer"."userId" = '${req.userId}'
WHERE ("Order"."status" != 'started' AND "Order"."status" != 'canceled' AND "meals->OrderItem"."delivered" = true ${date ? `AND DATE("Order"."createdAt") = '${date}')` : ')'}
GROUP BY "Order"."orderId", "meals->OrderItem"."orderId", "meals->OrderItem"."id", "meals->OrderItem"."mealId", "meals->OrderItem"."quantity", "meals->OrderItem"."delivered",
"meals->OrderItem"."createdAt", "meals->OrderItem"."updatedAt", "meals"."id", "meals"."mealId", "meals"."price", "meals->caterer"."id", "meals->caterer"."userId") AS "totalCashEarned";`;

export const catererPendingOrdersSql = (req, date) => `SELECT count(*) FROM
(SELECT DISTINCT "meals->OrderItem"."orderId"
FROM "OrderItems" AS "meals->OrderItem"
INNER JOIN "Meals" AS "meals" ON "meals"."mealId" = "meals->OrderItem"."mealId"
INNER JOIN "Orders" AS "Order" ON "Order"."orderId" = "meals->OrderItem"."orderId"
INNER JOIN "Users" AS "meals->caterer" ON "meals"."userId" = "meals->caterer"."userId" AND "meals->caterer"."userId" = '${req.userId}'
WHERE ("Order"."status" != 'started' AND "Order"."status" != 'canceled' AND "meals->OrderItem"."delivered" = false ${date ? `AND DATE("Order"."createdAt") = '${date}')` : ')'}
GROUP BY "Order"."orderId", "meals->OrderItem"."orderId") AS "pendingOrders";`;
