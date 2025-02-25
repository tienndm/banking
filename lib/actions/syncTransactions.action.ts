import { ID } from "node-appwrite";
import { plaidClient } from "../plaid";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID,
} = process.env;

export const syncPlaidTransactions = async (accessToken: string, bankId: string) => {
  try {
    const response = await plaidClient.transactionsSync({ access_token: accessToken });
    const addedTransactions = response.data.added; // array of plaid transactions

    const { database } = await createAdminClient();
    for (const trx of addedTransactions) {
      const transactionData = {
        name: trx.name,
        paymentChannel: trx.payment_channel || "online",
        type: trx.pending ? "debit" : "credit",
        accountId: trx.account_id,
        amount: trx.amount,
        pending: trx.pending,
        category: trx.category?.[0] ?? "",
        date: trx.date,
        image: trx.logo_url || "",
        channel: "online",
        senderBankId: bankId,
        receiverBankId: bankId, // adjust if needed
      };
      await database.createDocument(
        APPWRITE_DATABASE_ID!,
        APPWRITE_TRANSACTION_COLLECTION_ID!,
        ID.unique(),
        transactionData
      );
    }
    return parseStringify({ synced: addedTransactions.length });
  } catch (err) {
    console.error("Error syncing transactions: ", err);
    throw err;
  }
};
