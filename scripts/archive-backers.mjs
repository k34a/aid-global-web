import { createClient } from "@supabase/supabase-js";
import { tmpdir } from "os";
import { join } from "path";
import fs from "fs/promises";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();

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
	const threeDaysAgo = new Date(
		Date.now() - 3 * 24 * 60 * 60 * 1000,
	).toISOString();

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
			`Archival process failed. Please check logs.`,
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

archiveBackers().catch(console.error);
