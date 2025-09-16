import { createClient } from "@supabase/supabase-js";
import { tmpdir } from "os";
import { join } from "path";
import fs from "fs/promises";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import Razorpay from "razorpay";

dotenv.config();
const threeDaysAgo = new Date(
	Date.now() - 3 * 24 * 60 * 60 * 1000,
).toISOString();

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, { polling: false });

async function sendTelegramMessage(text) {
    try {
        await bot.sendMessage(process.env.TELEGRAM_CHANNEL, text, { parse_mode: "HTML" });
		console.log("Sent message on telegram")
    } catch (err) {
        console.error("Failed to send Telegram message:", err);
    }
}

async function archiveBackers() {
	console.log(
		"Searching the DB for unsuccessful backers data which needs to be archived",
	);

	const { data, error } = await supabase
		.from("backers")
		.select("*")
		.lt("created_at", threeDaysAgo)
		.in("status", ["Pending", "Failed"]);

	if (error) {
		console.log(error);
		await sendTelegramMessage(
			`Donor archival failed. Please check logs.`,
		);
		console.log("Notified admins");
		throw error;
	}

	if (!data || data.length === 0) {
		console.log("Nothing to archive! Ending task.");
		await sendTelegramMessage(`Archived 0 records`);
		return;
	}

	console.log(`Found ${data.length} records which need to be archived`);

	const fileName = `${new Date().toISOString().split("T")[0]}.json`;
	const filePath = join(tmpdir(), fileName);
	await fs.writeFile(filePath, JSON.stringify(data, null, 2));

	console.log("Trying to save the records to the archive");

	const file = await fs.readFile(filePath);
	const { error: archiveError } = await supabase.storage
		.from("data-dump")
		.upload(`donors/${fileName}`, file, {
			contentType: "application/json",
			upsert: true,
		});

	if (error) {
		console.error(archiveError);
		return;
	}

	console.log("Records successfully saved to archive");
	console.log("Now trying to delete the records");

	await supabase
		.from("backers")
		.delete()
		.lt("created_at", threeDaysAgo)
		.in("status", ["Pending", "Failed"]);

	console.log(`Successfully archived ${data.length} records. Ending task...`);
	await sendTelegramMessage(`Archived ${data.length} unsuccessful backers records.`);
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function archiveSubscriptions() {
    console.log("Searching DB for subscriptions pending >3 days without any charges");

    const { data: subs, error } = await supabase
        .from("subscriptions")
        .select("*")
        .lt("start_date", threeDaysAgo)
        .eq("status", "Pending");

    if (error) {
        console.error(error);
        await sendTelegramMessage("Subscription archival failed. Please check logs.");
        return;
    }

    if (!subs || subs.length === 0) {
        console.log("No subscriptions to archive");
        await sendTelegramMessage("Archived 0 subscription records");
        return;
    }

    const results = [];
    for (const sub of subs) {
        // Check if any charges exist
        const { data: charges, error } = await supabase
            .from("subscription_charges")
            .select("id")
            .eq("subscription_id", sub.id)
            .limit(1);

		if (error) {
			console.error(error);
			continue;
		}

        if (charges && charges.length > 0) continue;

        // Cancel in Razorpay if applicable
        if (sub.razorpay_subscription_id) {
            try {
                await razorpay.subscriptions.cancel(sub.razorpay_subscription_id, false);
                console.log(`Cancelled Razorpay subscription ${sub.razorpay_subscription_id}`);
            } catch (err) {
                console.error(`Failed to cancel Razorpay subscription ${sub.razorpay_subscription_id}`, err);
            }
        }

        results.push(sub);
    }

    if (results.length === 0) {
        console.log("No subscriptions eligible for archival after checks");
        await sendTelegramMessage("Archived 0 subscription records");
        return;
    }

    const fileName = `subscriptions-${new Date().toISOString().split("T")[0]}.json`;
    const filePath = join(tmpdir(), fileName);
    await fs.writeFile(filePath, JSON.stringify(results, null, 2));

    const file = await fs.readFile(filePath);
    const { error: archiveError } = await supabase.storage
        .from("data-dump")
        .upload(`subscriptions/${fileName}`, file, {
            contentType: "application/json",
            upsert: true,
        });

    if (archiveError) {
        console.error(archiveError);
        return;
    }

    console.log("Archived subscription records in storage");

    await supabase
        .from("subscriptions")
        .delete()
        .in("id", results.map((r) => r.id));

    console.log(`Successfully archived ${results.length} subscription records`);
    await sendTelegramMessage(`Archived ${results.length} pending subscription records`);
}


archiveBackers().then(() => {console.log("SUCCESS")}).catch(console.error);
archiveSubscriptions().then(() => {console.log("SUCCESS")}).catch(console.error);
